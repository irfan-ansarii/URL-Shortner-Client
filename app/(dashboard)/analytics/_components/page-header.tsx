"use client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { Calendar, Check, ChevronDown } from "lucide-react";

import { Popover } from "@/components/popover";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useRouterStuff } from "@/hooks/use-router-stuff";

const durations: {
  key: string;
  label: string;
}[] = [
  {
    label: "Last 1 hour",
    key: "1h",
  },
  {
    label: "Last 24 hour",
    key: "24h",
  },
  {
    label: "Last 7 days",
    key: "7d",
  },
  {
    label: "Last 30 days",
    key: "30d",
  },
  {
    label: "Last 3 month",
    key: "90d",
  },
  {
    label: "Last 1 year",
    key: "365d",
  },
];

const PageHeader = ({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: React.ReactNode;
}) => {
  const [openDatePopover, setOpenDatePopover] = useState(false);

  const { queryParams, searchParamsObj } = useRouterStuff();

  const selectedInterval = useMemo(() => {
    return (
      durations.find((s) => s.key === searchParamsObj.interval) || durations[1]
    );
  }, [searchParamsObj]);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-semibold truncate">
          {title || "Overview"}
        </h1>
        {subtitle ? (
          subtitle
        ) : (
          <p className="text-muted-foreground">
            Explore insights of your links
          </p>
        )}
      </div>

      <Popover
        open={openDatePopover}
        onOpenChange={setOpenDatePopover}
        content={
          <div className="grid  md:w-56 p-2">
            {durations.map((menu) => (
              <Link
                key={menu.key}
                href={
                  queryParams({
                    set: {
                      interval: menu.key,
                    },
                    getNewPath: true,
                  }) as string
                }
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  }),

                  "justify-start flex"
                )}
              >
                <span>{menu.label}</span>

                {selectedInterval?.key === menu.key && (
                  <Check className="w-4 h-4 ml-auto" />
                )}
              </Link>
            ))}
          </div>
        }
      >
        <Button
          variant="secondary"
          className={cn("flex w-full ml-auto md:w-56 md:order-2 justify-start")}
        >
          <Calendar className="w-4 h-4 mr-2" />
          <span>{selectedInterval?.label}</span>
          <ChevronDown
            className={`h-4 w-4 flex-shrink-0 ml-auto ${
              openDatePopover ? "rotate-180 transform" : ""
            } transition-all duration-75`}
          />
        </Button>
      </Popover>
    </div>
  );
};

export default PageHeader;
