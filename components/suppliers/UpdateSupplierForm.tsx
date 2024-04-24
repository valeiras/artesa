"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ReadSupplierDBType, supplierFormSchema, SupplierFormType } from "@/lib/types";

import { useMutation } from "@tanstack/react-query";
import { updateSupplier } from "@/lib/actions/supplierActions";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import SupplierForm from "./SupplierForm";

type Props = { supplierData: ReadSupplierDBType };
const UpdateSupplierForm: React.FC<Props> = ({ supplierData }) => {
  const form = useForm<SupplierFormType>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      name: supplierData.name,
      email: supplierData.email || "",
      phone: supplierData.phone || "",
      address: supplierData.address || "",
    },
  });

  const successHandler = useQuerySuccessHandler({
    destinationAfterSuccess: "/proveedores",
    successToastMessage: "Proveedor actualizado con éxito",
    queryKeys: [["supplier", supplierData.id], ["suppliers"], ["stats"], ["charts"]],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: SupplierFormType) => updateSupplier(values, supplierData.id),
    onSuccess: successHandler,
    onError: (error) => console.log(error),
  });

  return (
    <SupplierForm
      form={form}
      mutate={mutate}
      isPending={isPending}
      formHeader="Editar proveedor"
      submitButtonLabel="Actualizar"
    />
  );
};
export default UpdateSupplierForm;
