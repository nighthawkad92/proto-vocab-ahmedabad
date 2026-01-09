import type { LessonContent, Question, AttemptState, ResponseRecord } from './types'

const MAX_MISTAKES_PER_LEVEL = 2

export class LessonEngine {
  private attemptState: AttemptState
  private lessonContent: LessonContent
  private currentQuestions: Question[]
  private currentQuestionIndex: number
  private attemptNumber: number

  constructor(attemptId: string, lessonId: string, lessonContent: LessonContent, attemptNumber: number = 1) {
    this.attemptState = {
      attemptId,
      lessonId,
      currentLevel: 0,
      mistakesInLevel: 0,
      questionsAttempted: 0,
      questionsCorrect: 0,
      levelsCompleted: 0,
      responses: [],
    }
    this.lessonContent = lessonContent
    this.currentQuestions = []
    this.currentQuestionIndex = 0
    this.attemptNumber = attemptNumber
    this.initializeLevel(0)
  }

  private selectQuestions(level: { questions: Question[]; rotationSets?: Question[][] }): Question[] {
    // Check if rotation is enabled and rotation sets are available
    if (!this.lessonContent.rotationEnabled || !level.rotationSets || level.rotationSets.length === 0) {
      return level.questions
    }

    // Calculate rotation index: 0 = default, 1 = rotation set 1, 2 = rotation set 2
    const rotationIndex = (this.attemptNumber - 1) % 3

    if (rotationIndex === 0) {
      // Use default question set
      return level.questions
    } else if (rotationIndex === 1 && level.rotationSets[0]) {
      // Use rotation set 1
      return level.rotationSets[0]
    } else if (rotationIndex === 2 && level.rotationSets[1]) {
      // Use rotation set 2
      return level.rotationSets[1]
    }

    // Fallback to default if rotation set is missing
    return level.questions
  }

  private initializeLevel(levelNumber: number) {
    const level = this.lessonContent.levels[levelNumber]
    if (!level) return

    // Select appropriate question set based on attempt number
    const questionSet = this.selectQuestions(level)

    // Randomize questions in the selected set
    this.currentQuestions = this.shuffleArray([...questionSet])
    this.currentQuestionIndex = 0
    this.attemptState.currentLevel = levelNumber
    this.attemptState.mistakesInLevel = 0
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  private randomizeAnswerOptions(question: Question): Question {
    // For multiple choice questions, randomize the answer options
    if (
      question.type === 'multiple-choice' ||
      question.type === 'listen-and-select' ||
      question.type === 'sentence-completion'
    ) {
      const shuffledOptions = this.shuffleArray(question.options)
      return {
        ...question,
        options: shuffledOptions,
      }
    }
    return question
  }

  public getCurrentQuestion(): Question | null {
    if (this.currentQuestionIndex >= this.currentQuestions.length) {
      return null
    }
    // Return question with randomized answer options
    const question = this.currentQuestions[this.currentQuestionIndex]
    return this.randomizeAnswerOptions(question)
  }

  public submitAnswer(answer: string): {
    isCorrect: boolean
    shouldStopLevel: boolean
    isLevelComplete: boolean
    isLessonComplete: boolean
  } {
    const question = this.getCurrentQuestion()
    if (!question) {
      return {
        isCorrect: false,
        shouldStopLevel: false,
        isLevelComplete: true,
        isLessonComplete: this.isLessonComplete(),
      }
    }

    const isCorrect = answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()

    // Record response
    const response: ResponseRecord = {
      questionId: question.id,
      questionType: question.type,
      levelNumber: this.attemptState.currentLevel,
      studentAnswer: answer,
      isCorrect,
      answeredAt: new Date().toISOString(),
    }
    this.attemptState.responses.push(response)

    // Update counters
    this.attemptState.questionsAttempted++
    if (isCorrect) {
      this.attemptState.questionsCorrect++
    } else {
      this.attemptState.mistakesInLevel++
    }

    // Check if level should stop (2 mistakes)
    const shouldStopLevel = this.attemptState.mistakesInLevel >= MAX_MISTAKES_PER_LEVEL

    // Move to next question
    this.currentQuestionIndex++

    // Check if level is complete
    const isLevelComplete =
      shouldStopLevel || this.currentQuestionIndex >= this.currentQuestions.length

    return {
      isCorrect,
      shouldStopLevel,
      isLevelComplete,
      isLessonComplete: isLevelComplete && this.isLessonComplete(),
    }
  }

  public moveToNextLevel(): boolean {
    const nextLevelNumber = this.attemptState.currentLevel + 1
    if (nextLevelNumber >= this.lessonContent.levels.length) {
      return false // No more levels
    }

    this.attemptState.levelsCompleted++
    this.initializeLevel(nextLevelNumber)
    return true
  }

  public isLessonComplete(): boolean {
    return this.attemptState.currentLevel >= this.lessonContent.levels.length - 1
  }

  public getAttemptState(): AttemptState {
    return { ...this.attemptState }
  }

  public getProgress(): {
    currentLevel: number
    totalLevels: number
    questionsInCurrentLevel: number
    currentQuestionInLevel: number
    accuracy: number
  } {
    return {
      currentLevel: this.attemptState.currentLevel,
      totalLevels: this.lessonContent.levels.length,
      questionsInCurrentLevel: this.currentQuestions.length,
      currentQuestionInLevel: this.currentQuestionIndex,
      accuracy:
        this.attemptState.questionsAttempted > 0
          ? (this.attemptState.questionsCorrect / this.attemptState.questionsAttempted) * 100
          : 0,
    }
  }

  // Restore from saved state (for offline sync)
  public static fromState(
    lessonContent: LessonContent,
    savedState: AttemptState,
    attemptNumber: number = 1
  ): LessonEngine {
    const engine = new LessonEngine(
      savedState.attemptId,
      savedState.lessonId,
      lessonContent,
      attemptNumber
    )
    engine.attemptState = { ...savedState }
    engine.initializeLevel(savedState.currentLevel)
    return engine
  }
}
