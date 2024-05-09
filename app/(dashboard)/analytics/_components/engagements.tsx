import React from "react";
import { BarChart3 } from "lucide-react";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import EngagementsChart from "@/components/charts/engagements-chart";
import { getTimeseries } from "@/lib/api";

const EngagemnetsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  searchParams;
  const res = await getTimeseries(searchParams);

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

export default EngagemnetsPage;
