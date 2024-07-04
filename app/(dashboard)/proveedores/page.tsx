import React from "react";

import SuppliersDataTable from "@/components/suppliers/SuppliersDataTable";
import PageWrapper from "@/components/PageWrapper";

const SuppliersPage: React.FC = async () => {
  return (
    <PageWrapper heading="Proveedores">
      <SuppliersDataTable />
    </PageWrapper>
  );
};

export default SuppliersPage;
