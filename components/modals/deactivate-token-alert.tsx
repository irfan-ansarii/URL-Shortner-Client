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
import { deactivateToken, deleteToken } from "@/lib/api";
import { useRouter } from "next/navigation";

const DeactivateTokenAlert = ({
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

  const onDeactivate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!token || !token.id) {
      toast.error("API Token not found");
      return;
    }
    setLoading(true);
    try {
      await deactivateToken(token.id);

      router.refresh();
      setLoading(true);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
      toast.success("API token deactivated");
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
          <AlertDialogTitle>Deactivate API Token</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently deactivate the API token for and revoke all
            access to your account. Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDeactivate}
            className="bg-destructive hover:bg-destructive/80 active:bg-destructive/80 md:w-28 text-destructive-foreground"
          >
            {loading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              "Deactivate"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeactivateTokenAlert;
