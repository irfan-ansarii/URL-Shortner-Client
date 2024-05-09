import React from "react";
import { Webhook } from "@/lib/types";
import { getWebhooks } from "@/lib/api";

import { CardContent } from "@/components/ui/card";
import WebhookItem from "./webhook-item";

const Webhooks = async () => {
  const { data }: { data: Webhook[] } = await getWebhooks();

  const isEmpty = !data || data.length === 0;
  return (
    <CardContent>
      <div className="grid grid-cols-5 py-3 gap-3 font-medium -mx-6 bg-secondary px-6">
        <div className="col-span-3">URL</div>
        <div>Events</div>
        <div>Last Active</div>
      </div>

      <div className="divide-y">
        {isEmpty ? (
          <Empty />
        ) : (
          data.map((webhook) => (
            <WebhookItem key={webhook.id} webhook={webhook} />
          ))
        )}
      </div>
    </CardContent>
  );
};

const Empty = () => {
  return (
    <div className="h-44 flex items-center justify-center">
      <p>No data available</p>
    </div>
  );
};

export default Webhooks;
