"uce client";
import React from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { useRouterStuff } from "@/hooks/use-router-stuff";

import CopyClipboard from "@/components/copy-clipboard";
import ShareButton from "@/components/share-button";
import {
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";

const CopyLinkTab = () => {
  const { searchParamsObj } = useRouterStuff();

  return (
    <div className="space-y-6">
      <ModalHeader>
        <ModalTitle className="text-2xl">Congratulations</ModalTitle>
        <ModalDescription>
          Your link has been successfully created.
        </ModalDescription>
      </ModalHeader>
      <div className="rounded-md border p-3 relative">
        <span>{searchParamsObj.shortUrl}</span>

        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex gap-2">
          <CopyClipboard text="dfg" />
          <ShareButton
            data={{
              text: `Share`,
              url: searchParamsObj.shortUrl,
              title: "Share",
            }}
          />
        </div>
      </div>
      <div className="space-y-4 flex flex-col">
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href={searchParamsObj.shortUrl}
          target="_blank"
        >
          Visit link
        </Link>
        <Link className={buttonVariants()} href="/dashboard">
          View Performance
        </Link>
      </div>
    </div>
  );
};

export default CopyLinkTab;
