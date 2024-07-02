import React from "react";

import SalesDataTable from "@/components/sales/SalesDataTable";

const SalesPage: React.FC = async () => {
  return (
    <>
      <div className="flex flex-row justify-between items-center mb-8">
        <h2 className="item-list-header">Ventas:</h2>
      </div>
      <SalesDataTable />
    </>
  );
};

export default SalesPage;
