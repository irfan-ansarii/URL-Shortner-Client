import React from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const NoData = ({
  title,
  description,
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center w-full h-full gap-3 py-12",
        className
      )}
    >
      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center">
        <Search className="w-5 h-5" />
      </div>

      <h3 className="font-medium ">{title || "No data available"}</h3>
      {description && (
        <p className="text-sm text-center max-w-[300px] text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};

export default NoData;
