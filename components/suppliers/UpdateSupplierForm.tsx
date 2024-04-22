"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { supplierFormSchema, SupplierFormType } from "@/lib/types";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getSingleSupplier, updateSupplier } from "@/lib/actions/supplierActions";
import { useEffect } from "react";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import SupplierForm from "./SupplierForm";

type Props = { supplierId: number };
const UpdateSupplierForm: React.FC<Props> = ({ supplierId }) => {
  const { data, isPending: isDataPending } = useQuery({
    queryKey: ["supplier", supplierId],
    queryFn: () => getSingleSupplier(supplierId),
  });

  const form = useForm<SupplierFormType>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: { name: "", email: "", phone: "", address: "" },
  });

  useEffect(() => {
    if (data) {
      const { dbData } = data;
      form.setValue("name", dbData?.name || "");
      form.setValue("email", dbData?.email || "");
      form.setValue("phone", dbData?.phone || "");
      form.setValue("address", dbData?.address || "");
    }
  }, [data, form]);

  const successHandler = useQuerySuccessHandler({
    destinationAfterSuccess: "/proveedores",
    successToastMessage: "Proveedor actualizado con éxito",
    queryKeys: [["supplier", supplierId], ["suppliers"], ["stats"], ["charts"]],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: SupplierFormType) => updateSupplier(values, supplierId),
    onSuccess: successHandler,
    onError: (error) => console.log(error),
  });

  if (!isDataPending && !data?.dbData) throw new Error("El id requerido no ha devuelto ningún valor");

  return (
    <SupplierForm
      form={form}
      mutate={mutate}
      isPending={isPending}
      formHeader="Editar proveedor"
      submitButtonLabel="Editar"
    />
  );
};
export default UpdateSupplierForm;
