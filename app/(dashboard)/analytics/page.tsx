import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ErrorBoundary from "@/components/global/error-boundary";
import PageHeader from "./_components/page-header";

import PageSpinner from "@/components/global/page-spinner";
import DevicesPage from "./_components/devices";
import EngagemnetsPage from "./_components/engagements";
import ReferrerPage from "./_components/referrer";
import LocationsPage from "./_components/locations";
import IpAddressPage from "./_components/ip-addresses";
import Tabs from "./_components/tabs";

const deviceOptions = [
  { key: "deviceType", value: "Device" },
  { key: "browser", value: "Browser" },
  { key: "operatingSystem", value: "OS" },
];

const locationOptions = [
  { key: "country", value: "Country" },
  { key: "state", value: "State" },
];

const AnalyticsPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  return (
    <div className="grid gap-6">
      <PageHeader />
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <Card className="md:col-span-2">
            <ErrorBoundary suspenseFallback={<PageSpinner className="h-96" />}>
              <EngagemnetsPage searchParams={searchParams} />
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
                <DevicesPage searchParams={searchParams} />
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
                <ReferrerPage searchParams={searchParams} />
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
                <LocationsPage searchParams={searchParams} />
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
                <IpAddressPage searchParams={searchParams} />
              </ErrorBoundary>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
