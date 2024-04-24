"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { supplierFormSchema, SupplierFormType } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { createSupplier } from "@/lib/actions/supplierActions";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import SupplierForm from "./SupplierForm";
import { useDataTableContext } from "../dataTable/dataTableContext";

const NewSupplierForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Data table context if missing");
  const { setIsDialogOpen } = dataTableContext;

  const form = useForm<SupplierFormType>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: { name: "", email: "", phone: "", address: "" },
  });

  const successHandler = useQuerySuccessHandler({
    destinationAfterSuccess: "/proveedores",
    successToastMessage: "Proveedor creado con éxito",
    queryKeys: [["suppliers"], ["stats"], ["charts"]],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: SupplierFormType) => createSupplier(values),
    onSuccess: (e) => {
      setIsDialogOpen(false);
      successHandler(e);
    },
    onError: (error) => console.log(error),
  });

  return (
    <SupplierForm
      form={form}
      mutate={mutate}
      isPending={isPending}
      formHeader="Nuevo proveedor"
      submitButtonLabel="Crear"
    />
  );
};
export default NewSupplierForm;
