"use client";

import React from "react";
import { useDatabase } from "@/lib/hooks";
import { getSingleCommodityWithBatches } from "@/lib/actions/commodityActions";
import Spinner from "@/components/Spinner";
import PageWrapper from "@/components/PageWrapper";
import BatchList from "@/components/batches/BatchList";

const SingleCommodityPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { dbData: currCommodity, isPending } = useDatabase({
    queryKey: ["commodityWithBatches", params.id],
    queryFn: () => getSingleCommodityWithBatches({ recordId: parseInt(params.id) }),
  });

  if (isPending) {
    return (
      <div className="flex justify-center align-center h-[70dvh]">
        <Spinner width="50px" />
      </div>
    );
  }

  return (
    <PageWrapper heading={currCommodity?.name || ""}>
      <BatchList batches={currCommodity?.batches} linkBase="materias-primas" />
    </PageWrapper>
  );
};

export default SingleCommodityPage;
