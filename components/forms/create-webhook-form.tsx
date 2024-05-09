"use client";
import React from "react";
import { Loader } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormLabelWithMessage,
} from "@/components/ui/form";

import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { createWebhook } from "@/lib/api";

const options = [
  {
    value: "link.created",
    label: "Link Created",
  },
  {
    value: "link.updated",
    label: "Link Updated",
  },
  {
    value: "link.deleted",
    label: "Link Deleted",
  },
  {
    value: "link.visited",
    label: "Link Visited",
  },
];

const formSchema = z.object({
  events: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Select at least one event",
  }),
  url: z
    .string()
    .min(1, { message: "Required" })
    .url({ message: "Invalid url" }),
  secret: z.string().min(1, { message: "Required" }),
});

export default function CreateWebhookForm() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      events: [],
      url: "",
      secret: "",
    },
  });
  const isDirty = form.formState.isDirty;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await createWebhook(values);
      router.refresh();
      toast.success("Webhook created");
      form.reset();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabelWithMessage>Webhook URL</FormLabelWithMessage>
              <FormControl>
                <Input placeholder="https://" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="events"
          render={() => (
            <FormItem className="space-y-3">
              <FormLabelWithMessage>Events</FormLabelWithMessage>

              {options.map((item) => (
                <FormField
                  key={item.value}
                  control={form.control}
                  name="events"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.value}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl showErrorIcon={false}>
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked: boolean) => {
                              return checked
                                ? field.onChange([...field.value, item.value])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.value
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secret"
          render={({ field }) => (
            <FormItem>
              <FormLabelWithMessage>Secret</FormLabelWithMessage>
              <FormControl>
                <Input placeholder="Value" {...field} />
              </FormControl>
              <FormDescription>
                Note:Secret will be passed in HTTP header: x-api-key
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading || !isDirty}>
          {loading ? <Loader className="w-4 h-4 animate-spin" /> : "Create"}
        </Button>
      </form>
    </Form>
  );
}
