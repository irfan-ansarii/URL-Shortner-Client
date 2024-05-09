import React from "react";
import { BarChart3 } from "lucide-react";
import { getSingleTimeseries } from "@/lib/api";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import EngagementsChart from "@/components/charts/engagements-chart";

const Engagements = async ({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { [key: string]: string };
}) => {
  const { id } = params;
  const { interval = "24h" } = searchParams;

  const res = await getSingleTimeseries(id, {
    interval,
  });

  const totalClick = res?.data?.reduce((acc: number, curr: any) => {
    acc += curr.clickCount;
    return acc;
  }, 0);

  return (
    <>
      <CardHeader>
        <div className="flex gap-2 items-center">
          <CardTitle>{totalClick || 0}</CardTitle>
          <BarChart3 className="w-4 h-4" />
        </div>
        <CardDescription>TOTAL CLICKS</CardDescription>
      </CardHeader>
      <CardContent className="flex items-end pb-4">
        <EngagementsChart data={res.data} searchParams={searchParams} />
      </CardContent>
    </>
  );
};

export default Engagements;
