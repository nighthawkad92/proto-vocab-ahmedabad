import type { LessonContent, Question, AttemptState, ResponseRecord } from './types'

const MAX_MISTAKES_PER_BLOCK = 2

export class LessonEngine {
  private attemptState: AttemptState
  private lessonContent: LessonContent
  private currentQuestions: Question[]
  private currentQuestionIndex: number

  constructor(attemptId: string, lessonId: string, lessonContent: LessonContent) {
    this.attemptState = {
      attemptId,
      lessonId,
      currentBlock: 0,
      mistakesInBlock: 0,
      questionsAttempted: 0,
      questionsCorrect: 0,
      blocksCompleted: 0,
      responses: [],
    }
    this.lessonContent = lessonContent
    this.currentQuestions = []
    this.currentQuestionIndex = 0
    this.initializeBlock(0)
  }

  private initializeBlock(blockNumber: number) {
    const block = this.lessonContent.blocks[blockNumber]
    if (!block) return

    // Randomize questions in the block
    this.currentQuestions = this.shuffleArray([...block.questions])
    this.currentQuestionIndex = 0
    this.attemptState.currentBlock = blockNumber
    this.attemptState.mistakesInBlock = 0
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  public getCurrentQuestion(): Question | null {
    if (this.currentQuestionIndex >= this.currentQuestions.length) {
      return null
    }
    return this.currentQuestions[this.currentQuestionIndex]
  }

  public submitAnswer(answer: string): {
    isCorrect: boolean
    shouldStopBlock: boolean
    isBlockComplete: boolean
    isLessonComplete: boolean
  } {
    const question = this.getCurrentQuestion()
    if (!question) {
      return {
        isCorrect: false,
        shouldStopBlock: false,
        isBlockComplete: true,
        isLessonComplete: this.isLessonComplete(),
      }
    }

    const isCorrect = answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()

    // Record response
    const response: ResponseRecord = {
      questionId: question.id,
      questionType: question.type,
      blockNumber: this.attemptState.currentBlock,
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
      this.attemptState.mistakesInBlock++
    }

    // Check if block should stop (2 mistakes)
    const shouldStopBlock = this.attemptState.mistakesInBlock >= MAX_MISTAKES_PER_BLOCK

    // Move to next question
    this.currentQuestionIndex++

    // Check if block is complete
    const isBlockComplete =
      shouldStopBlock || this.currentQuestionIndex >= this.currentQuestions.length

    return {
      isCorrect,
      shouldStopBlock,
      isBlockComplete,
      isLessonComplete: isBlockComplete && this.isLessonComplete(),
    }
  }

  public moveToNextBlock(): boolean {
    const nextBlockNumber = this.attemptState.currentBlock + 1
    if (nextBlockNumber >= this.lessonContent.blocks.length) {
      return false // No more blocks
    }

    this.attemptState.blocksCompleted++
    this.initializeBlock(nextBlockNumber)
    return true
  }

  public isLessonComplete(): boolean {
    return this.attemptState.currentBlock >= this.lessonContent.blocks.length - 1
  }

  public getAttemptState(): AttemptState {
    return { ...this.attemptState }
  }

  public getProgress(): {
    currentBlock: number
    totalBlocks: number
    questionsInCurrentBlock: number
    currentQuestionInBlock: number
    accuracy: number
  } {
    return {
      currentBlock: this.attemptState.currentBlock,
      totalBlocks: this.lessonContent.blocks.length,
      questionsInCurrentBlock: this.currentQuestions.length,
      currentQuestionInBlock: this.currentQuestionIndex,
      accuracy:
        this.attemptState.questionsAttempted > 0
          ? (this.attemptState.questionsCorrect / this.attemptState.questionsAttempted) * 100
          : 0,
    }
  }

  // Restore from saved state (for offline sync)
  public static fromState(
    lessonContent: LessonContent,
    savedState: AttemptState
  ): LessonEngine {
    const engine = new LessonEngine(
      savedState.attemptId,
      savedState.lessonId,
      lessonContent
    )
    engine.attemptState = { ...savedState }
    engine.initializeBlock(savedState.currentBlock)
    return engine
  }
}
