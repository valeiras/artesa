"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { customerFormSchema, CustomerFormValueType, ReadCustomerDBType } from "@/lib/types";

import { useMutation } from "@tanstack/react-query";
import { updateCustomer } from "@/lib/actions/customerActions";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import CustomerForm from "./CustomerForm";
import { useDataTableContext } from "../dataTable/dataTableContext";

type Props = { customerData: ReadCustomerDBType };
const UpdateCustomerForm: React.FC<Props> = ({ customerData }) => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Data table context if missing");
  const { setIsDialogOpen } = dataTableContext;

  const form = useForm<CustomerFormValueType>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: customerData.name,
      email: customerData.email || "",
      phone: customerData.phone || "",
      address: customerData.address || "",
    },
  });

  const successHandler = useQuerySuccessHandler({
    successToastMessage: "Cliente actualizado con éxito",
    queryKeys: [["customer", customerData.id], ["customers"], ["stats"], ["charts"]],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CustomerFormValueType) => updateCustomer(values, customerData.id),
    onSuccess: (e) => {
      setIsDialogOpen(false);
      successHandler(e);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <CustomerForm
      form={form}
      mutate={mutate}
      isPending={isPending}
      formHeader="Editar cliente"
      submitButtonLabel="Actualizar"
    />
  );
};
export default UpdateCustomerForm;
