"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@clerk/nextjs";
import { createSupabaseClient } from "@/lib/createSupabaseClient";

const ProductsPage: React.FC = () => {
  const { session } = useSession();
  const [loading, setLoading] = useState(true);

  // on first load, fetch and set todos
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        if (!session) return;
        const supabaseAccessToken = await session.getToken({
          template: "supabase",
        });
        if (!supabaseAccessToken) return;

        const supabase = await createSupabaseClient(supabaseAccessToken);
        const { data: todos } = await supabase.from("products").select("*");
        console.log(todos);
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [session]);

  return (
    <div>
      <h2 className="text-4xl font-bold">Productos</h2>
      <div className="flex flex-col my-8">Lista de productos</div>
      <Button asChild variant="default">
        <Link href="/nuevo-articulo" className="flex flex-row gap-x-2">
          <CirclePlus /> <span>Nuevo producto</span>
        </Link>
      </Button>
    </div>
  );
};

export default ProductsPage;
