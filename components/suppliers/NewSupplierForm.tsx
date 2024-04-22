"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { supplierFormSchema, SupplierFormType } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { createSupplier } from "@/lib/actions/supplierActions";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import SupplierForm from "./SupplierForm";

const NewSupplierForm: React.FC = () => {
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
    onSuccess: successHandler,
    onError: (error) => console.log(error),
  });

  return <SupplierForm form={form} mutate={mutate} isPending={isPending} formHeader="Nuevo proveedor" submitButtonLabel="Crear"/>;
};
export default NewSupplierForm;
