"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";
import { useDatabase } from "@/lib/hooks";
import Spinner from "@/components/Spinner";
import { getSingleSupplierWithBatches } from "@/lib/actions/supplierActions";
import SupplierInfoCard from "@/components/suppliers/SupplierInfoCard";

const SingleSupplierPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { dbData: currSupplier, isPending } = useDatabase({
    queryKey: ["providerWithBatches", params.id],
    queryFn: () => getSingleSupplierWithBatches({ recordId: parseInt(params.id) }),
  });

  if (isPending) {
    return (
      <div className="flex justify-center align-center h-[70dvh]">
        <Spinner width="50px" />
      </div>
    );
  }

  if (!currSupplier) {
    return <p>No se encontró el proveedor.</p>;
  }

  return (
    <PageWrapper heading={currSupplier?.name || ""}>
      <div className="pt-4">
        <SupplierInfoCard currSupplier={currSupplier} className="md:max-w-[1000px]" />
      </div>
    </PageWrapper>
  );
};

export default SingleSupplierPage;
