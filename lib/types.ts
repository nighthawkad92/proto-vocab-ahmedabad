// Lesson content types
export type QuestionType =
  | 'multiple-choice'
  | 'word-match'
  | 'sentence-completion'
  | 'picture-word-match'
  | 'listen-and-select'

export interface Question {
  id: string
  type: QuestionType
  prompt: string
  audioUrl?: string
  imageUrl?: string
  options: string[]
  correctAnswer: string
  explanation?: string
  feedback?: {
    correct?: string
    incorrect?: string
    explanation?: string
  }
}

export interface BlockIntroduction {
  concept: string
  explanation: string
  example: string
  activity: string
}

export interface LessonBlock {
  blockNumber: number
  introduction?: BlockIntroduction
  questions: Question[]
  rotationSets?: Question[][] // Optional: alternate question sets for retakes
}

export interface LessonContent {
  title: string
  description: string
  blocks: LessonBlock[]
  rotationEnabled?: boolean // Whether to use rotation sets on retakes
}

// Student session
export interface StudentSession {
  studentId: string
  studentName: string
  classId: string
  classCode: string
}

// Attempt tracking
export interface AttemptState {
  attemptId: string
  lessonId: string
  currentBlock: number
  mistakesInBlock: number
  questionsAttempted: number
  questionsCorrect: number
  blocksCompleted: number
  responses: ResponseRecord[]
}

export interface ResponseRecord {
  questionId: string
  questionType: string
  blockNumber: number
  studentAnswer: string | null
  isCorrect: boolean
  answeredAt: string
}

// Teacher dashboard
export interface StudentProgress {
  studentId: string
  studentName: string
  lastActive: string | null
  totalAttempts: number
  completedLessons: number
  averageAccuracy: number
}

export interface LessonUnlock {
  lessonId: string
  lessonTitle: string
  isUnlocked: boolean
  unlockedAt?: string
}
