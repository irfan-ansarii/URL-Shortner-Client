import React from "react";
import { Link } from "@/lib/types";
import { getLinks } from "@/lib/api";

import LinkItem from "./link-item";
import NoData from "@/components/global/no-data";

const MostClicked = async () => {
  const { data }: { data: Link[] } = await getLinks({
    sortBy: "clickCount",
    limit: 5,
  });
  if (!data || data.length === 0) return <NoData className="h-80" />;
  return data?.map((link) => <LinkItem key={link.id} link={link} />);
};

export default MostClicked;
