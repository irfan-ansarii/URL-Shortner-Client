"use client";
import React, { useState } from "react";
import { Loader, Info } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormLabelWithMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createToken } from "@/lib/api";
import { toast } from "sonner";
import TokenCreatedModal from "../modals/token-created-modal";
import { format } from "date-fns";

const expireOptions = [
  {
    value: "1d",
    label: "24 Hours",
  },
  {
    value: "7d",
    label: "7 Days",
  },
  {
    value: "30d",
    label: "30 Days",
  },
  {
    value: "90d",
    label: "3 Months",
  },
  {
    value: "365d",
    label: "1 Year",
  },
  {
    value: "",
    label: "Never",
  },
];

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Required",
  }),
  expiresIn: z.string().transform((v) => (v === "" ? undefined : v)),
});

export const getExpiryDate = (daysToAdd?: string) => {
  const regex = /^(\d+)d$/;
  const match = daysToAdd?.match(regex);

  if (!daysToAdd || !match) return undefined;

  const days = parseInt(match[1], 10);

  const newDate = new Date();

  newDate.setDate(newDate.getDate() + days);

  return newDate;
};

export default function CreateTokenForm() {
  const [loading, setLoading] = React.useState(false);

  const [openTokenModal, setOpenTokenModal] = useState(false);
  const [token, setToken] = useState<undefined | string>(undefined);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      expiresIn: "",
    },
  });

  const expiryDate = getExpiryDate(form.watch("expiresIn"));
  const isDirty = form.formState.isDirty;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const response = await createToken(values);

      toast.success("API token created");

      if (response?.data?.token) {
        setToken(response?.data?.token);
        setOpenTokenModal(true);
      }
      form.reset();
      router.refresh();
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabelWithMessage>Name</FormLabelWithMessage>
              <FormControl>
                <Input placeholder="E.g. Development" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expiresIn"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabelWithMessage>Expiration date</FormLabelWithMessage>

              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="gap-3"
              >
                {expireOptions.map((option, i) => (
                  <FormItem
                    className="flex items-center space-x-3 space-y-0 [&>div]:w-auto cursor-pointer"
                    key={`${option.value}${i}`}
                  >
                    <FormControl showErrorIcon={false}>
                      <RadioGroupItem value={option.value} />
                    </FormControl>

                    <FormLabel className="font-normal flex w-full cursor-pointer">
                      {option.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
              {expiryDate ? (
                <div className="text-yellow-600 border border-yellow-600 bg-yellow-100 dark:bg-yellow-900/40  p-4 rounded-md flex items-center gap-3">
                  <Info className="w-4 h-4" />
                  <p className="font-medium text-sm">
                    The API Token will expire on{" "}
                    {format(expiryDate, "dd-mm-yyyy hh:mm aa")}
                  </p>
                </div>
              ) : null}
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading || !isDirty}>
          {loading ? <Loader className="w-4 h-4 animate-spin" /> : "Create"}
        </Button>
      </form>

      {openTokenModal && (
        <TokenCreatedModal
          open={openTokenModal}
          setOpen={setOpenTokenModal}
          token={token!}
        />
      )}
    </Form>
  );
}
