import { PostgrestError } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

const useDatabase = <T,>({
  queryKey,
  queryFn,
}: {
  queryKey: string[];
  queryFn: () => Promise<{ dbData: T | null; dbError: PostgrestError | null }>;
}): { dbData: T | null; isPending: boolean } => {
  const { toast } = useToast();

  const { data, isPending } = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
  });

  if (isPending) return { dbData: null, isPending };

  if (!data) {
    toast({ title: "Ha habido un error", variant: "destructive" });
    return { dbData: null, isPending };
  }
  let { dbData, dbError } = data;

  if (dbError) {
    toast({ title: "Ha habido un error", variant: "destructive", description: dbError.message });
    return { dbData: null, isPending };
  }

  return { dbData, isPending };
};

export default useDatabase;
