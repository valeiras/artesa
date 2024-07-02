import { getAllClients } from "../actions/clientActions";
import useDatabase from "./useDatabase";
import { getAvailableArray } from "@/lib/utils";

const useAvailableClients = () => {
  const { dbData, isPending } = useDatabase({
    queryKey: ["clients"],
    queryFn: () => getAllClients(),
  });

  const availableClients = getAvailableArray(dbData);
  return { availableClients, isPending };
};

export default useAvailableClients;
