"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "./FormComponents";
import { supplierFormSchema, SupplierFormType } from "@/utils/types";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSupplierAction } from "@/utils/actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

function NewSupplierForm() {
  const form = useForm<SupplierFormType>({
    resolver: zodResolver(supplierFormSchema),
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: SupplierFormType) => createSupplierAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast({ description: "Ha habido un error" });
        return;
      }
      toast({ description: "Proveedor creado" });
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
      router.push("/proveedores");
    },
  });

  function onSubmit(values: SupplierFormType) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">Nuevo proveedor</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-end mb-8">
          <CustomFormField name="name" control={form.control} label="Nombre del productor" placeholder="Proveedor" />
          <CustomFormField name="email" control={form.control} label="Email" placeholder="proveedor@mail.es" />
          <CustomFormField name="origin" control={form.control} label="Origen" placeholder="Málaga" />
        </div>
        <Button type="submit" className="w-64 mx-auto" disabled={isPending}>
          {isPending ? "Cargando" : "Crear"}
        </Button>
      </form>
    </Form>
  );
}
export default NewSupplierForm;
