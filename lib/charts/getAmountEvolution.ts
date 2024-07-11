import { AmountEvolution, ReadCommodityBatchWithAmountsType, ReadProductBatchWithAmountsType } from "../types/types";

export function getAmountEvolution(
  batch: ReadCommodityBatchWithAmountsType | ReadProductBatchWithAmountsType | null
): AmountEvolution | null {
  if (!batch) return null;

  const initial: AmountEvolution = [
    { date: new Date(batch.date), amount: batch.initial_amount, delta: batch.initial_amount },
  ];

  const deltaProductBatches: AmountEvolution = batch.containing_product_batches.map((container) => {
    return {
      date: new Date(container.product_batch.date),
      delta: -container.used_amount,
      amount: 0,
      productBatchId: container.product_batch.external_id,
    };
  });
  const deltaSales: AmountEvolution = batch.containing_sales.map((container) => {
    return {
      date: new Date(container.sale.date),
      delta: -container.sold_amount,
      amount: 0,
      saleBatchId: container.sale.id.toString(),
      client: container.sale.client.name,
    };
  });

  let evolution: AmountEvolution = [...initial, ...deltaSales, ...deltaProductBatches];
  evolution = evolution.sort((a, b) => a.date.getTime() - b.date.getTime());
  let lastAmount = 0;
  evolution.forEach((item) => {
    item.amount = lastAmount + item.delta;
    lastAmount = item.amount;
  });

  return evolution;
}
