import React from "react";

import SalesDataTable from "@/components/sales/SalesDataTable";
import PageWrapper from "@/components/PageWrapper";

const SalesPage: React.FC = async () => {
  return (
    <PageWrapper heading="Ventas">
      <SalesDataTable />
    </PageWrapper>
  );
};

export default SalesPage;
