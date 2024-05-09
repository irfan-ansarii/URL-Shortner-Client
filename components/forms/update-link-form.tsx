"use client";
import React from "react";
import { Loader, Shuffle } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormLabelWithMessage,
  FormMessage,
} from "@/components/ui/form";
import {
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";

import { Textarea } from "@/components/ui/textarea";

import { toast } from "sonner";
import { getLinkByShortId, updateLink } from "@/lib/api";
import { generateNanoId } from "@/lib/utils";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  id: z.number(),
  title: z.string().min(3, {
    message: "Required at least 3 characters",
  }),
  longUrl: z
    .string()
    .min(5, {
      message: "Required",
    })
    .url({
      message: "Enter valid url",
    }),
  status: z.string(),
  shortId: z.any(),
  comments: z.string().optional(),
});

const UpdateLinkForm = ({
  callback,
  defaultValues,
}: {
  callback: () => void;
  defaultValues: z.infer<typeof formSchema>;
}) => {
  const [creating, setCreating] = React.useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: defaultValues?.id || undefined,
      title: defaultValues?.title || "",
      longUrl: defaultValues?.longUrl || "",
      shortId: defaultValues?.shortId || "",
      status: defaultValues?.status || "active",
      comments: defaultValues?.comments || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setCreating(true);
    const { id, shortId, ...rest } = values;
    try {
      const response = await updateLink(id, rest);
      toast.success(`${response.data.title} updated`);
      router.refresh();
      callback();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setCreating(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ModalHeader>
          <ModalTitle className="text-2xl">Update Link</ModalTitle>
          <ModalDescription>
            Update your unique and memorable short web address.
          </ModalDescription>
        </ModalHeader>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabelWithMessage>Title</FormLabelWithMessage>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabelWithMessage>Destination URL</FormLabelWithMessage>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shortId"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Link</FormLabel>
                <div className="flex rounded-md border relative">
                  <span className="rounded-l-md px-4 text-sm inline-flex items-center bg-secondary -mr-2">
                    https://link.app/
                  </span>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="instagram"
                      className="bg-secondary border-none"
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabelWithMessage>Comments</FormLabelWithMessage>
                <FormControl>
                  <Textarea
                    placeholder="Add comments"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          {creating ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            "Update Link"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateLinkForm;
