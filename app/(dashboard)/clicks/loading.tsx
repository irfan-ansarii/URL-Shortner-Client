import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
const PageLoading = () => {
  return (
    <div className="grid gap-4">
      {[...Array(4)].map((_, i) => (
        <Card className="flex gap-2 md:gap-4 p-4 md:p-6" key={i}>
          <Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-full" />
          <div className="space-y-2 md:space-y-3 flex-1">
            <Skeleton className="rounded-full h-3 md:h-4 w-8/12 md:w-72" />
            <Skeleton className="rounded-full h-2.5 md:h-3 w-10/12 md:w-80" />
            <Skeleton className="rounded-full h-2.5 md:h-3 w-full md:w-96" />
          </div>
          <Skeleton className="rounded-full h-4 md:h-6 w-0 md:w-28 self-center	" />
        </Card>
      ))}
    </div>
  );
};

export default PageLoading;
