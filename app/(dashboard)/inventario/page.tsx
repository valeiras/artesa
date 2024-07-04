import React from "react";
import underConstruction from "@/assets/under_construction.svg";
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";

const InventoryPage: React.FC = () => {
  return (
    <PageWrapper heading="Inventario">
      <Image src={underConstruction} alt="Trabajo en curso" className="w-1/2 mt-16" />
    </PageWrapper>
  );
};

export default InventoryPage;
