import React from "react";
import { Activity, Link, MousePointer } from "lucide-react";

import OverviewCard from "./overview-card";
import { getLinksSummary } from "@/lib/api";

const OverviewCards = async () => {
  const { data } = await getLinksSummary();

  const { totalCount = 0, clickCount = 0, averageClick = 0 } = data;

  return (
    <>
      <OverviewCard
        title="Total Links"
        value={totalCount}
        iconClassName="bg-purple-100 dark:bg-purple-950/50 text-purple-600"
        icon={Link}
      />

      <OverviewCard
        title="Total Clicks"
        value={clickCount}
        iconClassName="bg-green-100 dark:bg-green-950/50 text-green-600"
        icon={MousePointer}
      />

      <OverviewCard
        title="Average Click"
        value={parseFloat(averageClick).toFixed(2)}
        iconClassName="bg-yellow-100 dark:bg-yellow-950/50 text-yellow-600"
        icon={Activity}
      />
    </>
  );
};

export default OverviewCards;
