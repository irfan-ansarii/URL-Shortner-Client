"use client";
import { Token } from "@/lib/types";
import React, { useState } from "react";
import { isBefore } from "date-fns";
import { CircleOff, EllipsisVertical, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover } from "@/components/popover";

import DeleteTokenAlert from "@/components/modals/delete-token-alert";
import DeactivateTokenAlert from "@/components/modals/deactivate-token-alert";

const TokenActions = ({ token }: { token: Token }) => {
  const [open, onOpenChange] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deactivateOpen, setDeactivateOpen] = useState(false);

  const isExpired =
    token.expireAt && isBefore(new Date(token.expireAt), new Date());

  return (
    <>
      <Popover
        open={open}
        onOpenChange={onOpenChange}
        content={
          <div className="grid  md:w-48 p-2 gap-1">
            {!isExpired && (
              <Button
                variant="ghost"
                size="sm"
                className="justify-start"
                onClick={() => setDeactivateOpen(true)}
              >
                <CircleOff className="w-4 h-4 mr-2" />
                Deactivate
              </Button>
            )}
            <Button
              variant="destructive"
              size="sm"
              className="justify-start"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Token
            </Button>
          </div>
        }
      >
        <Button variant="ghost" className="px-2">
          <EllipsisVertical className="w-4 h-4" />
        </Button>
      </Popover>

      {deleteOpen && (
        <DeleteTokenAlert
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          token={token}
        />
      )}
      {deactivateOpen && (
        <DeactivateTokenAlert
          open={deactivateOpen}
          onOpenChange={setDeactivateOpen}
          token={token}
        />
      )}
    </>
  );
};

export default TokenActions;
