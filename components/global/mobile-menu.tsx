"use client";
import React from "react";
import Image from "next/image";
import { User } from "@/lib/types";
import { AlignLeft, PlusCircle } from "lucide-react";

import { useMediaQuery } from "@/hooks/use-media-query";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import Sidebar from "./sidebar";
import CreateLinkModal from "@/components/modals/create-link-modal";

const MobileMenu = ({ session }: { session: User }) => {
  const isDesktop = useMediaQuery("(max-width: 1024px)");

  if (!isDesktop) return null;

  return (
    <Sheet>
      <div className="py-4 px-2 border-b">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-2 -top-1 ">
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="logo"
              className="dark:mix-blend-difference"
            ></Image>
          </div>
          <SheetTrigger asChild>
            <Button variant="link" size="icon" className="ml-[66px]">
              <AlignLeft className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <CreateLinkModal>
            <Button variant="link" size="icon">
              <PlusCircle className="w-5 h-5" />
            </Button>
          </CreateLinkModal>
        </div>
      </div>

      {/* @ts-ignore */}
      <SheetContent side="left" className="p-0 pt-8">
        <Sidebar session={session} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
