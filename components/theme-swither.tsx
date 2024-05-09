"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const ThemSwitcher = ({
  className,
  variant,
}: {
  className?: string;
  variant?: string;
}) => {
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Skeleton className="h-10 w-full rounded-md" />;
  }
  return (
    <Button
      size="sm"
      className={cn("justify-start gap-2 flex w-full", className)}
      onClick={handleThemeChange}
      // @ts-ignore
      variant={variant! || "ghost"}
    >
      <Sun className="w-4 h-4 dark:hidden" />
      <Moon className="w-4 h-4 hidden dark:inline" />
      {theme === "dark" ? "Light" : "Dark"} Theme
    </Button>
  );
};

export default ThemSwitcher;
