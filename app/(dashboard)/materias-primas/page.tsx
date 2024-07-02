import React from "react";

import CommoditiesDataTable from "@/components/commodities/CommoditiesDataTable";

const CommoditiesPage: React.FC = async () => {
  return (
    <>
      <div className="flex flex-row justify-between items-center mb-8">
        <h2 className="item-list-header">Materias primas:</h2>
      </div>
      <CommoditiesDataTable />
    </>
  );
};

export default CommoditiesPage;
