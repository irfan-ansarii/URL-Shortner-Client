import React from "react";
import { getAnalytic } from "@/lib/api";

import IPAddressChart from "@/components/charts/ip-address-chart";

interface Response {
  name: string;
  clickCount: number;
}

const IPAddressSingle = async ({
  params,
  searchParams,
}: {
  params: { [key: string]: any };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { id } = params;
  const { interval } = searchParams;
  const res: { data: Response[] } = await getAnalytic(id, {
    groupBy: "ipAddress",
    interval: interval || "24h",
  });

  return <IPAddressChart data={res.data} />;
};

export default IPAddressSingle;
