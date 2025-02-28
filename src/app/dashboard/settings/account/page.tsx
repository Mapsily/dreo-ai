import { getAccountSettings, getSubscription } from "@/actions/setting";
import ChangePassword from "@/components/settings/change-password";
import SubscriptionCard from "@/components/settings/subscription-card";
import UserProfileForm from "@/components/settings/user-profile-form";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

const Settings = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");
  const accountRes = await getAccountSettings(clerkUser.id);
  const subscriptionRes = await getSubscription(clerkUser.id);

  return (
    <div className="flex flex-col gap-8 w-2/3">
      <UserProfileForm defaultValues={accountRes.data} />
      <ChangePassword />
      <SubscriptionCard subscription={subscriptionRes.data} />
    </div>
  );
};

export default Settings;
