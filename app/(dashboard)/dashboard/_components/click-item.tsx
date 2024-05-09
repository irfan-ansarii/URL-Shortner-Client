import React from "react";
import { format } from "date-fns";
import { Click } from "@/lib/types";
import {
  Chrome,
  Globe,
  Monitor,
  MonitorSmartphone,
  Smartphone,
  Calendar,
  ExternalLink,
  Share2,
  Tablet,
} from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import CopyClipboard from "@/components/copy-clipboard";

const deviceIcon: { [key: string]: React.ComponentType } = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};
const ClickItem = ({ click }: { click: Click }) => {
  const isArchived = click.link.status === "archived";

  const DeviceIcon = deviceIcon[click.deviceType] || Monitor;

  return (
    <div className="py-3">
      <div className="flex items-center gap-2 ">
        <div className="flex flex-1 gap-2  overflow-hidden">
          <Avatar className="border-2">
            <AvatarImage
              src={click.link.favicon}
              className="p-1 rounded-full"
            />
            <AvatarFallback className="font-medium text-xs uppercase">
              {click.link.title?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-auto overflow-hidden">
            <CardTitle
              className={`text-base  font-medium truncate ${
                isArchived ? "line-through text-muted-foreground" : ""
              }`}
            >
              {click.link.title}
            </CardTitle>

            <div className="flex items-center gap-2 max-w-fit font-medium text-sm  overflow-hidden">
              {isArchived ? (
                <p className="truncate text-muted-foreground">
                  {click.link.shortUrl}
                </p>
              ) : (
                <a
                  href={click.link.shortUrl}
                  target="_blank"
                  className={`truncate flex-1`}
                >
                  {click.link.shortUrl}
                </a>
              )}
              <CopyClipboard
                text={click.link.shortUrl}
                className="rounded-full w-8 h-8 flex-none"
                iconClassName="w-3 h-3"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center flex-none gap-1">
          <Badge className="py-1" variant="secondary">
            <Share2 className="w-4 h-4 mr-2" />
            {click.referrer}
          </Badge>
        </div>
      </div>

      <div className="flex gap-2 ">
        {/* left side spacer */}
        <div className="w-10 flex-none"></div>

        <div className="flex flex-col space-y-1 overflow-hidden">
          <a
            href={click.link.longUrl}
            target="_blank"
            className="hover:underline flex items-center"
          >
            <span className="truncate">{click.link.longUrl}</span>
            <ExternalLink className="w-4 h-4 ml-2 flex-none" />
          </a>

          <div className="flex items-center gap-2 text-sm flex-1 capitalize">
            <span className="text-muted-foreground inline-flex items-center gap-2">
              <Calendar className="w-4 h-4 hidden md:inline" />
              {format(click.createdAt, "MMM dd")}
            </span>
            <p>•</p>
            <span className="text-muted-foreground inline-flex items-center gap-2">
              {/* @ts-ignore */}
              <DeviceIcon className="w-4 h-4" />
              <span className="hidden md:inline">{click.deviceType}</span>
            </span>
            <p>•</p>
            <span className="text-muted-foreground inline-flex items-center gap-2">
              <Chrome className="w-4 h-4" />
              <span className="hidden md:inline">{click.browser}</span>
            </span>
            <p>•</p>
            <span className="text-muted-foreground inline-flex items-center gap-2">
              <MonitorSmartphone className="w-4 h-4" />
              <span className="hidden md:inline">{click.operatingSystem}</span>
            </span>
            <p>•</p>
            <span className="text-muted-foreground inline-flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden md:inline">
                {click.country} - {click.state}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClickItem;
