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
      clients: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: number
          name: string
          phone: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name: string
          phone?: string | null
          user_id?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string
          phone?: string | null
          user_id?: string
        }
        Relationships: []
      }
      commodities: {
        Row: {
          created_at: string
          external_id: string | null
          id: number
          name: string
          unit: Database["public"]["Enums"]["unit"]
          user_id: string
        }
        Insert: {
          created_at?: string
          external_id?: string | null
          id?: number
          name: string
          unit?: Database["public"]["Enums"]["unit"]
          user_id?: string
        }
        Update: {
          created_at?: string
          external_id?: string | null
          id?: number
          name?: string
          unit?: Database["public"]["Enums"]["unit"]
          user_id?: string
        }
        Relationships: []
      }
      commodity_batches: {
        Row: {
          comments: string | null
          commodity_id: number
          created_at: string
          date: string
          external_id: string
          id: number
          initial_amount: number
          supplier_id: number
          user_id: string
        }
        Insert: {
          comments?: string | null
          commodity_id: number
          created_at?: string
          date?: string
          external_id: string
          id?: number
          initial_amount: number
          supplier_id: number
          user_id?: string
        }
        Update: {
          comments?: string | null
          commodity_id?: number
          created_at?: string
          date?: string
          external_id?: string
          id?: number
          initial_amount?: number
          supplier_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "commodity_batches_commodity_id_fkey"
            columns: ["commodity_id"]
            isOneToOne: false
            referencedRelation: "commodities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commodity_batches_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      product_batch_ingredients: {
        Row: {
          commodity_ingredient_batch_id: number | null
          created_at: string
          id: number
          product_batch_id: number
          product_ingredient_batch_id: number | null
          used_amount: number
          user_id: string
        }
        Insert: {
          commodity_ingredient_batch_id?: number | null
          created_at?: string
          id?: number
          product_batch_id: number
          product_ingredient_batch_id?: number | null
          used_amount: number
          user_id?: string
        }
        Update: {
          commodity_ingredient_batch_id?: number | null
          created_at?: string
          id?: number
          product_batch_id?: number
          product_ingredient_batch_id?: number | null
          used_amount?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_batch_ingredients_commodity_ingredient_batch_id_fkey"
            columns: ["commodity_ingredient_batch_id"]
            isOneToOne: false
            referencedRelation: "commodity_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_batch_ingredients_product_batch_id_fkey"
            columns: ["product_batch_id"]
            isOneToOne: false
            referencedRelation: "product_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_batch_ingredients_product_ingredient_batch_id_fkey"
            columns: ["product_ingredient_batch_id"]
            isOneToOne: false
            referencedRelation: "product_batches"
            referencedColumns: ["id"]
          },
        ]
      }
      product_batches: {
        Row: {
          comments: string | null
          created_at: string
          date: string
          external_id: string
          id: number
          initial_amount: number
          product_id: number
          user_id: string
        }
        Insert: {
          comments?: string | null
          created_at?: string
          date?: string
          external_id: string
          id?: number
          initial_amount: number
          product_id: number
          user_id?: string
        }
        Update: {
          comments?: string | null
          created_at?: string
          date?: string
          external_id?: string
          id?: number
          initial_amount?: number
          product_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_batches_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_ingredients: {
        Row: {
          commodity_ingredient_id: number | null
          created_at: string
          id: number
          product_id: number
          product_ingredient_id: number | null
          user_id: string
        }
        Insert: {
          commodity_ingredient_id?: number | null
          created_at?: string
          id?: number
          product_id: number
          product_ingredient_id?: number | null
          user_id?: string
        }
        Update: {
          commodity_ingredient_id?: number | null
          created_at?: string
          id?: number
          product_id?: number
          product_ingredient_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_ingredients_commodity_ingredient_id_fkey"
            columns: ["commodity_ingredient_id"]
            isOneToOne: false
            referencedRelation: "commodities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_ingredients_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_ingredients_product_ingredient_id_fkey"
            columns: ["product_ingredient_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          external_id: string | null
          id: number
          name: string
          unit: Database["public"]["Enums"]["unit"]
          user_id: string
        }
        Insert: {
          created_at?: string
          external_id?: string | null
          id?: number
          name: string
          unit?: Database["public"]["Enums"]["unit"]
          user_id?: string
        }
        Update: {
          created_at?: string
          external_id?: string | null
          id?: number
          name?: string
          unit?: Database["public"]["Enums"]["unit"]
          user_id?: string
        }
        Relationships: []
      }
      sale_ingredients: {
        Row: {
          commodity_batch_id: number | null
          created_at: string
          id: number
          product_batch_id: number | null
          sale_id: number
          sold_amount: number
          user_id: string
        }
        Insert: {
          commodity_batch_id?: number | null
          created_at?: string
          id?: number
          product_batch_id?: number | null
          sale_id: number
          sold_amount: number
          user_id?: string
        }
        Update: {
          commodity_batch_id?: number | null
          created_at?: string
          id?: number
          product_batch_id?: number | null
          sale_id?: number
          sold_amount?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sale_ingredients_commodity_batch_id_fkey"
            columns: ["commodity_batch_id"]
            isOneToOne: false
            referencedRelation: "commodity_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_ingredients_product_batch_id_fkey"
            columns: ["product_batch_id"]
            isOneToOne: false
            referencedRelation: "product_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_ingredients_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          client_id: number
          comments: string | null
          created_at: string
          date: string
          external_id: string | null
          id: number
          user_id: string
        }
        Insert: {
          client_id: number
          comments?: string | null
          created_at?: string
          date: string
          external_id?: string | null
          id?: number
          user_id?: string
        }
        Update: {
          client_id?: number
          comments?: string | null
          created_at?: string
          date?: string
          external_id?: string | null
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: number
          name: string
          phone: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name: string
          phone?: string | null
          user_id?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string
          phone?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: number
          role: Database["public"]["Enums"]["role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          role?: Database["public"]["Enums"]["role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          role?: Database["public"]["Enums"]["role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      role: "minimum" | "limited" | "full"
      unit:
        | "unit"
        | "box"
        | "jar"
        | "g"
        | "kg"
        | "mg"
        | "l"
        | "dl"
        | "cl"
        | "ml"
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
