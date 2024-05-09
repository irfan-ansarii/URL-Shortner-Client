"use client";
import React, { useState } from "react";
import { User } from "@/lib/types";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import ProfileForm from "../forms/profile-form";

const OnboardingModal = ({ session }: { session: User }) => {
  const [open, setOpen] = useState(session?.firstName ? false : true);

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalContent className="md:p-8">
        <ModalHeader>
          <ModalTitle className="text-2xl">Welcome to link.app</ModalTitle>
          <ModalDescription>
            To get started, please take a few moments to complete your profile
          </ModalDescription>
        </ModalHeader>

        <ProfileForm defaultValues={session} callback={() => setOpen(false)} />
      </ModalContent>
    </Modal>
  );
};

export default OnboardingModal;
