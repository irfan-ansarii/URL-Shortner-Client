import React from "react";
import { getAnalytic } from "@/lib/api";

import LocationsChart from "@/components/charts/locations-chart";

interface Response {
  name: string;
  code: string;
  clickCount: number;
}
const LocationsSingle = async ({
  params,
  searchParams,
}: {
  params: { [key: string]: any };
  searchParams: { [key: string]: string };
}) => {
  const { id } = params;
  const { locationGroup = "country", interval } = searchParams;

  const res: { data: Response[] } = await getAnalytic(id, {
    groupBy: locationGroup,
    interval: interval || "24h",
  });

  return (
    <LocationsChart data={res.data} showCount={10} group={locationGroup} />
  );
};

export default LocationsSingle;
