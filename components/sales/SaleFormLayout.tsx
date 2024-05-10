import React, { useEffect, useState } from "react";
import { RecordFormType, SaleFormValueType } from "@/lib/types";
import { Form } from "@/components/ui/form";
import { CustomFormField, CustomFormSelect, FormButtons } from "@/components/forms";
import useAvailableArticles from "@/lib/hooks/useAvailableArticles";
import { useAvailableBatches } from "@/lib/hooks";
import LoadingMessage from "../LoadingMessage";

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

  let forceRefresh = new Date().getTime();
  const watchArticleId = form.watch("articleId");
  useEffect(() => {
    // TODO: this is a workaround to force reset of the field
    // eslint-disable-next-line react-hooks/exhaustive-deps
    forceRefresh = new Date().getTime();
    form.resetField("batchId");
  }, [form, watchArticleId]);
  const { availableArticles, isPending: isArticlesQueryPending } = useAvailableArticles();
  const { availableBatches, isPending: isBatchesDataPending } = useAvailableBatches(watchArticleId);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">{formHeader}</h2>
        {isArticlesQueryPending ? (
          <LoadingMessage message="Cargando artículos..." />
        ) : (
          <div className="form-content">
            <CustomFormSelect
              name="articleId"
              items={availableArticles}
              control={form.control}
              label="Artículo"
              placeholder="Selecciona un artículo"
              className="justify-start"
            />
            <CustomFormSelect
              name="batchId"
              items={availableBatches}
              control={form.control}
              label="Lote"
              placeholder={isBatchesDataPending ? "Cargando lotes" : "Selecciona un lote"}
              emptyPlaceholder={isBatchesDataPending ? "Cargando lotes" : "No hay lotes"}
              className="justify-start"
              forceRefresh={forceRefresh}
            />
            {/* <CustomBatchSelector form={form} articleId={watchArticleId} /> */}

            {/* <CustomFormField name="email" control={form.control} label="Email" placeholder="proveedor@mail.es" />
          <CustomFormField name="phone" control={form.control} label="Número de teléfono" placeholder="600100200" />
          <CustomFormField name="address" control={form.control} label="Dirección" placeholder="C/" />
          <CustomFormField name="externalId" control={form.control} label="Identificador de la compra" placeholder="" /> */}
          </div>
        )}
        <FormButtons isPending={isPending} submitButtonLabel={submitButtonLabel} setIsFormOpen={setIsFormOpen} />
      </form>
    </Form>
  );
};

export default SaleFormLayout;
