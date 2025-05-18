export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      beta_registrations: {
        Row: {
          created_at: string
          diagnosis: string[] | null
          email: string
          first_name: string
          goals: string[] | null
          goals_summary: string | null
          id: string
          last_name: string
          learning_differences: string[] | null
          paid_at: string | null
          phone: string | null
          plan_type: string
          reservation_id: string | null
          status: string | null
          stripe_customer_id: string | null
          stripe_session_id: string | null
          student_age: string | null
          student_name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          diagnosis?: string[] | null
          email: string
          first_name: string
          goals?: string[] | null
          goals_summary?: string | null
          id?: string
          last_name: string
          learning_differences?: string[] | null
          paid_at?: string | null
          phone?: string | null
          plan_type: string
          reservation_id?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_session_id?: string | null
          student_age?: string | null
          student_name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          diagnosis?: string[] | null
          email?: string
          first_name?: string
          goals?: string[] | null
          goals_summary?: string | null
          id?: string
          last_name?: string
          learning_differences?: string[] | null
          paid_at?: string | null
          phone?: string | null
          plan_type?: string
          reservation_id?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_session_id?: string | null
          student_age?: string | null
          student_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      payment_records: {
        Row: {
          cancel_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          payment_amount: number | null
          payment_date: string | null
          payment_method: string | null
          payment_status: string | null
          registration_id: string | null
          stripe_customer_id: string | null
          stripe_payment_id: string | null
          stripe_subscription_id: string | null
          subscription_status: string | null
        }
        Insert: {
          cancel_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          payment_amount?: number | null
          payment_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          registration_id?: string | null
          stripe_customer_id?: string | null
          stripe_payment_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
        }
        Update: {
          cancel_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          payment_amount?: number | null
          payment_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          registration_id?: string | null
          stripe_customer_id?: string | null
          stripe_payment_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_records_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "beta_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      pedagogy_chunks: {
        Row: {
          age_range: string | null
          chunk_index: number
          chunk_text: string
          created_at: string | null
          document_id: string | null
          embedding: string | null
          id: string
          ideal_use: string | null
          learning_differences: string[] | null
          tags: string[] | null
          topic: string | null
        }
        Insert: {
          age_range?: string | null
          chunk_index: number
          chunk_text: string
          created_at?: string | null
          document_id?: string | null
          embedding?: string | null
          id?: string
          ideal_use?: string | null
          learning_differences?: string[] | null
          tags?: string[] | null
          topic?: string | null
        }
        Update: {
          age_range?: string | null
          chunk_index?: number
          chunk_text?: string
          created_at?: string | null
          document_id?: string | null
          embedding?: string | null
          id?: string
          ideal_use?: string | null
          learning_differences?: string[] | null
          tags?: string[] | null
          topic?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pedagogy_chunks_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "pedagogy_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      pedagogy_documents: {
        Row: {
          created_at: string | null
          description: string | null
          document_type: string | null
          id: string
          source_url: string | null
          status: string | null
          tags: string[] | null
          topic: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          document_type?: string | null
          id?: string
          source_url?: string | null
          status?: string | null
          tags?: string[] | null
          topic: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          document_type?: string | null
          id?: string
          source_url?: string | null
          status?: string | null
          tags?: string[] | null
          topic?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      signup_data: {
        Row: {
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          learning_difference: string | null
          phone: string | null
          plan_type: string | null
          student_age: string | null
          student_name: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          learning_difference?: string | null
          phone?: string | null
          plan_type?: string | null
          student_age?: string | null
          student_name?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          learning_difference?: string | null
          phone?: string | null
          plan_type?: string | null
          student_age?: string | null
          student_name?: string | null
        }
        Relationships: []
      }
      student_access: {
        Row: {
          access_level: string | null
          admin_id: string | null
          created_at: string | null
          id: string
          parent_id: string | null
          relationship: string | null
          student_id: string | null
          teacher_id: string | null
          updated_at: string | null
        }
        Insert: {
          access_level?: string | null
          admin_id?: string | null
          created_at?: string | null
          id?: string
          parent_id?: string | null
          relationship?: string | null
          student_id?: string | null
          teacher_id?: string | null
          updated_at?: string | null
        }
        Update: {
          access_level?: string | null
          admin_id?: string | null
          created_at?: string | null
          id?: string
          parent_id?: string | null
          relationship?: string | null
          student_id?: string | null
          teacher_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_access_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "beta_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      student_chunks: {
        Row: {
          chunk_metadata: Json | null
          chunk_text: string | null
          created_at: string | null
          embedding: string | null
          id: string
          last_accessed: string | null
          relevance_score: number | null
          source_doc: string | null
          uuid: string | null
        }
        Insert: {
          chunk_metadata?: Json | null
          chunk_text?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: string
          last_accessed?: string | null
          relevance_score?: number | null
          source_doc?: string | null
          uuid?: string | null
        }
        Update: {
          chunk_metadata?: Json | null
          chunk_text?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: string
          last_accessed?: string | null
          relevance_score?: number | null
          source_doc?: string | null
          uuid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_chunks_source_doc_fkey"
            columns: ["source_doc"]
            isOneToOne: false
            referencedRelation: "uploads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_chunks_uuid_fkey"
            columns: ["uuid"]
            isOneToOne: false
            referencedRelation: "beta_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      student_goals: {
        Row: {
          achieved: boolean | null
          achievement_date: string | null
          created_at: string | null
          estimated_timeframe: string | null
          evidence_sources: Json | null
          id: string
          long_term_goal: string | null
          recommended_days_per_week: number | null
          recommended_minutes_per_session: number | null
          short_term_goals: Json | null
          suggested_activities: Json | null
          updated_at: string | null
          uuid: string | null
        }
        Insert: {
          achieved?: boolean | null
          achievement_date?: string | null
          created_at?: string | null
          estimated_timeframe?: string | null
          evidence_sources?: Json | null
          id?: string
          long_term_goal?: string | null
          recommended_days_per_week?: number | null
          recommended_minutes_per_session?: number | null
          short_term_goals?: Json | null
          suggested_activities?: Json | null
          updated_at?: string | null
          uuid?: string | null
        }
        Update: {
          achieved?: boolean | null
          achievement_date?: string | null
          created_at?: string | null
          estimated_timeframe?: string | null
          evidence_sources?: Json | null
          id?: string
          long_term_goal?: string | null
          recommended_days_per_week?: number | null
          recommended_minutes_per_session?: number | null
          short_term_goals?: Json | null
          suggested_activities?: Json | null
          updated_at?: string | null
          uuid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_goals_uuid_fkey"
            columns: ["uuid"]
            isOneToOne: false
            referencedRelation: "beta_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_events: {
        Row: {
          created_at: string | null
          id: string
          stripe_event_data: Json
          stripe_event_id: string
          stripe_event_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          stripe_event_data: Json
          stripe_event_id: string
          stripe_event_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          stripe_event_data?: Json
          stripe_event_id?: string
          stripe_event_type?: string
        }
        Relationships: []
      }
      uploads: {
        Row: {
          doc_type: string | null
          file_name: string | null
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          metadata: Json | null
          processed: boolean | null
          uploaded_at: string | null
          uploaded_by: string | null
          uuid: string | null
        }
        Insert: {
          doc_type?: string | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          metadata?: Json | null
          processed?: boolean | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          uuid?: string | null
        }
        Update: {
          doc_type?: string | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          metadata?: Json | null
          processed?: boolean | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          uuid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "uploads_uuid_fkey"
            columns: ["uuid"]
            isOneToOne: false
            referencedRelation: "beta_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      bytea_to_text: {
        Args: { data: string }
        Returns: string
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete: {
        Args:
          | { uri: string }
          | { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_get: {
        Args: { uri: string } | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post: {
        Args:
          | { uri: string; content: string; content_type: string }
          | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_put: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      match_pedagogy_chunks: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
        }
        Returns: {
          id: string
          chunk_text: string
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      text_to_bytea: {
        Args: { data: string }
        Returns: string
      }
      urlencode: {
        Args: { data: Json } | { string: string } | { string: string }
        Returns: string
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      learning_difference:
        | "ADHD"
        | "Dyslexia"
        | "Executive_Functioning"
        | "Autism"
        | "Dyscalculia"
        | "Self_Advocacy"
        | "Processing_Speed"
        | "Auditory Processing"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      learning_difference: [
        "ADHD",
        "Dyslexia",
        "Executive_Functioning",
        "Autism",
        "Dyscalculia",
        "Self_Advocacy",
        "Processing_Speed",
        "Auditory Processing",
      ],
    },
  },
} as const
