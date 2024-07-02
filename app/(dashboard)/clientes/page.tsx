import React from "react";

import ClientsDataTable from "@/components/clients/ClientsDataTable";

const ClientsPage: React.FC = async () => {
  return (
    <>
      <div className="flex flex-row justify-between items-center mb-8">
        <h2 className="item-list-header">Clientes:</h2>
      </div>
      <ClientsDataTable />
    </>
  );
};

export default ClientsPage;
