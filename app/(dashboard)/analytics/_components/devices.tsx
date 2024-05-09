import React from "react";
import { getAnalytics } from "@/lib/api";

import DevicesChart from "@/components/charts/devices-chart";

const DevicesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { deviceGroup = "deviceType", interval = "24h" } = searchParams;

  const res = await getAnalytics({ groupBy: deviceGroup, interval });

  return <DevicesChart data={res?.data} />;
};

export default DevicesPage;
