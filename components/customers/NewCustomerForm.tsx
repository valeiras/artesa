"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { customerFormSchema, CustomerFormType } from "@/lib/types";

import { useMutation } from "@tanstack/react-query";
import { createCustomer } from "@/lib/actions/customerActions";

import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import CustomerForm from "./CustomerForm";

const NewCustomerForm: React.FC = () => {
  const form = useForm<CustomerFormType>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: { name: "", email: "", phone: "", address: "" },
  });

  const successHandler = useQuerySuccessHandler({
    destinationAfterSuccess: "/clientes",
    successToastMessage: "Cliente creado con éxito",
    queryKeys: [["customers"], ["stats"], ["charts"]],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CustomerFormType) => createCustomer(values),
    onSuccess: successHandler,
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
