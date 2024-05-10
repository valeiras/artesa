import React, { useEffect, useState } from "react";
import { RecordFormType, SaleFormValueType } from "@/lib/types";
import { Form } from "@/components/ui/form";
import { CustomFormDatePicker, CustomFormField, CustomFormSelect, FormButtons } from "@/components/forms";
import useAvailableArticles from "@/lib/hooks/useAvailableArticles";
import { useAvailableBatches } from "@/lib/hooks";
import LoadingMessage from "../LoadingMessage";
import useAvailableClients from "@/lib/hooks/useAvailableClients";

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
    // This is a workaround to force reset of the field
    // eslint-disable-next-line react-hooks/exhaustive-deps
    forceRefresh = new Date().getTime();
    form.resetField("batchId");
  }, [form, watchArticleId]);

  const { availableArticles, isPending: isArticlesQueryPending } = useAvailableArticles();
  const { availableClients, isPending: isClientsQueryPending } = useAvailableClients();
  const { availableBatches, isPending: isBatchesDataPending } = useAvailableBatches(watchArticleId);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">{formHeader}</h2>
        {isArticlesQueryPending || isClientsQueryPending ? (
          <LoadingMessage message="Cargando datos..." />
        ) : (
          <div className="form-content">
            <CustomFormSelect
              name="clientId"
              items={availableClients}
              control={form.control}
              label="Cliente"
              placeholder="Selecciona un cliente"
              className="justify-start"
            />
            <CustomFormDatePicker name="date" control={form.control} label="Fecha" />
            <CustomFormField name="externalId" control={form.control} label="Identificador de la venta" />
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
            <CustomFormField name="amount" control={form.control} label="Cantidad" placeholder="0" type="number" />
            <CustomFormField name="comments" control={form.control} label="Comentarios" placeholder="" />
          </div>
        )}
        <FormButtons isPending={isPending} submitButtonLabel={submitButtonLabel} setIsFormOpen={setIsFormOpen} />
      </form>
    </Form>
  );
};

export default SaleFormLayout;
