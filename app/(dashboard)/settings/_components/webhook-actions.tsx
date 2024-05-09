"use client";
import { Webhook } from "@/lib/types";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import DeleteWebhookAlert from "@/components/modals/delete-webhook-alert";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const WebhookActions = ({ webhook }: { webhook: Webhook }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="px-2"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Remove</TooltipContent>
      </Tooltip>

      {deleteOpen && (
        <DeleteWebhookAlert
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          webhook={webhook}
        />
      )}
    </>
  );
};

export default WebhookActions;
