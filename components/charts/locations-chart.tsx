import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCountryName } from "@/lib/utils";
import NoData from "@/components/global/no-data";

interface Response {
  name: string;
  code: string;
  clickCount: number;
}

const LocationsChart = ({
  data,
  showCount,
  group,
}: {
  data: Response[];
  showCount?: number;
  group: string;
}) => {
  const isState = group === "state";

  const RECORD_COUNT = showCount || 5;

  const slicedData = data?.slice(0, RECORD_COUNT).map((v) => ({
    ...v,
    name: isState ? v.name : getCountryName(v.name)!,
    code: v.name,
  }));

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
        const percent = `${Math.round(
          (value.clickCount / totalClickCount) * 100
        )}%`;
        return (
          <div key={i} className="flex gap-2 items-center">
            {!isState && (
              <Avatar className="flex-none">
                <AvatarImage
                  asChild
                  src={`https://flag.vercel.app/m/${value.code}.svg`}
                >
                  <Image
                    src={`https://flag.vercel.app/m/${value.code}.svg`}
                    width={40}
                    height={40}
                    alt="country-flag"
                  />
                </AvatarImage>
                <AvatarFallback />
              </Avatar>
            )}
            <div className="flex-1 space-y-1">
              <div className="flex justify-between ">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {value.name}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {value.clickCount}
                </span>
              </div>

              <div
                className="h-4 bg-secondary rounded-full overflow-hidden relative"
                role="progressbar"
              >
                <div
                  className="rounded-full h-4 text-center bg-amber-200 text-xs whitespace-nowrap"
                  style={{ width: percent, minWidth: "10%" }}
                >
                  {percent}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default LocationsChart;
