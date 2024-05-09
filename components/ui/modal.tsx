"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

const ModalTrigger = DrawerTrigger;
ModalTrigger.displayName = "ModalTrigger";

const ModalClose = DrawerClose;
ModalClose.displayName = "ModalClose";

const ModalHeader = DialogHeader;
ModalHeader.displayName = "ModalHeader";

const ModalFooter = DrawerFooter;
ModalFooter.displayName = "ModalFooter";

const ModalTitle = DrawerTitle;
ModalTitle.displayName = "ModalTitle";

const ModalDescription = DrawerDescription;
ModalDescription.displayName = "ModalDescription";

const Modal = ({ ...props }: React.ComponentProps<typeof Drawer>) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) return <Dialog {...props} />;

  return <Drawer {...props} />;
};
Modal.displayName = Modal;

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DrawerContent>,
  React.ComponentPropsWithoutRef<typeof DrawerContent>
>(({ className, children, ...props }, ref) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop)
    return (
      <DialogContent
        {...props}
        ref={ref}
        className={cn("focus:outline-none", className)}
      >
        {children}
      </DialogContent>
    );
  return (
    <DrawerContent
      {...props}
      ref={ref}
      className={cn("focus:outline-none pt-8", className)}
    >
      {children}
    </DrawerContent>
  );
});
ModalContent.displayName = "ModalContent";

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalClose,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
};
