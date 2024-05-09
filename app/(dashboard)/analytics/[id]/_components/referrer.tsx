import React from "react";
import { getAnalytic } from "@/lib/api";

import ReferrerChart from "@/components/charts/referrer-chart";

const ReferrerSingle = async ({
  params,
  searchParams,
}: {
  params: { [key: string]: any };
  searchParams: { [key: string]: string };
}) => {
  const { id } = params;
  const { interval } = searchParams;
  const res = await getAnalytic(id, {
    groupBy: "referrer",
    interval: interval || "24h",
  });

  return <ReferrerChart data={res?.data} />;
};

export default ReferrerSingle;
