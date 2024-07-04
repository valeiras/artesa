import React from "react";

import ClientsDataTable from "@/components/clients/ClientsDataTable";
import PageWrapper from "@/components/PageWrapper";

const ClientsPage: React.FC = async () => {
  return (
    <PageWrapper heading="Clientes">
      <ClientsDataTable />
    </PageWrapper>
  );
};

export default ClientsPage;
