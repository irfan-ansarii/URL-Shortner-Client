"use client";
import React from "react";
import { Loader, Mail } from "lucide-react";

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
  FormLabel,
} from "@/components/ui/form";
import { signin } from "@/lib/auth";
import {
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { toast } from "sonner";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Required",
    })
    .email({
      message: "Enter valid email",
    }),
});

export default function SigninForm({ callback }: { callback: () => void }) {
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await signin({ email: values.email });
      localStorage.setItem("signin_email", values.email);
      callback();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ModalHeader>
          <ModalTitle className="text-2xl">Sign In</ModalTitle>
          <ModalDescription>
            Enter your email below and we&#39;ll send you an OTP to sign in.
          </ModalDescription>
        </ModalHeader>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-0 relative">
              <FormLabel className="sr-only">Email</FormLabel>

              <FormControl prefixIcon={<Mail className="w-4 h-4" />}>
                <Input
                  placeholder="Enter email here..."
                  {...field}
                  autoComplete="off"
                  className="px-10"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {loading ? <Loader className="w-4 h-4 animate-spin" /> : "Send OTP"}
        </Button>
      </form>
    </Form>
  );
}
