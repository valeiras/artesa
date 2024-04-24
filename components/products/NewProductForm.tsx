import { ItemFormType, ProductFormValueType, productFormSchema } from "@/lib/types";
import NewItemForm from "../NewItemForm";

import React from "react";

const NewProductForm: ItemFormType<ProductFormValueType> = () => {
  return <NewItemForm formSchema={productFormSchema} defaultValues={{ name: "", unit: "kg" }} />;
};

export default NewProductForm;
