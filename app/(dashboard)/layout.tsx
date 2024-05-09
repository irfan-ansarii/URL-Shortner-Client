import React from "react";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

import Sidebar from "@/components/global/sidebar";
import MobileMenu from "@/components/global/mobile-menu";
import { getSession } from "@/lib/auth";
import OnboardingModal from "@/components/modals/onboarding-modal";

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getSession();

  return (
    <div className="flex flex-col h-full min-h-screen">
      <MobileMenu session={session?.data} />
      <div className="grid lg:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar
          className="bg-muted/20 hidden lg:flex border-r"
          session={session?.data}
        />
        <ScrollArea className="h-screen">
          <main className="flex flex-1 flex-col relative">
            <div className="dark:opacity-0 absolute w-full h-80 top-0 left-0 bg-gradient-to-r from-gray-300 blur-[200px] to-zinc-200"></div>
            <div className="opacity-0 dark:opacity-100 absolute w-full h-80 top-0 left-0  bg-gradient-to-r from-gray-950 blur-[200px] to-zinc-950"></div>

            <div className="container py-10 px-4 md:px-8 relative">
              {children}
            </div>
          </main>
        </ScrollArea>
      </div>
      <OnboardingModal session={session?.data} />
    </div>
  );
};

export default DashboardLayout;
