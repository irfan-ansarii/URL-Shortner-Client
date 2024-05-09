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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { updateLink } from "@/lib/api";

const UnArchiveLinkAlert = ({
  open,
  setOpen,
  defaultValues,
}: {
  open: boolean;
  setOpen: (param: boolean) => void;
  defaultValues?: any;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { id, status, title, longUrl, comments } = defaultValues;

  const values = {
    title,
    longUrl,
    status,
    comments,
  };
  const hanldeArchive = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await updateLink(id, values);
      toast.success(`${response.data.title} unarchived`);
      router.refresh();
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Unarchiving this link will restore its functionality and enable
            future analytics. Are you sure you want to proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={`min-w-28 text-destructive-foreground capitalize bg-green-700  hover:bg-green-700/80`}
            onClick={hanldeArchive}
          >
            {loading ? <Loader className="w-4 h-4" /> : "Unarchive"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UnArchiveLinkAlert;
