"use client";
import React from "react";
import { Loader, PenSquare } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signin, verify } from "@/lib/auth";

import { Button, buttonVariants } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";

const formSchema = z.object({
  email: z.string().email({ message: "Enter valid email" }),
  otp: z.string().length(6, {
    message: "Enter OTP",
  }),
});

export default function VerifyOTPForm({
  callback,
  backToSignin,
}: {
  callback: () => void;
  backToSignin: () => void;
}) {
  const [loading, setLoading] = React.useState(false);
  const [resending, setResending] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      await verify({
        email: values.email,
        otp: values.otp,
      });
      localStorage.removeItem("signin_email");
      callback();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function onResend() {
    setResending(true);
    try {
      await signin({
        email: form.getValues("email"),
      });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setResending(false);
    }
  }

  React.useEffect(() => {
    const email = localStorage.getItem("signin_email");

    if (email) form.setValue("email", email);
    else backToSignin();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (e) => {
          if (e.otp) {
            toast.warning("OTP Required");
          }
        })}
        className="space-y-6"
      >
        <ModalHeader className="space-y-0">
          <ModalTitle className="text-2xl">One-Time Password</ModalTitle>
          <ModalDescription>
            Enter 6 digit OTP sent to{" "}
            <a
              href={`mailto:${form.getValues("email")}`}
              className="text-foreground underline"
            >
              {form.getValues("email")}
            </a>
            <span
              role="button"
              className={buttonVariants({
                variant: "link",
                size: "icon",
                className: "w-8 h-8",
              })}
              onClick={backToSignin}
            >
              <PenSquare className="w-3 h-3" />
            </span>
          </ModalDescription>
        </ModalHeader>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="sr-only">Long URL</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    onComplete={() =>
                      form.handleSubmit(onSubmit, (e) => console.log(e))
                    }
                  >
                    <InputOTPGroup className="[&>div]>w-auto [&>div]:flex-1 flex-1">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />
          <ModalDescription>
            Didn&#39;t recieve the OTP?
            <Button
              variant="link"
              onClick={onResend}
              disabled={resending}
              type="button"
              className="disabled:opacity-100 px-1.5"
            >
              {resending ? "Sending..." : "Resend"}
            </Button>
          </ModalDescription>
        </div>
        <Button type="submit" className="w-full">
          {loading ? <Loader className="w-4 h-4 animate-spin" /> : "Verify OTP"}
        </Button>
      </form>
    </Form>
  );
}
