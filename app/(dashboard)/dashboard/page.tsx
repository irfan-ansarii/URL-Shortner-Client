import React from "react";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/global/error-boundary";

import RecentLinks from "./_components/recent-links";
import MostClicked from "./_components/most-clicked";
import OverviewCards from "./_components/overview-cards";
import RecentClicks from "./_components/recent-clicks";

const DashboardPage = async () => {
  const session = await getSession();

  return (
    <div className="grid gap-8">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-semibold truncate">
          Welcome, {session?.data?.firstName || session?.data?.email}👋🏻
        </h1>
        <p className="text-muted-foreground">
          It’s always a pleasure to see you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <ErrorBoundary
          className="md:col-span-3 bg-background rounded-md border"
          suspenseFallback={[...Array(3)].map((_, i) => (
            <Card className="p-6 space-y-2" key={i}>
              <div className="flex gap-4 justify-between">
                <Skeleton className="w-1/2 h-4 rounded-full" />
                <Skeleton className="w-10 h-10 rounded-full" />
              </div>
              <Skeleton className="w-1/2 h-4 rounded-full" />
              <Skeleton className="w-11/12 h-4 rounded-full" />
            </Card>
          ))}
        >
          <OverviewCards />
        </ErrorBoundary>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="justify-between flex-row items-center pt-4">
          <CardTitle>Recent Clicks</CardTitle>
          <Link
            href="/clicks?sortBy=createdAt"
            className={buttonVariants({
              size: "sm",
              variant: "link",
              className: "gap-2",
            })}
          >
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </CardHeader>
        <CardContent className="divide-y">
          <RecentClicks />
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="justify-between flex-row items-center pt-4">
            <CardTitle>Recently Created</CardTitle>
            <Link
              href="/links?sortBy=createdAt"
              className={buttonVariants({
                size: "sm",
                variant: "link",
                className: "gap-2",
              })}
            >
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent className="divide-y">
            <RecentLinks />
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="justify-between flex-row items-center pt-4">
            <CardTitle>Most Clicked</CardTitle>
            <Link
              href="/links?sortBy=clickCount"
              className={buttonVariants({
                size: "sm",
                variant: "link",
                className: "gap-2",
              })}
            >
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent className="divide-y">
            <MostClicked />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
