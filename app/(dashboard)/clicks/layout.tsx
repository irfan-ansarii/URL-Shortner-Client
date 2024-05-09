import React from "react";
import SearchFilter from "./_components/search-filter";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-4 ">
        <div className="flex-none space-y-0.5">
          <h1 className="text-2xl font-semibold truncate">Clicks Overview</h1>
          <p className="truncate text-muted-foreground">
            Manage and organize your links
          </p>
        </div>
      </div>
      <SearchFilter />
      {children}
    </div>
  );
};

export default PageLayout;
