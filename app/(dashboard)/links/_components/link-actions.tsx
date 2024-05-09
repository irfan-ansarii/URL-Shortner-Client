"use client";
import React from "react";
import { Link } from "@/lib/types";
import {
  Archive,
  CopyPlus,
  EllipsisVertical,
  Pen,
  QrCode,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import UpdateLinkModal from "@/components/modals/update-link-modal";
import CreateLinkModal from "@/components/modals/create-link-modal";

import DeleteLinkAlert from "@/components/modals/delete-link-alert";
import ArchiveLinkAlert from "@/components/modals/archive-link-alert";
import UnArchiveLinkAlert from "@/components/modals/unarchive-link-alert";

import { Popover } from "@/components/popover";

const LinkActions = ({ link }: { link: Link }) => {
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [duplicateOpen, setDuplicateOpen] = React.useState(false);
  const [archiveOpen, setArchiveOpen] = React.useState(false);
  const [unarchiveOpen, setUnarchiveOpen] = React.useState(false);
  const [qrOpen, setQrOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  return (
    <>
      <Popover
        open={open}
        onOpenChange={setOpen}
        content={
          <div className="grid md:w-56 p-2">
            <Button
              size="sm"
              variant="ghost"
              className="justify-start"
              onClick={() => setEditOpen(true)}
            >
              <Pen className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="justify-start"
              onClick={() => setDuplicateOpen(true)}
            >
              <CopyPlus className="w-4 h-4 mr-2" />
              Duplicate
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="justify-start"
              onClick={() => setQrOpen(true)}
            >
              <QrCode className="w-4 h-4 mr-2" />
              QR Code
            </Button>

            {link.status === "active" ? (
              <Button
                size="sm"
                variant="ghost"
                className="justify-start"
                onClick={() => setArchiveOpen(true)}
              >
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                className="justify-start"
                onClick={() => setUnarchiveOpen(true)}
              >
                <Archive className="w-4 h-4 mr-2" />
                Unarchive
              </Button>
            )}

            <Button
              size="sm"
              variant="destructive"
              className="justify-start"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        }
      >
        <Button variant="ghost" className="px-1.5 text-muted-foreground">
          <EllipsisVertical className="w-5 h-5" />
        </Button>
      </Popover>

      {editOpen && (
        <UpdateLinkModal
          open={editOpen}
          setOpen={setEditOpen}
          defaultValues={link}
        />
      )}
      {duplicateOpen && (
        <CreateLinkModal
          open={duplicateOpen}
          setOpen={setDuplicateOpen}
          defaultValues={{ ...link, shortId: "" }}
        />
      )}

      {deleteOpen && (
        <DeleteLinkAlert
          open={deleteOpen}
          setOpen={setDeleteOpen}
          defaultValues={link}
        />
      )}
      {archiveOpen && (
        <ArchiveLinkAlert
          open={archiveOpen}
          setOpen={setArchiveOpen}
          defaultValues={{ ...link, status: "archived" }}
        />
      )}
      {unarchiveOpen && (
        <UnArchiveLinkAlert
          open={unarchiveOpen}
          setOpen={setUnarchiveOpen}
          defaultValues={{ ...link, status: "active" }}
        />
      )}
    </>
  );
};

export default LinkActions;
