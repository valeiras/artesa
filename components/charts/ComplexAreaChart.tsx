"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ComplexChartData } from "@/lib/types/types";

const chartConfig = {
  amount: {
    label: "Cantidad",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type Props = { chartData: ComplexChartData | null; title: string; labels: string[] };

const ComplexAreaChart: React.FC<Props> = ({ chartData, title, labels }) => {
  if (!chartData) return null;

  console.log(chartData);
  return (
    <Card className="max-w-[800px]">
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
              <linearGradient id="fill1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fill2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fill3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fill4" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fill5" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-5))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-5))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            {labels.map((label, idx) => {
              return (
                <Area
                  key={label}
                  dataKey={label}
                  type="monotone"
                  fill={`url(#fill${(idx % 5) + 1})`}
                  fillOpacity={0.4}
                  stroke={`hsl(var(--chart-${(idx % 5) + 1}))`}
                  stackId="a"
                />
              );
            })}
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

export default ComplexAreaChart;
