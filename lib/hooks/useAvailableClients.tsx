import { getAllClients } from "../actions/clientActions";
import useDatabaseData from "./useDatabaseData";
import { getAvailableArray } from "@/lib/utils";

const useAvailableClients = () => {
  const { dbData, isPending } = useDatabaseData({
    queryKey: ["clients"],
    queryFn: () => getAllClients(),
  });

  const availableClients = getAvailableArray(dbData);
  return { availableClients, isPending };
};

export default useAvailableClients;
