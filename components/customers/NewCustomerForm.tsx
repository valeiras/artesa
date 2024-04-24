"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { customerFormSchema, CustomerFormValueType } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { createCustomer } from "@/lib/actions/customerActions";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import CustomerForm from "./CustomerForm";
import { useDataTableContext } from "../dataTable/dataTableContext";

const NewCustomerForm: React.FC = () => {
  const dataTableContext = useDataTableContext();
  if (dataTableContext === null) throw new Error("Data table context if missing");
  const { setIsDialogOpen } = dataTableContext;

  const form = useForm<CustomerFormValueType>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: { name: "", email: "", phone: "", address: "" },
  });

  const successHandler = useQuerySuccessHandler({
    successToastMessage: "Cliente creado con éxito",
    queryKeys: [["customers"], ["stats"], ["charts"]],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CustomerFormValueType) => createCustomer(values),
    onSuccess: (e) => {
      setIsDialogOpen(false);
      successHandler(e);
    },
    onError: (error) => console.log(error),
  });

  return (
    <CustomerForm
      form={form}
      mutate={mutate}
      isPending={isPending}
      formHeader="Nuevo cliente"
      submitButtonLabel="Crear"
    />
  );
};
export default NewCustomerForm;
