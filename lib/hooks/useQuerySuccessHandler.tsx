import { PostgrestError } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import SuccessMessage from "@/components/SuccessMessage";

export function useQuerySuccessHandler({
  destinationAfterSuccess,
  successToastMessage,
  queryKeys,
}: {
  destinationAfterSuccess?: string;
  successToastMessage: string;
  queryKeys: (string | number)[][];
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  return ({ dbError }: { dbError: PostgrestError | null }) => {
    if (dbError) {
      toast({ title: "Ha habido un error", variant: "destructive", description: dbError.message });
      return;
    }

    queryKeys.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
    if (destinationAfterSuccess) router.push(destinationAfterSuccess);

    toast({
      description: <SuccessMessage text={successToastMessage} />,
    });
  };
}
