import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Link as LinkType } from "@/lib/types";
import { BarChart3, Calendar, Info } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import CopyClipboard from "@/components/copy-clipboard";
import LinkActions from "./link-actions";

const LinkCard = ({ link }: { link: LinkType }) => {
  const isArchived = link.status === "archived";

  return (
    <Card
      className={`hover:border-foreground transition duration-500 overflow-hidden w-full`}
    >
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex flex-1 gap-2 md:gap-4 overflow-hidden">
            <Avatar className="border-2 md:w-12 md:h-12">
              <AvatarImage src={link.favicon} className="p-1 rounded-full" />
              <AvatarFallback className="font-medium text-xs uppercase">
                {link.title?.[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex-auto overflow-hidden">
              <CardTitle
                className={`text-base md:text-lg font-medium truncate ${
                  isArchived ? "line-through text-muted-foreground" : ""
                }`}
              >
                {link.title}
              </CardTitle>

              <div className="flex items-center gap-2 max-w-fit font-medium text-sm md:text-base overflow-hidden">
                {isArchived ? (
                  <p className="text-muted-foreground truncate">
                    {link.shortUrl}
                  </p>
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
                  className="rounded-full w-8 h-8 flex-none"
                  iconClassName="w-3 h-3"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center flex-none gap-1">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link href={`/analytics/${link.id}`}>
                  <Badge
                    className="py-1"
                    variant={link.clickCount > 0 ? "default" : "secondary"}
                  >
                    <BarChart3 className="w-4 h-4 mr-1 md:mr-2" />
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
        <div className="flex gap-2 md:gap-4">
          <div className="w-10 md:w-12"></div>
          <div className="flex  items-center gap-2 text-sm overflow-hidden flex-1">
            <span className="inline-flex items-center text-muted-foreground gap-2">
              <Calendar className="w-4 h-4" />
              {format(link.createdAt, "MMM dd")}
            </span>

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
      </CardContent>
    </Card>
  );
};

export default LinkCard;
