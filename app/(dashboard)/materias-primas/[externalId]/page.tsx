import React from "react";
import underConstruction from "@/assets/under_construction.svg";
import Image from "next/image";

const InventoryPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <h2 className="text-4xl font-bold text-center">Estamos trabajando en ello...</h2>
      <Image src={underConstruction} alt="Trabajo en curso" className="w-1/2 mt-16" />
    </div>
  );
};

export default InventoryPage;
