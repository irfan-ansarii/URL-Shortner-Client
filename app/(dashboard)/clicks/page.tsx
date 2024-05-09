import React from "react";

import { getClicks } from "@/lib/api";
import { Click } from "@/lib/types";
import NoData from "@/components/global/no-data";
import Pagination from "@/components/global/pagination";

import ClickCard from "./_components/click-card";

const ClickPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data, meta }: { data: Click[]; meta: any } = await getClicks(
    searchParams
  );

  const isEmpty = !data || data.length === 0;

  return (
    <>
      <div className="grid gap-4">
        {!isEmpty ? (
          data?.map((click, i) => <ClickCard key={i} click={click} />)
        ) : (
          <NoData className="bg-background h-96 justify-center rounded-md border border-dashed" />
        )}
      </div>
      <Pagination meta={meta} title="Clicks" />
    </>
  );
};

export default ClickPage;
