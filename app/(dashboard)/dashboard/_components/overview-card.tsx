import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardTitle } from "@/components/ui/card";

const OverviewCard = ({
  title,
  value,
  icon,
  iconClassName,
}: {
  title: string;
  value: number | string;
  icon: any;
  iconClassName: string;
}) => {
  const Icon = icon;
  return (
    <Card className="p-6 space-y-2">
      <div className="flex gap-4 justify-between">
        <CardTitle className="text-base text-muted-foreground">
          {title}
        </CardTitle>
        <span
          className={cn(
            "w-10 h-10 inline-flex items-center justify-center bg-secondary rounded-full",
            iconClassName
          )}
        >
          <Icon className="w-4 h-4 " />
        </span>
      </div>
      <CardTitle>{value}</CardTitle>
    </Card>
  );
};

export default OverviewCard;
