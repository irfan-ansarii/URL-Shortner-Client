import React from "react";
import { Webhook } from "@/lib/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import WebhookActions from "./webhook-actions";

const WebhookItem = ({ webhook }: { webhook: Webhook }) => {
  return (
    <div className="grid grid-cols-5 py-4 gap-3 last:pb-0 items-center">
      <div className="col-span-3">
        <p className="font-medium truncate">{webhook.url}</p>
        <p className="text-muted-foreground text-sm">
          {format(new Date(webhook.createdAt), "dd MMM, yyyy")}
        </p>
      </div>
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge>Events</Badge>
          </TooltipTrigger>
          <TooltipContent className="p-4">
            <div className="grid gap-2">
              <p className="font-medium">Events</p>
              {webhook.events.map((event) => (
                <Badge variant="secondary" className="capitalize" key={event}>
                  {event.replace(".", " ")}
                </Badge>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex gap-2 items-center justify-end">
        <p className="text-sm text-muted-foreground truncate">
          {webhook.lastActiveAt
            ? format(new Date(webhook.lastActiveAt), "dd MMM, yyyy")
            : "Never"}
        </p>

        <WebhookActions webhook={webhook} />
      </div>
    </div>
  );
};

export default WebhookItem;
