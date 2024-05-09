import React from "react";
import PageHeader from "./_components/page-header";
import SearchFilter from "./_components/search-filter";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid gap-6">
      <PageHeader />
      <SearchFilter />
      {children}
    </div>
  );
};

export default PageLayout;
