import { COMMODITY_PREFIX, PRODUCT_PREFIX } from "../constants";
import { useQuery } from "@tanstack/react-query";
import { getCommodityBatchesByCommodityId } from "../actions/commodityBatchActions";
import { getProductBatchesByProductId } from "../actions/productBatchActions";
import { ReadCommodityBatchDBType } from "@/lib/types";
import { ReadProductBatchDBType } from "@/lib/types";
import { PostgrestError } from "@supabase/supabase-js";

const useAvailableBatches = (articleId: string | null) => {
  let isCommodity: boolean = true;
  let commodityId: number = 0;
  let productId: number = 0;
  let prefix: string;
  let data:
    | { dbData: ReadCommodityBatchDBType[] | ReadProductBatchDBType[] | null; dbError: PostgrestError | null }
    | undefined;

  if (articleId) {
    if (articleId.startsWith(COMMODITY_PREFIX)) {
      prefix = COMMODITY_PREFIX;
      commodityId = parseInt(articleId.replace(COMMODITY_PREFIX, ""));
    } else {
      isCommodity = false;
      prefix = PRODUCT_PREFIX;
      productId = parseInt(articleId.replace(PRODUCT_PREFIX, ""));
      console.log(productId);
    }
  }

  const { data: commData, isPending: isCommPending } = useQuery({
    queryKey: ["commodityBatches", commodityId],
    queryFn: () => getCommodityBatchesByCommodityId({ recordId: commodityId }),
  });

  const { data: prodData, isPending: isProdPending } = useQuery({
    queryKey: ["productBatches", productId],
    queryFn: () => getProductBatchesByProductId({ recordId: productId }),
  });

  let availableBatches: { value: string; label: string }[] = [];
  let isPending: boolean = true;

  if (isCommodity) {
    isPending = isCommPending;
    data = commData;
  } else {
    isPending = isProdPending;
    data = prodData;
    console.log(prodData);
  }

  if (!data || data.dbError || !data.dbData) {
    availableBatches = [];
  } else {
    availableBatches = data.dbData.map(({ id, external_id }) => {
      return { value: `${prefix}${id}`, label: external_id };
    });
  }
  return { availableBatches, isPending };
};

export default useAvailableBatches;
