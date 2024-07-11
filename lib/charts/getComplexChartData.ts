import { AmountEvolution, ComplexChartData } from "@/lib/types/types";
import { isPreviousDay, isSameDay } from "../utils";

export function getComplexChartData(
  batchesData: { amountEvolution: AmountEvolution; batchId: string }[]
): ComplexChartData | null {
  if (!batchesData || batchesData.length === 0) return null;

  // We get the furthest date available
  const currDate = batchesData.reduce(
    (acc, curr) => (curr.amountEvolution?.[0].date < acc ? curr.amountEvolution?.[0].date : acc),
    new Date()
  );
  const finalDate = new Date();
  const evolutionIdx = Array<number>(batchesData.length).fill(0);
  let nextDate = batchesData.map(({ amountEvolution }, ii) =>
    evolutionIdx[ii] < amountEvolution.length - 1 ? amountEvolution[evolutionIdx[ii] + 1].date : new Date()
  );

  const data: ComplexChartData = [];
  while (!isSameDay(currDate, finalDate)) {
    const tmp: { [batchId: string]: number } = {};
    for (let ii = 0; ii < batchesData.length; ii++) {
      while (isPreviousDay(nextDate[ii], currDate) && evolutionIdx[ii] < batchesData[ii].amountEvolution.length - 1) {
        evolutionIdx[ii]++;
        nextDate[ii] =
          evolutionIdx[ii] < batchesData[ii].amountEvolution.length - 1
            ? batchesData[ii].amountEvolution[evolutionIdx[ii] + 1].date
            : new Date();
      }
      tmp[batchesData[ii].batchId] = batchesData[ii].amountEvolution[evolutionIdx[ii]].amount;
    }
    data.push({ date: currDate.toLocaleDateString(), ...tmp });
    currDate.setDate(currDate.getDate() + 1);
  }

  return data;
}
