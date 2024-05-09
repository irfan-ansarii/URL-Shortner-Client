import React from "react";
import { getLink } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import PageHeader from "../_components/page-header";

import PageSpinner from "@/components/global/page-spinner";
import Engagements from "./_components/engagements";
import DevicesSingle from "./_components/devices";
import ReferrerSingle from "./_components/referrer";
import LocationsSingle from "./_components/locations";
import IPAddressSingle from "./_components/ip-address";

import LinkCard from "./_components/link-card";
import ErrorBoundary from "@/components/global/error-boundary";
import Tabs from "../_components/tabs";

const deviceOptions = [
  { key: "deviceType", value: "Device" },
  { key: "browser", value: "Browser" },
  { key: "operatingSystem", value: "OS" },
];

const locationOptions = [
  { key: "country", value: "Country" },
  { key: "state", value: "State" },
];

const AnalyticsPage = async ({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { [key: string]: string };
}) => {
  const { data } = await getLink(params.id);

  return (
    <div className="grid gap-6">
      <PageHeader
        title={data.title}
        subtitle={
          <a
            href={data.shortUrl}
            target="_blank"
            className="text-muted-foreground hover:underline"
          >
            {data.shortUrl}
          </a>
        }
      />
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <Card className="md:col-span-2">
            <LinkCard link={data} />
          </Card>

          <Card className="md:col-span-2">
            <ErrorBoundary suspenseFallback={<PageSpinner className="h-96" />}>
              <Engagements params={params} searchParams={searchParams} />
            </ErrorBoundary>
          </Card>

          <Card>
            <CardHeader className="flex-row space-y-0 gap-2">
              <CardTitle>Devices</CardTitle>
              <Tabs options={deviceOptions} />
            </CardHeader>
            <CardContent className="flex items-end pb-4">
              <ErrorBoundary
                suspenseFallback={<PageSpinner className="h-96" />}
              >
                <DevicesSingle params={params} searchParams={searchParams} />
              </ErrorBoundary>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Referrer</CardTitle>
            </CardHeader>
            <CardContent className="flex items-end pb-4">
              <ErrorBoundary
                suspenseFallback={<PageSpinner className="h-96" />}
              >
                <ReferrerSingle params={params} searchParams={searchParams} />
              </ErrorBoundary>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row space-y-0 gap-2">
              <CardTitle>Locations</CardTitle>
              <Tabs options={locationOptions} />
            </CardHeader>
            <CardContent className="grid gap-4 items-end pb-4">
              <ErrorBoundary
                suspenseFallback={<PageSpinner className="h-96" />}
              >
                <LocationsSingle params={params} searchParams={searchParams} />
              </ErrorBoundary>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row space-y-0 gap-2">
              <CardTitle>IP Address</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <ErrorBoundary
                suspenseFallback={<PageSpinner className="h-96" />}
              >
                <IPAddressSingle params={params} searchParams={searchParams} />
              </ErrorBoundary>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
