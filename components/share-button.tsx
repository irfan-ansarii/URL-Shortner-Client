import React from "react";
import { Share } from "lucide-react";
import { cn } from "@/lib/utils";
import { RWebShare } from "react-web-share";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const ShareButton = ({ className, data }: { className?: string; data: {} }) => {
  return (
    <Tooltip delayDuration={0}>
      <RWebShare data={data} closeText="Cancel">
        <TooltipTrigger asChild>
          <Button size="icon" variant="secondary" className={cn(className)}>
            <Share className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
      </RWebShare>

      <TooltipContent>Share</TooltipContent>
    </Tooltip>
  );
};

export default ShareButton;
