"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CornerDownLeft, Link2, Loader } from "lucide-react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useQueryParams } from "@/hooks/use-query-params";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Modal, ModalContent } from "@/components/ui/modal";

import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import SigninForm from "./signin-form";
import CreateLinkForm from "./create-link-form";
import ShareLinkTab from "./share-link-tab";
import VerifyOTPForm from "./verify-otp-form";
import Link from "next/link";
import { getSession } from "@/lib/auth";

interface Session {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  status: "active" | "blocked";
}

const formSchema = z.object({
  longUrl: z
    .string()
    .min(2, {
      message: "Required",
    })
    .url({ message: "Enter valid url" }),
});

export default function GenerateForm() {
  const [open, toggle] = React.useState(false);

  const [active, setActive] = React.useState<undefined | string>(undefined);
  const [loading, setLoading] = React.useState(false);
  const [showCreateForm, setShowCreateForm] = React.useState(false);

  const { queryParams, setQueryParams } = useQueryParams();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      longUrl: queryParams.longUrl || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setQueryParams({
      longUrl: values.longUrl,
    });

    try {
      await getSession();
      setActive("create");
    } catch (error) {
      setShowCreateForm(true);
      setActive("signin");
    } finally {
      setLoading(false);
      toggle(true);
    }
  }

  const handleLogin = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    try {
      await getSession();
    } catch (error) {
      setActive("signin");
      toggle(true);
      e.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="longUrl"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only">Long URL</FormLabel>
                <FormControl
                  prefixIcon={<Link2 className="w-5 h-5" />}
                  suffixIcon={<CornerDownLeft className="w-5 h-5" />}
                >
                  <Input
                    placeholder="https://link.app"
                    {...field}
                    className="px-10 bg-transparent border-foreground"
                  />
                </FormControl>
                <FormMessage className="sr-only" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : "Generate"}
          </Button>
        </form>
      </Form>

      <Link
        href="/dashboard"
        onClick={handleLogin}
        className={`w-full ${buttonVariants({ variant: "link" })}`}
      >
        View Link Performance
      </Link>

      <Modal open={open} onOpenChange={toggle}>
        <ModalContent className="md:p-8">
          <Tabs
            defaultValue="signin"
            value={active}
            onValueChange={(value) => setActive(value)}
          >
            {/* signin */}
            <TabsContent
              value="signin"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 mt-0 grid gap-4"
            >
              <SigninForm callback={() => setActive("verify")} />
            </TabsContent>

            {/* verify */}
            <TabsContent
              value="verify"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 mt-0 grid gap-4"
            >
              <VerifyOTPForm
                callback={() => {
                  if (showCreateForm) {
                    setActive("create");
                  } else {
                    router.push("/dashboard");
                  }
                }}
                backToSignin={() => setActive("signin")}
              />
            </TabsContent>

            {/* create link */}
            <TabsContent
              value="create"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 mt-0 grid gap-4"
            >
              <CreateLinkForm callback={() => setActive("share")} />
            </TabsContent>

            {/* share link */}
            <TabsContent
              value="share"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 mt-0 grid gap-4"
            >
              <ShareLinkTab />
            </TabsContent>
          </Tabs>
        </ModalContent>
      </Modal>
    </>
  );
}
