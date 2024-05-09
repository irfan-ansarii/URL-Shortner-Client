"use client";
import { toast } from "sonner";
import React, { useState } from "react";
import copy from "copy-to-clipboard";
import { Clipboard, ClipboardCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
const CopyClipboard = ({
  text,
  className,
  iconClassName,
}: {
  text: string;
  className?: string;
  iconClassName?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copy(text);
    toast.success("Link copied");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          onClick={handleCopy}
          className={cn("disabled:opacity-100", className)}
          type="button"
          variant="secondary"
          size="icon"
          disabled={copied}
        >
          {copied ? (
            <ClipboardCheck
              className={cn("w-4 h-4 text-green-500", iconClassName)}
            />
          ) : (
            <Clipboard className={cn("w-4 h-4 ", iconClassName)} />
          )}
        </Button>
      </TooltipTrigger>

      <TooltipContent>{copied ? "Copied" : "Copy"}</TooltipContent>
    </Tooltip>
  );
};

export default CopyClipboard;
