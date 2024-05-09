"use client";
import React, { useEffect, useState } from "react";
import { Info, Loader, Shuffle } from "lucide-react";

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
} from "@/components/ui/form";
import {
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { createLink, getLinkByShortId } from "@/lib/api";
import { generateNanoId } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useRouterStuff } from "@/hooks/use-router-stuff";

const formSchema = z
  .object({
    title: z.string().min(3, {
      message: "Required at least 3 letters",
    }),
    longUrl: z.string().url({
      message: "Invalid URL",
    }),
    shortId: z.string().transform((e) => (e === "" ? undefined : e)),
    comments: z.string().optional(),
  })
  .superRefine(async (val, ctx) => {
    const { shortId } = val;
    if (!shortId) return;

    const isValid = /^[a-zA-Z0-9]{2,}$/.test(shortId);
    if (!isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid link`,
        path: ["shortId"],
      });
    } else {
      const result = await getLinkByShortId(shortId);
      if (!result || !result.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Short link already exist`,
          path: ["shortId"],
        });
      }
    }
  });

const CreateLinkForm = ({
  callback,
  defaultValues,
}: {
  callback: () => void;
  defaultValues?: z.infer<typeof formSchema>;
}) => {
  const [creating, setCreating] = useState(false);
  const [generating, setGenerating] = useState(false);
  const router = useRouter();
  const { queryParams, searchParamsObj } = useRouterStuff();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      longUrl: defaultValues?.longUrl || "",
      shortId: defaultValues?.shortId || "",
      comments: defaultValues?.comments || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setCreating(true);

    try {
      const response = await createLink(values);
      queryParams({
        set: {
          shortUrl: response.data.shortUrl,
        },
      });

      toast.success(`${response.data.title} created`);
      callback();

      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setCreating(false);
    }
  }

  /** generate and random string */
  const generateKey = async () => {
    setGenerating(true);
    let success = false;

    while (!success) {
      try {
        const random = generateNanoId();
        await getLinkByShortId(random);
        await new Promise((resolve) => {
          setTimeout(() => resolve(true), 500);
        });
        success = true;
        form.setValue("shortId", random);
        form.clearErrors("shortId");
      } catch (error: any) {
        // toast.success(error.message)
      }
    }
    setGenerating(false);
  };

  useEffect(() => {
    if (searchParamsObj.longUrl) {
      form.setValue("longUrl", searchParamsObj.longUrl);
    }
  }, [searchParamsObj]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ModalHeader>
          <ModalTitle className="text-2xl">Create a new link</ModalTitle>
          <ModalDescription>
            Create a unique and memorable short web address.
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
            render={({ field }) => (
              <FormItem>
                <FormLabelWithMessage>
                  <span className="inline-flex gap-1">
                    Short Link
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <p className="leading-tight text-muted-foreground">
                          Optional or at least 2 characters and consist of
                          letters and numbers, no special characters
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </span>
                </FormLabelWithMessage>

                <div className="flex rounded-md boder relative">
                  <span className="border-r rounded-l-md px-4 text-sm inline-flex items-center bg-secondary -mr-2">
                    https://link.app/
                  </span>
                  <FormControl>
                    <Input {...field} placeholder="instagram" />
                  </FormControl>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={generateKey}
                        variant="secondary"
                        type="button"
                        className="w-9 h-9 absolute inline-flex text-sm items-center inset-y-0 right-0.5 px-1 text-muted-foreground top-0.5 hover:bg-secondary"
                      >
                        {generating ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Shuffle className="w-4 h-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Generate key</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comments</FormLabel>
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
            "Create Link"
          )}
        </Button>
      </form>
    </Form>
  );
};
export default CreateLinkForm;
