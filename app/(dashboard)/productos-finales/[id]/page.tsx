"use client";

import React from "react";
import { useDatabase } from "@/lib/hooks";
import { getSingleCommodityWithBatches } from "@/lib/actions/commodityActions";
import Spinner from "@/components/Spinner";
import PageWrapper from "@/components/PageWrapper";
import BatchList from "@/components/batches/BatchList";
import { getSingleProductWithBatches } from "@/lib/actions/productActions";

const SingleCommodityPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { dbData: currProduct, isPending } = useDatabase({
    queryKey: ["productWithBatches", params.id],
    queryFn: () => getSingleProductWithBatches({ recordId: parseInt(params.id) }),
  });

  if (isPending) {
    return (
      <div className="flex justify-center align-center h-[70dvh]">
        <Spinner width="50px" />
      </div>
    );
  }

  return (
    <PageWrapper heading={currProduct?.name || ""}>
      <BatchList batches={currProduct?.batches} linkBase="productos-finales" />
    </PageWrapper>
  );
};

export default SingleCommodityPage;
