"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { customerFormSchema, CustomerFormType, ReadCustomerDBType } from "@/lib/types";

import { useMutation } from "@tanstack/react-query";
import { updateCustomer } from "@/lib/actions/customerActions";
import { useQuerySuccessHandler } from "@/lib/useQuerySuccessHandler";
import CustomerForm from "./CustomerForm";

type Props = { customerData: ReadCustomerDBType };
const UpdateCustomerForm: React.FC<Props> = ({ customerData }) => {
  const form = useForm<CustomerFormType>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: customerData.name,
      email: customerData.email || "",
      phone: customerData.phone || "",
      address: customerData.address || "",
    },
  });

  const successHandler = useQuerySuccessHandler({
    destinationAfterSuccess: "/clientes",
    successToastMessage: "Cliente actualizado con éxito",
    queryKeys: [["customer", customerData.id], ["customers"], ["stats"], ["charts"]],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CustomerFormType) => updateCustomer(values, customerData.id),
    onSuccess: successHandler,
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
