"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { customerFormSchema, CustomerFormType } from "@/lib/types";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getSingleCustomer, updateCustomer } from "@/lib/actions/customerActions";
import { useEffect } from "react";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import CustomerForm from "./CustomerForm";

type Props = { customerId: number };
const UpdateCustomerForm: React.FC<Props> = ({ customerId }) => {
  const { data, isPending: isDataPending } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => getSingleCustomer(customerId),
  });

  const form = useForm<CustomerFormType>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: data?.dbData?.name,
      email: data?.dbData?.email || "",
      phone: data?.dbData?.phone || "",
      address: data?.dbData?.address || "",
    },
  });

  const successHandler = useQuerySuccessHandler({
    destinationAfterSuccess: "/clientes",
    successToastMessage: "Cliente actualizado con éxito",
    queryKeys: [["customer", customerId], ["customers"], ["stats"], ["charts"]],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CustomerFormType) => updateCustomer(values, customerId),
    onSuccess: successHandler,
    onError: (error) => {
      console.log(error);
    },
  });

  if (!isDataPending && !data?.dbData) throw new Error("El id requerido no ha devuelto ningún valor");

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
