export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      attempts: {
        Row: {
          abandoned_at: string | null
          completed_at: string | null
          duration_seconds: number | null
          id: string
          is_abandoned: boolean | null
          lesson_id: string
          levels_completed: number
          levels_stopped_at: number | null
          questions_attempted: number | null
          questions_correct: number | null
          score: number | null
          started_at: string | null
          student_id: string
        }
        Insert: {
          abandoned_at?: string | null
          completed_at?: string | null
          duration_seconds?: number | null
          id?: string
          is_abandoned?: boolean | null
          lesson_id: string
          levels_completed?: number
          levels_stopped_at?: number | null
          questions_attempted?: number | null
          questions_correct?: number | null
          score?: number | null
          started_at?: string | null
          student_id: string
        }
        Update: {
          abandoned_at?: string | null
          completed_at?: string | null
          duration_seconds?: number | null
          id?: string
          is_abandoned?: boolean | null
          lesson_id?: string
          levels_completed?: number
          levels_stopped_at?: number | null
          questions_attempted?: number | null
          questions_correct?: number | null
          score?: number | null
          started_at?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attempts_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attempts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          created_at: string | null
          criteria: Json
          description: string | null
          icon: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          criteria: Json
          description?: string | null
          icon: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          criteria?: Json
          description?: string | null
          icon?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      classes: {
        Row: {
          class_code: string
          created_at: string | null
          grade: number
          id: string
          name: string
          teacher_id: string
        }
        Insert: {
          class_code: string
          created_at?: string | null
          grade?: number
          id?: string
          name: string
          teacher_id: string
        }
        Update: {
          class_code?: string
          created_at?: string | null
          grade?: number
          id?: string
          name?: string
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content: Json
          created_at: string | null
          description: string | null
          grade: number
          id: string
          order: number
          title: string
        }
        Insert: {
          content: Json
          created_at?: string | null
          description?: string | null
          grade?: number
          id?: string
          order: number
          title: string
        }
        Update: {
          content?: Json
          created_at?: string | null
          description?: string | null
          grade?: number
          id?: string
          order?: number
          title?: string
        }
        Relationships: []
      }
      responses: {
        Row: {
          answered_at: string | null
          attempt_id: string
          id: string
          is_correct: boolean
          level_number: number
          question_id: string
          question_type: string
          student_answer: string | null
        }
        Insert: {
          answered_at?: string | null
          attempt_id: string
          id?: string
          is_correct: boolean
          level_number?: number
          question_id: string
          question_type: string
          student_answer?: string | null
        }
        Update: {
          answered_at?: string | null
          attempt_id?: string
          id?: string
          is_correct?: boolean
          level_number?: number
          question_id?: string
          question_type?: string
          student_answer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "responses_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "attempts"
            referencedColumns: ["id"]
          },
        ]
      }
      student_badges: {
        Row: {
          badge_id: string
          earned_at: string | null
          id: string
          student_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string | null
          id?: string
          student_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string | null
          id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_badges_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_stats: {
        Row: {
          created_at: string | null
          current_streak_days: number | null
          id: string
          last_practice_date: string | null
          longest_streak_days: number | null
          student_id: string
          total_lessons_completed: number | null
          total_levels_completed: number | null
          total_questions_answered: number | null
          total_questions_correct: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_streak_days?: number | null
          id?: string
          last_practice_date?: string | null
          longest_streak_days?: number | null
          student_id: string
          total_lessons_completed?: number | null
          total_levels_completed?: number | null
          total_questions_answered?: number | null
          total_questions_correct?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_streak_days?: number | null
          id?: string
          last_practice_date?: string | null
          longest_streak_days?: number | null
          student_id?: string
          total_lessons_completed?: number | null
          total_levels_completed?: number | null
          total_questions_answered?: number | null
          total_questions_correct?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_stats_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: true
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          class_id: string
          created_at: string | null
          id: string
          last_active: string | null
          name: string
        }
        Insert: {
          class_id: string
          created_at?: string | null
          id?: string
          last_active?: string | null
          name: string
        }
        Update: {
          class_id?: string
          created_at?: string | null
          id?: string
          last_active?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          school: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          school?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          school?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_class_code: { Args: never; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
