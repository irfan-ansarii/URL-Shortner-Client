"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { useRouterStuff } from "@/hooks/use-router-stuff";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const Tabs = ({ options }: { options: { key: string; value: string }[] }) => {
  const { queryParams, searchParamsObj } = useRouterStuff();

  const activeType = useMemo(() => {
    return (
      options.find((op) => op.key === searchParamsObj.deviceGroup) || options[0]
    );
  }, [searchParamsObj, options]);

  return (
    <div className="space-x-1 ml-auto">
      {options.map((op) => (
        <Link
          key={op.key}
          scroll={false}
          href={
            queryParams({
              set: { deviceGroup: op.key },
              getNewPath: true,
            }) as string
          }
          className={cn(
            buttonVariants({
              variant: activeType.key === op.key ? "secondary" : "ghost",
              size: "sm",
            })
          )}
        >
          {op.value}
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
