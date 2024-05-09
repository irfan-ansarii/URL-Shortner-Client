import React from "react";
import { CardContent } from "@/components/ui/card";
import TokenItem from "./token-item";
import { getTokens } from "@/lib/api";
import { Token } from "@/lib/types";

const Tokens = async () => {
  const res: {
    data: Token[];
  } = await getTokens();

  const isEmpty = !res || res.data.length === 0;
  return (
    <CardContent>
      <div className="grid grid-cols-5 py-3 gap-3 font-medium -mx-6 bg-secondary px-6">
        <div className="col-span-3">Name</div>
        <div>Key</div>
        <div>Last Used</div>
      </div>

      <div className="divide-y">
        {isEmpty ? (
          <Empty />
        ) : (
          res?.data?.map((token) => <TokenItem key={token.id} token={token} />)
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
export default Tokens;
