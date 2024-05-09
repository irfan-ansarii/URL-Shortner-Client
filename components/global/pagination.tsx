"use client";
import React from "react";
import Link from "next/link";
import { Pagination as PaginationProps } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouterStuff } from "@/hooks/use-router-stuff";
const Pagination = ({
  title,
  meta,
}: {
  title: string;
  meta: PaginationProps;
}) => {
  const { page, size, pages, total } = meta;

  const startItem = (page - 1) * size + 1;
  const endItem = Math.min(page * size, total);

  const { queryParams } = useRouterStuff();

  if (!total || total == 0) return;
  return (
    <Card className="sticky bottom-0  bg-zinc-50 dark:bg-zinc-900">
      <CardContent className="p-2 md:p-4 text-center space-y-1 md:space-y-2">
        <div className="flex gap-2 justify-center items-center">
          {page === 1 ? (
            <Button size="sm" variant="outline" disabled>
              <ChevronLeft className="w-4 h-4" />
            </Button>
          ) : (
            <Link
              href={
                queryParams({
                  set: { page: `${Math.max(page - 1, 1)}` },
                  getNewPath: true,
                }) as string
              }
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
          )}
          <p className="font-medium text-base px-2">{page}</p>

          {page === pages ? (
            <Button size="sm" variant="outline" disabled>
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Link
              href={
                queryParams({
                  set: { page: `${Math.min(page + 1, pages)}` },
                  getNewPath: true,
                }) as string
              }
              className={buttonVariants({ size: "sm", variant: "outline" })}
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
        <p className="text-muted-foreground text-sm">
          {`Showing ${startItem} - ${endItem} of ${total} ${title}`}
        </p>
      </CardContent>
    </Card>
  );
};

export default Pagination;
