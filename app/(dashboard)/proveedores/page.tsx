import React from "react";

import SuppliersDataTable from "@/components/suppliers/SuppliersDataTable";

const SuppliersPage: React.FC = async () => {
  return (
    <>
      <div className="flex flex-row justify-between items-center mb-8">
        <h2 className="item-list-header">Proveedores:</h2>
      </div>
      <SuppliersDataTable />
    </>
  );
};

export default SuppliersPage;
