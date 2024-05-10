import { PostgrestError } from "@supabase/supabase-js";
import { getAllCommodities } from "../actions/commodityActions";
import { COMMODITY_PREFIX, PRODUCT_PREFIX } from "../constants";
import { ReadCommodityBatchDBType, ReadProductBatchDBType } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getCommodityBatchesByCommodityId } from "../actions/commodityBatchActions";
import { getProductBatchesByProductId } from "../actions/productBatchActions";

const useAvailableBatches = (articleId: string) => {
  type ResponseType = {
    dbData: ReadCommodityBatchDBType[] | ReadProductBatchDBType[] | null;
    dbError: PostgrestError | null;
  };
  let id: number;
  let prefix: string;
  let queryFn: () => Promise<ResponseType>;

  if (articleId.startsWith(PRODUCT_PREFIX)) {
    prefix = PRODUCT_PREFIX;
    queryFn = () => getCommodityBatchesByCommodityId({ recordId: id });
  } else {
    prefix = COMMODITY_PREFIX;
    queryFn = () => getProductBatchesByProductId({ recordId: id });
  }
  id = parseInt(articleId.replace(prefix, ""));

  const { data, isPending } = useQuery({
    queryKey: ["articleBatches", articleId],
    queryFn: queryFn,
  });

  if (!data || data.dbError || !data.dbData) return { availableBatches: [], isPending };

  const availableBatches = data.dbData.map(({ id, external_id }) => {
    return { value: `${prefix}${id}`, label: external_id };
  });

  return {
    availableBatches,
    isPending,
  };
};

export default useAvailableBatches;
