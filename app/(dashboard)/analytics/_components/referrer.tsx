import React from "react";

import ReferrerChart from "@/components/charts/referrer-chart";
import { getAnalytics } from "@/lib/api";

const ReferrerPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { interval } = searchParams;
  const res = await getAnalytics({
    groupBy: "referrer",
    interval: interval || "24h",
  });

  return <ReferrerChart data={res?.data} />;
};

export default ReferrerPage;
