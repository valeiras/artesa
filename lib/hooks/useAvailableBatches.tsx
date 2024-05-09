import { getAllCommodities } from "../actions/commodityActions";
import { getAllProducts } from "../actions/productActions";
import { COMMODITY_PREFIX, PRODUCT_PREFIX } from "../constants";
import { getAvailableArray } from "../utils";
import { useQuery } from "@tanstack/react-query";

const useAvailableBatches = (articleId) => {
  const { data: commoditiesData, isPending: isCommoditiesDataPending } = useQuery({
    queryKey: ["commodities"],
    queryFn: () => getAllCommodities(),
  });

  const { data: productsData, isPending: isProductsDataPending } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });

  const availableCommodities = getAvailableArray(commoditiesData?.dbData, COMMODITY_PREFIX);
  const availableProducts = getAvailableArray(productsData?.dbData, PRODUCT_PREFIX);
  const availableArticles = [...availableCommodities, ...availableProducts];
  const isPending = isProductsDataPending || isCommoditiesDataPending;

  return {
    availableArticles,
    availableCommodities,
    availableProducts,
    isPending,
    isCommoditiesDataPending,
    isProductsDataPending,
  };
};

export default useAvailableBatches;
