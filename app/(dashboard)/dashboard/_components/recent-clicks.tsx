import React from "react";
import { Click } from "@/lib/types";
import { getClicks } from "@/lib/api";
import ClickItem from "./click-item";
import NoData from "@/components/global/no-data";

const RecentClicks = async () => {
  const { data }: { data: Click[] } = await getClicks({
    sortBy: "id",
    limit: 5,
  });

  if (!data || data.length === 0) return <NoData className="h-80" />;

  return data?.map((click) => <ClickItem key={click.id} click={click} />);
};

export default RecentClicks;
