import React, { useEffect, useState } from "react";
import { RecordFormType, SaleFormValueType } from "@/lib/types";
import { Form } from "@/components/ui/form";
import {
  CustomFormDatePicker,
  CustomFormField,
  CustomFormSelect,
  FormButtons,
  RemoveButtons,
} from "@/components/forms";
import {
  useAvailableBatches,
  useCustomFormFieldArray,
  useAvailableArticles,
  useAvailableClients,
  useCustomFormSelectFieldArray,
} from "@/lib/hooks";
import LoadingMessage from "../LoadingMessage";
import { Button } from "../ui/button";

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

  const { availableArticles, isPending: isArticlesQueryPending } = useAvailableArticles();
  const { availableClients, isPending: isClientsQueryPending } = useAvailableClients();
  const { availableBatches, isPending: isBatchesDataPending } = useAvailableBatches();

  const watchArticleIds = form.watch("articleIds");
  const independentItems = watchArticleIds.map((article) => {
    return availableBatches.filter((batch) => batch.articleId === article.id);
  });

  const {
    CustomFormSelectFieldArray: SelectArticles,
    append: appendArticle,
    remove: removeArticle,
  } = useCustomFormSelectFieldArray({
    name: "articleIds",
    objectField: "id",
    form: form,
    commonItems: availableArticles,
    hasVariableAmount: false,
    label: "Artículo",
    placeholder: "Selecciona artículo",
  });

  const {
    CustomFormSelectFieldArray: SelectBatches,
    append: appendBatch,
    remove: removeBatch,
  } = useCustomFormSelectFieldArray({
    name: "batchIds",
    objectField: "id",
    form: form,
    independentItems: independentItems,
    hasVariableAmount: false,
    label: "Lote",
    placeholder: "Selecciona Lote",
    emptyPlaceholder: "No hay lotes",
  });

  const {
    CustomFormFieldArray: AmountFields,
    append: appendAmount,
    remove: removeAmount,
  } = useCustomFormFieldArray({
    name: "amounts",
    objectField: "amount",
    form: form,
    hasVariableAmount: false,
    label: "Cantidad",
  });

  const addRow = () => {
    appendArticle({ id: "" });
    appendBatch({ id: "" });
    appendAmount({ amount: 0 });
  };

  const removeRow = (idx: number) => {
    removeArticle(idx);
    removeBatch(idx);
    removeAmount(idx);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8 rounded">
        <h2 className="font-semibold text-4xl mb-6">{formHeader}</h2>
        {isArticlesQueryPending || isClientsQueryPending || isBatchesDataPending ? (
          <LoadingMessage message="Cargando datos..." />
        ) : (
          <>
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

              <SelectArticles />
              <SelectBatches />
              <div className="flex flex-row gap-1 items-end">
                <AmountFields />
                <RemoveButtons removeRow={removeRow} nbRows={watchArticleIds.length} />
              </div>

              <div className="md:col-span-2 lg:col-span-3 flex justify-end">
                <Button onClick={addRow} type="button">
                  Añadir artículo
                </Button>
              </div>
              <CustomFormField name="comments" control={form.control} label="Comentarios" placeholder="" />
            </div>
          </>
        )}
        <FormButtons isPending={isPending} submitButtonLabel={submitButtonLabel} setIsFormOpen={setIsFormOpen} />
      </form>
    </Form>
  );
};

export default SaleFormLayout;
