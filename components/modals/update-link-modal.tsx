"use client";
import React from "react";
import { Modal, ModalContent, ModalTrigger } from "@/components/ui/modal";

import UpdateLinkForm from "@/components/forms/update-link-form";

const UpdateLinkModal = ({
  children,
  defaultValues,
  open,
  setOpen,
}: {
  children?: React.ReactNode;
  defaultValues?: any;
  open: boolean;
  setOpen: (param: boolean) => void;
}) => {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      {children ? <ModalTrigger asChild>{children}</ModalTrigger> : null}

      <ModalContent className="md:p-8">
        <UpdateLinkForm
          callback={() => setOpen(false)}
          defaultValues={defaultValues}
        />
      </ModalContent>
    </Modal>
  );
};

export default UpdateLinkModal;
