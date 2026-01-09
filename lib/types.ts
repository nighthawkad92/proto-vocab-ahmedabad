// Lesson content types
export type QuestionType =
  | 'multiple-choice'
  | 'word-match'
  | 'sentence-completion'
  | 'picture-word-match'
  | 'listen-and-select'
  | 'sentence-rearrange'      // NEW: Drag/tap to arrange words into correct sentence
  | 'story-sequence'          // NEW: Order story events chronologically
  | 'add-word'                // NEW: Add adjectives/adverbs to expand sentences
  | 'sentence-gap-fill'       // NEW: Fill blank with context-appropriate word
  | 'reading-comprehension'   // NEW: Read passage, answer Who/What/Where questions

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
  // Extended fields for new question types
  scrambledItems?: string[]        // For sentence-rearrange, story-sequence
  correctOrder?: number[]           // For sentence-rearrange, story-sequence
  passage?: string                  // For reading-comprehension
  questionType?: 'who' | 'what' | 'where' | 'when' | 'why' | 'how'  // For reading-comprehension
  baseSentence?: string             // For add-word
  wordType?: 'adjective' | 'adverb' | 'prepositional-phrase'  // For add-word
  insertPosition?: number           // For add-word
  correctAnswers?: string[]         // For add-word (multiple valid answers)
  exampleSentence?: string          // For add-word (shows completed example before exercise)
  gapPosition?: number              // For sentence-gap-fill
}

export interface LevelIntroduction {
  concept: string
  explanation: string
  example: string
  activity: string
}

export interface LessonLevel {
  levelNumber: number
  introduction?: LevelIntroduction
  questions: Question[]
  rotationSets?: Question[][] // Optional: alternate question sets for retakes
}

export interface LessonContent {
  title: string
  description: string
  levels: LessonLevel[]
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
  currentLevel: number
  mistakesInLevel: number
  questionsAttempted: number
  questionsCorrect: number
  levelsCompleted: number
  responses: ResponseRecord[]
  isAbandoned?: boolean
  abandonedAt?: string
}

export interface ResponseRecord {
  questionId: string
  questionType: string
  levelNumber: number
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
