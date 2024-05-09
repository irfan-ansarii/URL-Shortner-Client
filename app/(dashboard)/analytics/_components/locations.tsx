import React from "react";
import { getAnalytics } from "@/lib/api";

import LocationsChart from "@/components/charts/locations-chart";

interface Response {
  name: string;
  code: string;
  clickCount: number;
}

const LocationsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { locationGroup = "country", interval } = searchParams;

  const res: { data: Response[] } = await getAnalytics({
    groupBy: locationGroup,
    interval: interval || "24h",
  });

  return (
    <LocationsChart data={res.data} showCount={10} group={locationGroup} />
  );
};

export default LocationsPage;
