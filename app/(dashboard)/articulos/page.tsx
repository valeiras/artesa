import Link from "next/link";
import React from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const ArticlesPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold">Artículos</h2>
      <div className="flex flex-col my-8">Lista de artículos</div>
      <Button asChild variant="default">
        <Link href="/nuevo-articulo" className="flex flex-row gap-x-2">
          <CirclePlus /> <span>Nuevo artículo</span>
        </Link>
      </Button>
    </div>
  );
};

export default ArticlesPage;
