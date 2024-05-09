import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Link as LinkType } from "@/lib/types";
import { BarChart3, Info } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import CopyClipboard from "@/components/copy-clipboard";

import LinkActions from "../../links/_components/link-actions";

const LinkItem = ({ link }: { link: LinkType }) => {
  const isArchived = link.status === "archived";

  return (
    <div className="py-3">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 gap-2  overflow-hidden">
          <Avatar className="border-2">
            <AvatarImage src={link.favicon} className="p-1 rounded-full" />
            <AvatarFallback className="font-medium text-xs uppercase">
              {link.title?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-auto overflow-hidden">
            <CardTitle
              className={`text-base font-medium truncate ${
                isArchived ? "line-through text-muted-foreground" : ""
              }`}
            >
              {link.title}
            </CardTitle>

            <div className="flex items-center gap-2 max-w-fit font-medium text-sm overflow-hidden">
              {isArchived ? (
                <p className="text-muted-foreground">{link.shortUrl}</p>
              ) : (
                <a
                  href={link.shortUrl}
                  target="_blank"
                  className={`truncate flex-1`}
                >
                  {link.shortUrl}
                </a>
              )}
              <CopyClipboard
                text={link.shortUrl}
                className="rounded-full w-8 h-8"
                iconClassName="w-3 h-3"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center flex-none gap-1">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link href={`/analytics/${link.id}`}>
                <Badge className="py-1">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  {link.clickCount || 0}
                  <span className="hidden md:inline ml-1"> Clicks</span>
                </Badge>
              </Link>
            </HoverCardTrigger>
            {link.clickCount > 0 && (
              <HoverCardContent className="w-auto space-y-1">
                <p className="text-center font-medium text-sm">
                  {link.clickCount || 0} total clicks
                </p>
                <p className="text-muted-foreground text-xs font-medium">
                  Last clicked {format(link.lastClickedAt, "MMM dd")}
                </p>
              </HoverCardContent>
            )}
          </HoverCard>
          <LinkActions link={link} />
        </div>
      </div>
      <div className="flex gap-2 ">
        <div className="w-10  flex-none"></div>
        <div className="flex items-center gap-2 text-sm overflow-hidden">
          <p className="text-muted-foreground">
            {format(link.createdAt, "MMM dd")}
          </p>
          <p>•</p>
          {link.comments && (
            <>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Info className="w-3 h-3" />
                </HoverCardTrigger>

                <HoverCardContent className="w-auto space-y-1">
                  <p className="text-center font-medium text-sm whitespace-pre">
                    {link.comments}
                  </p>
                </HoverCardContent>
              </HoverCard>
              <p>•</p>
            </>
          )}
          <a
            href={link.longUrl}
            target="_blank"
            className="hover:underline truncate flex-1"
          >
            {link.longUrl}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LinkItem;
