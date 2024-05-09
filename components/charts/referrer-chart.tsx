"use client";
import { capitalize } from "@/lib/utils";
import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import NoData from "@/components/global/no-data";

import { COLORS } from "@/lib/utils";

const ReferrerChart = ({ data }: { data: Record<string, any>[] }) => {
  if (!data || data.length === 0) {
    return <NoData className="h-80 justify-center" />;
  }

  return (
    <ResponsiveContainer width={"100%"} height={380}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={80}
          outerRadius={140}
          paddingAngle={2}
          dataKey="clickCount"
        >
          {data.map((entry, index) => {
            const color = COLORS[index % COLORS.length];
            return (
              <Cell
                key={`cell-${index}`}
                fill={color}
                style={{ outline: "none" }}
                strokeOpacity={0}
              />
            );
          })}
        </Pie>
        <Legend
          wrapperStyle={{ fontSize: "12px" }}
          formatter={(v) => capitalize(v)}
          iconType="triangle"
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active) return;
            return (
              <div className="bg-secondary/90 p-3 rounded-md text-foreground text-xs">
                <p className="font-semibold mb-1 text-sm">
                  {capitalize(payload?.[0].name as string)}
                </p>
                <div className="flex gap-2">
                  <span>{payload?.[0].value}</span>Clicks
                </div>
              </div>
            );
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ReferrerChart;
