import React from "react";
import { Token } from "@/lib/types";
import { format, isBefore } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Badge } from "@/components/ui/badge";
import TokenActions from "./token-actions";

const TokenItem = ({ token }: { token: Token }) => {
  const isExpired =
    token.expireAt && isBefore(new Date(token.expireAt), new Date());
  return (
    <div className="grid grid-cols-5 py-4 gap-3 last:pb-0 items-center">
      <div className="col-span-3">
        <p
          className={`font-medium ${
            isExpired ? "text-muted-foreground line-through	" : ""
          }`}
        >
          {token.name}
        </p>
        <p className="text-muted-foreground text-sm">
          {format(token.createdAt, "dd MMM, yyyy")}
        </p>
      </div>

      <div>
        <p className="text-muted-foreground">{token.token}</p>

        {isExpired ? (
          <Badge variant="destructive">Expired</Badge>
        ) : (
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="default">Active</Badge>
            </TooltipTrigger>
            <TooltipContent>
              Expires at:{" "}
              {token.expireAt
                ? format(new Date(token.expireAt!), "dd MMM, yyyy")
                : "Never"}
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <div className="flex gap-2 items-center justify-end">
        <p className="text-sm text-muted-foreground">
          {token.lastUsedAt
            ? format(new Date(token.lastUsedAt), "dd MMM, yyyy")
            : "Never"}
        </p>
        <TokenActions token={token} />
      </div>
    </div>
  );
};

export default TokenItem;
