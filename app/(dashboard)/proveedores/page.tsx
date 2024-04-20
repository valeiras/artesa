import React from "react";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllSuppliersAction } from "@/utils/actions";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import SuppliersDataTable from "@/components/suppliers/SuppliersDataTable";

const SuppliersPage: React.FC = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["suppliers"],
    queryFn: () => getAllSuppliersAction(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full xl:w-4/5 mx-auto">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="item-list-header">Proveedores:</h2>
          <Button asChild variant="default">
            <Link href="/proveedores/nuevo-proveedor" className="flex flex-row gap-x-2">
              <CirclePlus /> <span>Nuevo proveedor</span>
            </Link>
          </Button>
        </div>
        <SuppliersDataTable />
      </div>
    </HydrationBoundary>
  );
};

export default SuppliersPage;
