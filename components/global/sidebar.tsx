"use client";

import Image from "next/image";
import { User } from "@/lib/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signout } from "@/lib/auth";

import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  PlusCircle,
  Settings,
  Link as LinkIcon,
  MousePointer,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ThemSwitcher from "@/components/theme-swither";
import CreateLinkModal from "@/components/modals/create-link-modal";
import { useRouter } from "next/navigation";

interface NavProps {
  title: string;
  href: string;
  label?: string;
  icon: LucideIcon;
}

const linkss: NavProps[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Links",
    href: "/links",
    icon: LinkIcon,
  },
  {
    title: "Clicks",
    href: "/clicks",
    icon: MousePointer,
  },
];

export default function Sidebar({
  session,
  className,
}: {
  session: User;
  className?: string;
}) {
  const router = useRouter();

  const signoutHandler = async () => {
    await signout();
    router.replace("/");
  };
  return (
    <div
      className={cn(
        "group flex flex-col h-full gap-4 py-6 relative",
        className
      )}
    >
      <div className="px-6">
        <CreateLinkModal>
          <Button className="w-full justify-between" variant="secondary">
            <span className="inline-flex gap-2">
              <LinkIcon className="w-4 h-4" />
              Create Link
            </span>
            <PlusCircle className="w-4 h-4 mr-2" />
          </Button>
        </CreateLinkModal>
      </div>
      <ScrollArea className="flex-1 overflow-auto">
        <ul className="grid gap-1">
          {linkss.map((link, index) => (
            <li className="px-6 overflow-hidden" key={index}>
              <Link
                key={index}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "flex justify-start gap-2"
                )}
              >
                {link.icon ? <link.icon className="w-4 h-4" /> : null}

                <span className="truncate flex-1">{link.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </ScrollArea>

      <div className="px-6 space-y-2">
        <div className="border-t"></div>
        <Link
          href="/settings?tab=tokens"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "flex justify-start gap-2"
          )}
        >
          <Settings className="w-4 h-4" />

          <span className="truncate flex-1">Settings</span>
        </Link>
        <ThemSwitcher className="" />
        <div
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "h-auto flex px-2"
          )}
        >
          <Link
            href="/settings?tab=profile"
            className="flex flex-1 items-center gap-2 text-foreground overflow-hidden"
          >
            <Avatar className="h-8 w-8 flex-none">
              <AvatarFallback className="bg-indigo-600 uppercase ">
                {session?.firstName
                  ? session?.firstName?.charAt(0)
                  : session?.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <p className="truncate">
              {session?.firstName
                ? `${session?.firstName} ${session?.lastName}`
                : session?.email}
            </p>
          </Link>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="destructive"
                className="w-8 h-8"
                onClick={signoutHandler}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Logout</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
