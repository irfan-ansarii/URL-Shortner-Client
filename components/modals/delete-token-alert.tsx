"use client";
import React, { useState } from "react";
import { Token } from "@/lib/types";
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
import { deleteToken } from "@/lib/api";
import { useRouter } from "next/navigation";

const DeleteTokenAlert = ({
  open,
  onOpenChange,
  token,
}: {
  open: boolean;
  onOpenChange: (p: boolean) => void;
  token: Token;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!token || !token.id) {
      toast.error("API Token not found");
      return;
    }
    setLoading(true);
    try {
      await deleteToken(token.id);
      toast.success("API token deleted");
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
            This will permanently delete the API token for and revoke all access
            to your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-destructive hover:bg-destructive/80 active:bg-destructive/80 md:w-28 text-destructive-foreground"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTokenAlert;
