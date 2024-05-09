"use client";
import React from "react";
import { Loader } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabelWithMessage,
} from "@/components/ui/form";
import { updateProfile } from "@/lib/api";

import { toast } from "sonner";
import { User } from "@/lib/types";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z
    .string()
    .min(2, {
      message: "Required",
    })
    .email({
      message: "Enter valid email",
    }),
});

export default function ProfileForm({
  defaultValues,
  callback,
}: {
  defaultValues: User;
  callback?: () => void;
}) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: defaultValues.firstName || "",
      lastName: defaultValues.lastName || "",
      phone: defaultValues.phone || "",
      email: defaultValues.email,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await updateProfile(values);
      toast.success("Profile updated");

      router.refresh();
      if (typeof callback === "function") callback();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  const isDirty = form.formState.isDirty;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="space-y-2 relative">
              <FormLabelWithMessage>First Name</FormLabelWithMessage>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="space-y-2 relative">
              <FormLabelWithMessage>Last Name</FormLabelWithMessage>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-2 relative">
              <FormLabelWithMessage>Phone</FormLabelWithMessage>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2 relative">
              <FormLabelWithMessage>Email</FormLabelWithMessage>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={!isDirty}>
          {loading ? <Loader className="w-4 h-4 animate-spin" /> : "Save"}
        </Button>
      </form>
    </Form>
  );
}
