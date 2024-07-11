import { PostgrestError } from "@supabase/supabase-js";
import { ToastType } from "@/components/ui/use-toast";

const checkDataFromDatabase = <T>(
  data: { dbData: T | null; dbError: PostgrestError | null } | undefined | null,
  toast: ToastType
): { dbData: T | null } => {
  if (!data) {
    toast({ title: "Ha habido un error", variant: "destructive" });
    return { dbData: null };
  }
  let { dbData, dbError } = data;

  if (dbError) {
    toast({ title: "Ha habido un error", variant: "destructive", description: dbError.message });
    return { dbData: null };
  }

  return { dbData };
};

export default checkDataFromDatabase;
