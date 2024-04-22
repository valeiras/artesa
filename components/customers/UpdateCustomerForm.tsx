"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "../FormComponents";
import { customerFormSchema, CustomerFormType } from "@/lib/types";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getSingleCustomer, updateCustomer } from "@/lib/actions/customerActions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import SuccessMessage from "../SuccesMessage";
import { useEffect } from "react";
import FormButtons from "../FormButtons";

type Props = { customerId: string };
const UpdateCustomerForm: React.FC<Props> = ({ customerId }) => {
  const { data, isPending: isDataPending } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => getSingleCustomer(customerId),
  });

  const form = useForm<CustomerFormType>({
    resolver: zodResolver(customerFormSchema),
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

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CustomerFormType) => updateCustomer(values, customerId),
    onSuccess: ({ dbError }) => {
      if (dbError) {
        toast({ title: "Ha habido un error", variant: "destructive", description: dbError.message });
        return;
      }

      toast({
        description: <SuccessMessage text="Cliente editado con éxito" />,
      });
      queryClient.invalidateQueries({ queryKey: ["customer", customerId] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });
      router.push("/clientes");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function onSubmit(values: CustomerFormType) {
    mutate(values);
  }
  if (isDataPending) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">Editar cliente</h2>
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 items-start mb-8 content-start">
          <CustomFormField name="name" control={form.control} label="Nombre del cliente" placeholder="Cliente" />
          <CustomFormField name="email" control={form.control} label="Email" placeholder="cliente@mail.es" />
          <CustomFormField name="phone" control={form.control} label="Número de teléfono" placeholder="600100200" />
          <CustomFormField name="address" control={form.control} label="Dirección" placeholder="C/" />
        </div>
        <FormButtons isPending={isPending} submitButtonLabel="Editar" cancelButtonHref="/clientes" />
      </form>
    </Form>
  );
};
export default UpdateCustomerForm;
