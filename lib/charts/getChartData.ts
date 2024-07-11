import { AmountEvolution, SimpleChartData } from "@/lib/types/types";

export function getChartData(amountEvolution: AmountEvolution | null): SimpleChartData | null {
  if (!amountEvolution || amountEvolution.length === 0) return null;

  const currDate = amountEvolution[0].date;
  const finalDate = new Date();
  let evolutionIdx = 0;
  let nextDate = evolutionIdx < amountEvolution.length - 1 ? amountEvolution[evolutionIdx + 1].date : new Date();

  const data: SimpleChartData = [];
  while (!isSameDay(currDate, finalDate)) {
    while (isPreviousDay(nextDate, currDate) && evolutionIdx < amountEvolution.length - 1) {
      evolutionIdx++;
      nextDate = evolutionIdx < amountEvolution.length - 1 ? amountEvolution[evolutionIdx + 1].date : new Date();
    }
    data.push({ date: currDate.toLocaleDateString(), amount: amountEvolution[evolutionIdx].amount });
    currDate.setDate(currDate.getDate() + 1);
  }

  return data;
}

function isSameDay(d1: Date, d2: Date): boolean {
  return d1.toLocaleDateString() === d2.toLocaleDateString();
}

function isPreviousDay(d1: Date, d2: Date): boolean {
  return new Date(d1).setHours(0, 0, 0, 0) <= new Date(d2).setHours(0, 0, 0, 0);
}
