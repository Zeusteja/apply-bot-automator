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
      automated_applications: {
        Row: {
          cover_letter_template: string | null
          created_at: string
          id: string
          job_id: string
          linkedin_profile: string | null
          resume_url: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cover_letter_template?: string | null
          created_at?: string
          id?: string
          job_id: string
          linkedin_profile?: string | null
          resume_url?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cover_letter_template?: string | null
          created_at?: string
          id?: string
          job_id?: string
          linkedin_profile?: string | null
          resume_url?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "automated_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      job_search_automation: {
        Row: {
          auto_apply: boolean | null
          cover_letter_template: string | null
          created_at: string
          id: string
          is_active: boolean | null
          job_title: string
          keywords: string[] | null
          last_search_at: string | null
          linkedin_profile: string | null
          location: string | null
          max_salary: number | null
          min_salary: number | null
          remote_only: boolean | null
          required_skills: string[] | null
          resume_url: string | null
          search_glassdoor: boolean | null
          search_indeed: boolean | null
          search_interval_hours: number | null
          search_linkedin: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_apply?: boolean | null
          cover_letter_template?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          job_title: string
          keywords?: string[] | null
          last_search_at?: string | null
          linkedin_profile?: string | null
          location?: string | null
          max_salary?: number | null
          min_salary?: number | null
          remote_only?: boolean | null
          required_skills?: string[] | null
          resume_url?: string | null
          search_glassdoor?: boolean | null
          search_indeed?: boolean | null
          search_interval_hours?: number | null
          search_linkedin?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_apply?: boolean | null
          cover_letter_template?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          job_title?: string
          keywords?: string[] | null
          last_search_at?: string | null
          linkedin_profile?: string | null
          location?: string | null
          max_salary?: number | null
          min_salary?: number | null
          remote_only?: boolean | null
          required_skills?: string[] | null
          resume_url?: string | null
          search_glassdoor?: boolean | null
          search_indeed?: boolean | null
          search_interval_hours?: number | null
          search_linkedin?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          company: string
          created_at: string
          description: string | null
          id: string
          location: string | null
          notes: string | null
          salary: string | null
          status: string | null
          title: string
          updated_at: string
          url: string | null
          user_id: string
        }
        Insert: {
          company: string
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          salary?: string | null
          status?: string | null
          title: string
          updated_at?: string
          url?: string | null
          user_id: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          salary?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
