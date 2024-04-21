"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "../FormComponents";
import { supplierFormSchema, SupplierFormType } from "@/lib/types";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getSingleSupplier, updateSupplier } from "@/lib/actions/supplierActions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import SuccessMessage from "../SuccesMessage";
import { useEffect } from "react";

type Props = { supplierId: string };
const UpdateSupplierForm: React.FC<Props> = ({ supplierId }) => {
  const { data, isPending: isDataPending } = useQuery({
    queryKey: ["supplier", supplierId],
    queryFn: () => getSingleSupplier(supplierId),
  });

  const form = useForm<SupplierFormType>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: { name: "", phone: null, email: null, address: null },
  });

  useEffect(() => {
    if (data?.name) form.setValue("name", data.name);
    if (data?.email) form.setValue("email", data.email);
    if (data?.phone) form.setValue("phone", data.phone);
    if (data?.address) form.setValue("address", data.address);
  }, [data, form]);

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: SupplierFormType) => updateSupplier(values, supplierId),
    onSuccess: (dataOrError) => {
      if ("message" in dataOrError) {
        const error = dataOrError;
        toast({ title: "Ha habido un error", variant: "destructive", description: error.message });
        return;
      }

      toast({
        description: <SuccessMessage text="Proveedor editado con éxito" />,
      });
      queryClient.invalidateQueries({ queryKey: ["supplier", supplierId] });
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
      router.push("/proveedores");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function onSubmit(values: SupplierFormType) {
    mutate(values);
  }
  if (isDataPending) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">Editar proveedor</h2>
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 items-start mb-8 content-start">
          <CustomFormField name="name" control={form.control} label="Nombre del proveedor" placeholder="Proveedor" />
          <CustomFormField name="email" control={form.control} label="Email" placeholder="proveedor@mail.es" />
          <CustomFormField name="phone" control={form.control} label="Número de teléfono" placeholder="600100200" />
          <CustomFormField name="address" control={form.control} label="Dirección" placeholder="C/" />
        </div>
        <Button type="submit" className="w-64 mx-auto" disabled={isPending}>
          {isPending ? "Cargando" : "Editar"}
        </Button>
      </form>
    </Form>
  );
};
export default UpdateSupplierForm;
