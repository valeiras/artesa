"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { CustomFormField } from "../FormComponents";
import { customerFormSchema, CustomerFormType } from "@/lib/types";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer } from "@/lib/actions/customerActions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import SuccessMessage from "../SuccesMessage";
import FormButtons from "../FormButtons";

const NewCustomerForm: React.FC = () => {
  const form = useForm<CustomerFormType>({
    resolver: zodResolver(customerFormSchema),
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CustomerFormType) => createCustomer(values),
    onSuccess: ({ dbError }) => {
      if (dbError) {
        toast({ title: "Ha habido un error", variant: "destructive", description: dbError.message });
        return;
      }

      toast({
        description: <SuccessMessage text="Cliente creado con éxito" />,
      });
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">Nuevo cliente</h2>
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 items-start mb-8 content-start">
          <CustomFormField name="name" control={form.control} label="Nombre del cliente" placeholder="Cliente" />
          <CustomFormField name="email" control={form.control} label="Email" placeholder="cliente@mail.es" />
          <CustomFormField name="phone" control={form.control} label="Número de teléfono" placeholder="600100200" />
          <CustomFormField name="address" control={form.control} label="Dirección" placeholder="C/" />
        </div>
        <FormButtons isPending={isPending} submitButtonLabel="Crear" cancelButtonHref="/clientes" />
      </form>
    </Form>
  );
};
export default NewCustomerForm;
