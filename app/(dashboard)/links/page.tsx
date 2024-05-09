import React from "react";
import LinkCard from "./_components/link-card";

import { getLinks } from "@/lib/api";
import { Link } from "@/lib/types";
import NoData from "@/components/global/no-data";
import Pagination from "@/components/global/pagination";

const LinksPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data, meta }: { data: Link[]; meta: any } = await getLinks(
    searchParams
  );

  const isEmpty = !data || data.length === 0;

  return (
    <div className="grid gap-4">
      {!isEmpty ? (
        data?.map((link, i) => <LinkCard key={i} link={link} />)
      ) : (
        <NoData className="bg-background h-96 justify-center rounded-md border border-dashed" />
      )}

      <Pagination meta={meta} title="Links" />
    </div>
  );
};

export default LinksPage;
