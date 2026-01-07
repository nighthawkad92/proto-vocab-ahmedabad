export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      teachers: {
        Row: {
          id: string
          email: string
          name: string
          school: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          school?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          school?: string | null
          created_at?: string
        }
      }
      classes: {
        Row: {
          id: string
          teacher_id: string
          name: string
          class_code: string
          grade: number
          created_at: string
        }
        Insert: {
          id?: string
          teacher_id: string
          name: string
          class_code: string
          grade: number
          created_at?: string
        }
        Update: {
          id?: string
          teacher_id?: string
          name?: string
          class_code?: string
          grade?: number
          created_at?: string
        }
      }
      students: {
        Row: {
          id: string
          class_id: string
          name: string
          created_at: string
          last_active: string | null
        }
        Insert: {
          id?: string
          class_id: string
          name: string
          created_at?: string
          last_active?: string | null
        }
        Update: {
          id?: string
          class_id?: string
          name?: string
          created_at?: string
          last_active?: string | null
        }
      }
      lessons: {
        Row: {
          id: string
          title: string
          description: string
          grade: number
          order: number
          content: Json
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          grade: number
          order: number
          content: Json
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          grade?: number
          order?: number
          content?: Json
          created_at?: string
        }
      }
      lesson_unlocks: {
        Row: {
          id: string
          class_id: string
          lesson_id: string
          unlocked_at: string
          unlocked_by: string
        }
        Insert: {
          id?: string
          class_id: string
          lesson_id: string
          unlocked_at?: string
          unlocked_by: string
        }
        Update: {
          id?: string
          class_id?: string
          lesson_id?: string
          unlocked_at?: string
          unlocked_by?: string
        }
      }
      attempts: {
        Row: {
          id: string
          student_id: string
          lesson_id: string
          started_at: string
          completed_at: string | null
          questions_attempted: number
          questions_correct: number
          blocks_completed: number
          blocks_stopped_at: number | null
        }
        Insert: {
          id?: string
          student_id: string
          lesson_id: string
          started_at?: string
          completed_at?: string | null
          questions_attempted?: number
          questions_correct?: number
          blocks_completed?: number
          blocks_stopped_at?: number | null
        }
        Update: {
          id?: string
          student_id?: string
          lesson_id?: string
          started_at?: string
          completed_at?: string | null
          questions_attempted?: number
          questions_correct?: number
          blocks_completed?: number
          blocks_stopped_at?: number | null
        }
      }
      responses: {
        Row: {
          id: string
          attempt_id: string
          question_id: string
          question_type: string
          block_number: number
          student_answer: string | null
          is_correct: boolean
          answered_at: string
        }
        Insert: {
          id?: string
          attempt_id: string
          question_id: string
          question_type: string
          block_number: number
          student_answer?: string | null
          is_correct: boolean
          answered_at?: string
        }
        Update: {
          id?: string
          attempt_id?: string
          question_id?: string
          question_type?: string
          block_number?: number
          student_answer?: string | null
          is_correct?: boolean
          answered_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
