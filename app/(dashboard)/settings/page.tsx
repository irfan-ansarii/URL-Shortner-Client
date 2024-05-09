import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import ErrorBoundary from "@/components/global/error-boundary";

import Profile from "./_components/profile";
import PageSpinner from "@/components/global/page-spinner";
import CreateTokenForm from "@/components/forms/create-token-form";
import CreateWebhookForm from "@/components/forms/create-webhook-form";
import Tokens from "./_components/tokens";
import TabsNav from "./_components/tabs-nav";
import Webhooks from "./_components/webhooks";

import DeleteAccountAlert from "@/components/modals/delete-account-alert";

const SettingsPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { tab = "profile" } = searchParams;
  return (
    <div className="grid gap-6">
      <div className="flex-none space-y-0.5">
        <h1 className="text-2xl font-semibold truncate">Profile & Setting</h1>
        <p className="truncate text-muted-foreground">
          Manage your profile and settings
        </p>
      </div>

      <Tabs value={tab} className="grid grid-cols-7 gap-6">
        <TabsNav />

        <TabsContent
          value="profile"
          className="col-span-7 md:col-span-5 mt-0 space-y-6"
        >
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorBoundary
                suspenseFallback={<PageSpinner className="h-96" />}
              >
                <Profile />
              </ErrorBoundary>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Permanently delete your account, links and their respective
                stats. Please proceed with caution as account deletion cannot be
                undone.
              </CardDescription>
            </CardHeader>
            <CardContent className="border-t py-4 text-right">
              <DeleteAccountAlert />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="tokens"
          className="col-span-7 md:col-span-5 mt-0 space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Create New Token</CardTitle>
              <CardDescription>
                Enter a unique name for your API token to differentiate it from
                other keys.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateTokenForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Tokens</CardTitle>
              <CardDescription>
                API tokens allow other apps to access your account. Use it with
                caution – do not share your API key with others, or expose it in
                the browser or other client-side code
              </CardDescription>
            </CardHeader>
            <ErrorBoundary suspenseFallback={<PageSpinner className="h-96" />}>
              <Tokens />
            </ErrorBoundary>
          </Card>
        </TabsContent>
        <TabsContent
          value="webhooks"
          className="col-span-7 md:col-span-5 mt-0 space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Create New Webhooks</CardTitle>
              <CardDescription>
                You can use webhook subscriptions to receive notifications about
                particular events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateWebhookForm />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>
                API keys allow other apps to access your account. Use it with
                caution – do not share your API key with others, or expose it in
                the browser or other client-side code
              </CardDescription>
            </CardHeader>
            <ErrorBoundary suspenseFallback={<PageSpinner className="h-96" />}>
              <Webhooks />
            </ErrorBoundary>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
