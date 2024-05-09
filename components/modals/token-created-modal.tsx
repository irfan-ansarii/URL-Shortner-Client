import React from "react";
import { BadgeCheck, CheckCircle } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalClose,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from "@/components/ui/modal";
import CopyClipboard from "../copy-clipboard";
import { Button } from "../ui/button";
import DownloadContent from "../download-content";

const TokenCreatedModal = ({
  open,
  setOpen,
  token,
}: {
  open: boolean;
  setOpen: (p: boolean) => void;
  token: string;
}) => {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalContent className="md:p-8">
        <ModalHeader className="gap-2">
          <div className="w-12 h-12 inline-flex mx-auto items-center justify-center bg-green-100 dark:bg-green-900/40 text-green-600 rounded-full">
            <CheckCircle className="w-5 h-5" />
          </div>
          <ModalTitle>API Token Created</ModalTitle>
          <ModalDescription>
            For security reasons, we will only show you the key once. Please
            copy and store it somewhere safe.
          </ModalDescription>
        </ModalHeader>

        <div className="rounded-md border flex items-center p-3 overflow-hidden gap-2">
          <p className="truncate text-muted-foreground">{token}</p>
          <CopyClipboard
            text={token}
            className="w-8 h-8 rounded-full flex-none"
            iconClassName="w-4 h-4"
          />
          <DownloadContent
            text={token}
            className="w-8 h-8 rounded-full flex-none"
            iconClassName="w-4 h-4"
          />
        </div>

        <ModalClose asChild>
          <Button>Done</Button>
        </ModalClose>
      </ModalContent>
    </Modal>
  );
};

export default TokenCreatedModal;
