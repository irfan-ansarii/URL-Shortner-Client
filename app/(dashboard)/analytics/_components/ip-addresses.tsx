import React from "react";

import { getAnalytics } from "@/lib/api";
import IPAddressChart from "@/components/charts/ip-address-chart";

interface Response {
  name: string;
  clickCount: number;
}

const IpAddressPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { interval } = searchParams;
  const res: { data: Response[] } = await getAnalytics({
    groupBy: "ipAddress",
    interval: interval || "24h",
  });

  return <IPAddressChart data={res.data} />;
};

export default IpAddressPage;
