import { COMMODITY_PREFIX, PRODUCT_PREFIX } from "../constants";
import { useQuery } from "@tanstack/react-query";
import { getAllCommodityBatches } from "../actions/commodityBatchActions";
import { getAllProductBatches } from "../actions/productBatchActions";

const useAvailableBatches = () => {
  const { data: commData, isPending: isCommPending } = useQuery({
    queryKey: ["commodityBatches"],
    queryFn: () => getAllCommodityBatches(),
  });

  const { data: prodData, isPending: isProdPending } = useQuery({
    queryKey: ["productBatches"],
    queryFn: () => getAllProductBatches(),
  });

  let availableBatches: { value: string; label: string; articleId: string }[] = [];

  if (!prodData || prodData.dbError || !commData || commData.dbError) {
    availableBatches = [];
  } else {
    const availableCommBatches =
      commData.dbData?.map(({ id, external_id, commodity_id }) => {
        return {
          value: `${COMMODITY_PREFIX}${id}`,
          label: external_id,
          articleId: `${COMMODITY_PREFIX}${commodity_id}`,
        };
      }) || [];
    const availableProdBatches =
      prodData.dbData?.map(({ id, external_id, product_id }) => {
        return { value: `${PRODUCT_PREFIX}${id}`, label: external_id, articleId: `${PRODUCT_PREFIX}${product_id}` };
      }) || [];
    availableBatches = [...availableCommBatches, ...availableProdBatches];
  }
  return { availableBatches, isPending: isCommPending || isProdPending };
};

export default useAvailableBatches;
