import React from "react";
import NoData from "@/components/global/no-data";

interface Response {
  name: string;
  clickCount: number;
}

const IPAddressChart = ({
  data,
  showCount,
}: {
  data: Response[];
  showCount?: number;
}) => {
  const RECORD_COUNT = showCount || 5;

  const slicedData = data?.slice(0, RECORD_COUNT);

  const totalClickCount = slicedData.reduce((acc: number, curr: Response) => {
    acc += curr.clickCount;
    return acc;
  }, 0);

  if (!data || data.length === 0) {
    return <NoData className="h-80 justify-center" />;
  }

  return (
    <>
      {slicedData.map((value, i) => {
        /** calculate the percentage */
        const percent = `${Math.round(
          (value.clickCount / totalClickCount) * 100
        )}%`;

        return (
          <div key={i}>
            <div className="mb-1 flex justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">
                {value.name || "unknown"}
              </h3>
              <span className="text-sm text-muted-foreground">
                {value.clickCount}
              </span>
            </div>

            <div
              className="h-4 bg-secondary rounded overflow-hidden"
              role="progressbar"
            >
              <div
                className="rounded-r-full h-4 text-center bg-amber-200 text-xs whitespace-nowrap"
                style={{ width: percent }}
              >
                {percent}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default IPAddressChart;
