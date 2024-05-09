"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Download as DownloadIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const DownloadContent = ({
  text,
  className,
  iconClassName,
}: {
  text: string;
  className?: string;
  iconClassName?: string;
}) => {
  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "token.txt";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          onClick={handleDownload}
          className={cn("disabled:opacity-100", className)}
          type="button"
          variant="secondary"
          size="icon"
        >
          <DownloadIcon className={cn("w-4 h-4 ", iconClassName)} />
        </Button>
      </TooltipTrigger>

      <TooltipContent>Download</TooltipContent>
    </Tooltip>
  );
};

export default DownloadContent;
