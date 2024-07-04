import React from "react";

import CommoditiesDataTable from "@/components/commodities/CommoditiesDataTable";
import PageWrapper from "@/components/PageWrapper";

const CommoditiesPage: React.FC = async () => {
  return (
    <PageWrapper heading="Materias primas">
      <CommoditiesDataTable />
    </PageWrapper>
  );
};

export default CommoditiesPage;
