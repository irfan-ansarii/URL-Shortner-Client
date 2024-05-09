"use client";
import React from "react";
import { format, parseISO } from "date-fns";
import {
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import { COLORS } from "@/lib/utils";

const EngagementsChart = ({
  data,
  searchParams,
}: {
  data: any[];
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const interval = searchParams.interval || "1h";

  // format response date
  const formatDate = (value: string) => {
    const parsedDate = parseISO(value);

    let formatter = "dd MMM, yyyy";

    if (interval === "24h" || interval === "1h") {
      formatter = "hh:mm a";
    }
    if (interval === "365d") {
      formatter = "MMM, yyyy";
    }

    const formattedDate = format(parsedDate, formatter);

    return formattedDate;
  };

  if (!data || data.length === 0) {
    return (
      <div className="h-96 flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];

  return (
    <ResponsiveContainer className="!h-96 w-full">
      <AreaChart margin={{ left: -16, bottom: -6 }} data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={randomColor} stopOpacity={1} />
            <stop offset="95%" stopColor={randomColor} stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          fontSize={12}
          tickLine={false}
          axisLine={true}
          strokeOpacity={0.3}
          tickFormatter={(value) => formatDate(value)}
        />

        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          dataKey="clickCount"
        />

        <Line dataKey="clickCount" type="monotone" stroke="pink" />
        <Area
          type="monotone"
          dataKey="clickCount"
          stroke="url(#colorUv)"
          fill="url(#colorUv)"
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active) return;
            return (
              <div className="bg-secondary/90 p-3 rounded-md text-foreground text-xs">
                <p className="font-semibold mb-1 text-sm">
                  {formatDate(label)}
                </p>
                <div className="flex gap-2">
                  <span>{payload?.[0]?.value}</span>Clicks
                </div>
              </div>
            );
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default EngagementsChart;
