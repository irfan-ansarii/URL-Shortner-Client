"use client";
import React from "react";
import Link from "next/link";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouterStuff } from "@/hooks/use-router-stuff";

const TabsNav = () => {
  const { queryParams } = useRouterStuff();
  return (
    <TabsList className="flex justify-between border md:justify-start md:flex-col md:items-stretch w-full p-2 md:p-4 h-auto col-span-7 md:col-span-2 [&>button]:flex-1 [&>button]:md:flex-none [&>button]:md:justify-start">
      <TabsTrigger value="profile" className="p-0">
        <Link
          className="block w-full py-1.5 px-3 md:text-left"
          href={
            queryParams({
              set: { tab: "profile" },
              getNewPath: true,
            }) as string
          }
        >
          Profile
        </Link>
      </TabsTrigger>
      <TabsTrigger value="tokens" className="p-0">
        <Link
          className="block w-full py-1.5 px-3 md:text-left"
          href={
            queryParams({
              set: { tab: "tokens" },
              getNewPath: true,
            }) as string
          }
        >
          API Tokens
        </Link>
      </TabsTrigger>
      <TabsTrigger value="webhooks" className="p-0">
        <Link
          className="block w-full py-1.5 px-3 md:text-left"
          href={
            queryParams({
              set: { tab: "webhooks" },
              getNewPath: true,
            }) as string
          }
        >
          Webhooks
        </Link>
      </TabsTrigger>
    </TabsList>
  );
};

export default TabsNav;
