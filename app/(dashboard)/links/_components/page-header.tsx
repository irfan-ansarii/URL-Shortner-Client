import React from "react";
import { Link, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateLinkModal from "@/components/modals/create-link-modal";

const PageHeader = () => {
  return (
    <div className="flex items-center gap-4 ">
      <div className="flex-none space-y-0.5">
        <h1 className="text-2xl font-semibold truncate">Manage Links</h1>
        <p className="truncate text-muted-foreground">
          Manage and organize your links
        </p>
      </div>
      <div className="ml-auto hidden md:block">
        <CreateLinkModal>
          <Button className="w-56 justify-between">
            <span className="inline-flex gap-2">
              <Link className="w-4 h-4" /> Create Link
            </span>
            <PlusCircle className="w-4 h-4 mr-2" />
          </Button>
        </CreateLinkModal>
      </div>
    </div>
  );
};

export default PageHeader;
