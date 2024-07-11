import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/types/database.types";

export const createSupabaseClient = async (supabaseAccessToken: string) => {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_KEY as string,
    {
      global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
    }
  );

  return supabase;
};
