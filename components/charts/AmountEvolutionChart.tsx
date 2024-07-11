"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { SimpleChartData } from "@/lib/types/types";

const chartConfig = {
  amount: {
    label: "Cantidad",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type Props = { chartData: SimpleChartData; title: string };

const AmountEvolutionChart: React.FC<Props> = ({ chartData, title }) => {
  return (
    <Card className="max-w-[700px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, value.length - 5)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-amount)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-amount)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="amount"
              type="monotone"
              fill="url(#fill)"
              fillOpacity={0.4}
              stroke="var(--color-amount)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center gap-2 text-sm text-muted-foreground">
          {`${chartData.at(0)?.date} - ${chartData.at(-1)?.date}`}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AmountEvolutionChart;
