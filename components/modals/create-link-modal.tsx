"use client";
import React, { useState } from "react";

import { Modal, ModalContent, ModalTrigger } from "@/components/ui/modal";

import CreateLinkForm from "@/components/forms/create-link-form";

const CreateLinkModal = ({
  children,
  defaultValues,
  open,
  setOpen,
}: {
  children?: React.ReactNode;
  defaultValues?: any;
  open?: boolean;
  setOpen?: (param: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const callback = () => {
    if (setOpen && typeof setOpen) {
      setOpen(false);
    } else {
      setIsOpen(false);
    }
  };
  return (
    <Modal open={open || isOpen} onOpenChange={setOpen || setIsOpen}>
      {children ? <ModalTrigger asChild>{children}</ModalTrigger> : null}

      <ModalContent className="md:p-8">
        <CreateLinkForm callback={callback} defaultValues={defaultValues} />
      </ModalContent>
    </Modal>
  );
};

export default CreateLinkModal;
