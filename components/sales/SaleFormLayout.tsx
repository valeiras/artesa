import React, { useEffect, useState } from "react";
import { RecordFormType, SaleFormValueType } from "@/lib/types";
import { Form } from "@/components/ui/form";
import { CustomFormField, CustomFormSelect, FormButtons } from "@/components/forms";
import useAvailableArticles from "@/lib/hooks/useAvailableArticles";

const SaleFormLayout: RecordFormType<SaleFormValueType> = ({
  form,
  mutate,
  isPending,
  formHeader,
  submitButtonLabel,
  setIsFormOpen,
}) => {
  function onSubmit(values: SaleFormValueType) {
    mutate(values);
  }

  const [articleId, setArticleId] = useState("");
  const { availableArticles, isPending: isArticlesQueryPending } = useAvailableArticles();

  const { availableBatches, isPending: isBatchesQueryPending } = useAvailableBatches(articleId);

  if (isQueryPending) return <h2>Cargando...</h2>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">{formHeader}</h2>
        <div className="form-content">
          <CustomFormSelect
            name="articleId"
            items={availableArticles}
            control={form.control}
            label="Artículo"
            placeholder=""
            className="justify-start"
          />
          {/* <CustomFormField name="email" control={form.control} label="Email" placeholder="proveedor@mail.es" />
          <CustomFormField name="phone" control={form.control} label="Número de teléfono" placeholder="600100200" />
          <CustomFormField name="address" control={form.control} label="Dirección" placeholder="C/" />
          <CustomFormField name="externalId" control={form.control} label="Identificador de la compra" placeholder="" /> */}
        </div>
        <FormButtons isPending={isPending} submitButtonLabel={submitButtonLabel} setIsFormOpen={setIsFormOpen} />
      </form>
    </Form>
  );
};

export default SaleFormLayout;
