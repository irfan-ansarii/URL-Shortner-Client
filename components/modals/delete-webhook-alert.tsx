"use client";
import React, { useState } from "react";
import { Webhook } from "@/lib/types";
import { Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { toast } from "sonner";
import { deleteWebhook } from "@/lib/api";
import { useRouter } from "next/navigation";

const DeleteWebhookAlert = ({
  open,
  onOpenChange,
  webhook,
}: {
  open: boolean;
  onOpenChange: (p: boolean) => void;
  webhook: Webhook;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!webhook || !webhook.id) {
      toast.error("Webhook not found");
      return;
    }
    setLoading(true);
    try {
      await deleteWebhook(webhook.id);
      toast.success("Webhook deleted");
      router.refresh();
      setLoading(true);

      onOpenChange(false);
    } catch (error: any) {
      toast.success(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to continue?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove the webhook events and no longer send
            notifications
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-destructive hover:bg-destructive/80 active:bg-destructive/80 md:w-28 text-destructive-foreground"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : "Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWebhookAlert;
