import React from "react";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomersPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold">Proveedores </h2>
      <div className="flex flex-col my-8">Lista de proveedores</div>
      <Button asChild variant="default">
        <Link href="/nuevo-proveedor" className="flex flex-row gap-x-2">
          <CirclePlus /> <span>Nuevo proveedor</span>
        </Link>
      </Button>
    </div>
  );
};

export default CustomersPage;
