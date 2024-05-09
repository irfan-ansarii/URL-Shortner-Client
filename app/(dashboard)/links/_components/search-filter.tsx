"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, ListFilter, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

import useDebounce from "@/hooks/use-debounce";

import { Button, buttonVariants } from "@/components/ui/button";
import { Popover } from "@/components/popover";
import { useRouterStuff } from "@/hooks/use-router-stuff";

const options = [
  {
    key: "createdAt",
    value: "Date",
  },
  {
    key: "title",
    value: "Title",
  },
  {
    key: "clickCount",
    value: "Clicks",
  },
  {
    key: "shortUrl",
    value: "Short URL",
  },
  {
    key: "longUrl",
    value: "Destination URL",
  },
];

const SearchFilter = () => {
  const { searchParamsObj, queryParams } = useRouterStuff();

  const [search, setSearch] = useState(searchParamsObj.q);

  const debounced = useDebounce(search, 500);

  const [openDatePopover, setOpenDatePopover] = useState(false);

  const selectedInterval = useMemo(() => {
    return options.find((s) => s.key === searchParamsObj.sortBy) || options[0];
  }, [searchParamsObj]);

  useEffect(() => {
    if (debounced) {
      queryParams({
        set: { q: debounced },
        replace: true,
      });
    }
  }, [debounced]);

  return (
    <div className="relative">
      <span className="absolute left-3 inset-y-0 inline-flex items-center pointer-events-none text-muted-foreground">
        <Search className="w-4 h-4" />
      </span>
      <Input
        placeholder="Search..."
        className="pl-10"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Popover
        open={openDatePopover}
        onOpenChange={setOpenDatePopover}
        content={
          <div className="grid md:w-56 p-2">
            <p className="text-sm px-2.5 py-1.5 text-muted-foreground font-medium">
              Sort By
            </p>
            {options.map((menu) => (
              <Link
                key={menu.key}
                href={
                  queryParams({
                    set: { sortBy: menu.key },
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
                <span>{menu.value}</span>

                {selectedInterval.key === menu.key && (
                  <Check className="w-4 h-4 ml-auto" />
                )}
              </Link>
            ))}
          </div>
        }
      >
        <Button variant="link" className={cn("absolute top-0 right-0", {})}>
          <ListFilter className="w-4 h-4" />
        </Button>
      </Popover>
    </div>
  );
};

export default SearchFilter;
