import { ReadProductWithBatchesAndIngredientsType } from "@/lib/types";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

function RecipeContainer({ itemData }: { itemData: ReadProductWithBatchesAndIngredientsType }) {
  const allIngredients = [...(itemData?.product_ingredients || []), ...(itemData?.commodity_ingredients || [])];
  return (
    <div className="flex flex-row items-end justify-start">
      <ScrollArea className="w-48 h-fit rounded-md border" viewportClassName="max-h-[110px]">
        <div className="p-2 w-48">
          {allIngredients.length === 0
            ? "Sin ingredientes"
            : allIngredients.map(({ ingredient_id, ingredient_name }, idx) => (
                <React.Fragment key={ingredient_id}>
                  {idx !== 0 && <Separator className="my-2" />}
                  {ingredient_name}
                </React.Fragment>
              ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default RecipeContainer;
