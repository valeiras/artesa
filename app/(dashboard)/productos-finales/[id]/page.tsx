"use client";

import React from "react";
import { useDatabase } from "@/lib/hooks";
import { getSingleCommodityWithBatches } from "@/lib/actions/commodityActions";
import Spinner from "@/components/Spinner";
import PageWrapper from "@/components/PageWrapper";
import { CommodityBatchList } from "@/components/commodityBatches";

const SingleCommodityPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  // const { dbData: currProduct, isPending } = useDatabase({
  //   queryKey: ["productWithBatches", params.id],
  //   queryFn: () => getSingleProducWithBatches({ recordId: parseInt(params.id) }),
  // });

  // const currProduct = dbData;

  // if (isPending) {
  //   return (
  //     <div className="flex justify-center align-center h-[70dvh]">
  //       <Spinner width="50px" />
  //     </div>
  //   );
  // }

  return (
    // <PageWrapper heading={currProduct?.name || ""}>
    <PageWrapper heading={""}>{/* <ProductBatchList batches={currCommodity?.batches} /> */}</PageWrapper>
  );
};

export default SingleCommodityPage;
