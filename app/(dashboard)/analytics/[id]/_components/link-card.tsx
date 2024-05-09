import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { BarChart3, Info } from "lucide-react";
import { Link as LinkTypes } from "@/lib/types";
import { CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import CopyClipboard from "@/components/copy-clipboard";

const LinkCard = ({ link }: { link: LinkTypes }) => {
  return (
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
            <CardTitle className={`text-base md:text-lg font-medium truncate`}>
              {link.title}
            </CardTitle>

            <div className="flex items-center gap-2 max-w-fit font-medium text-sm md:text-base overflow-hidden">
              <a
                href={link.shortUrl}
                target="_blank"
                className={`truncate flex-1`}
              >
                {link.shortUrl}
              </a>

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
              <Badge className="py-1">
                <BarChart3 className="w-4 h-4 mr-1 md:mr-2" />
                {link.clickCount || 0}
                <span className="hidden md:inline ml-1"> Clicks</span>
              </Badge>
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
        </div>
      </div>
      <div className="flex gap-2 md:gap-4">
        <div className="w-10 md:w-12"></div>
        <div className="flex max-w-fit items-center gap-2 text-sm overflow-hidden flex-1">
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
    </CardContent>
  );
};

export default LinkCard;
