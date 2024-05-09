import React from "react";
import { getAnalytic } from "@/lib/api";

import DevicesChart from "@/components/charts/devices-chart";

const options = [
  { key: "deviceType", value: "Device" },
  { key: "browser", value: "Browser" },
  { key: "operatingSystem", value: "OS" },
];

const DevicesSingle = async ({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { [key: string]: string };
}) => {
  const { id } = params;

  const { deviceGroup = "deviceType", interval = "24h" } = searchParams;

  const res = await getAnalytic(id, { groupBy: deviceGroup, interval });

  return <DevicesChart data={res?.data} />;
};

export default DevicesSingle;
