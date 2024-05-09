"use client";
import React, { useState } from "react";

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
import { deleteLink } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const DeleteLinkAlert = ({
  open,
  setOpen,
  defaultValues,
}: {
  open: boolean;
  setOpen: (param: boolean) => void;
  defaultValues?: any;
}) => {
  const [deleting, setDeleting] = useState(false);

  const router = useRouter();
  const hanldeDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDeleting(true);

    try {
      const response = await deleteLink(defaultValues.id);

      toast.success(`${response.data.title} deleted`);

      router.refresh();
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to continue??
          </AlertDialogTitle>
          <AlertDialogDescription>
            Deleting this link will remove all of its analytics. This action
            cannot be undone, proceed with caution.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/80 min-w-28"
            onClick={hanldeDelete}
          >
            {deleting ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              "   Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteLinkAlert;
