import { getAccountSetting } from "@/actions/settings";
import ChangePassword from "@/components/settings/change-password";
import SubscriptionCard from "@/components/settings/subscription-card";
import UserProfileForm from "@/components/settings/user-profile-form";

import React from "react";

const Settings = async () => {
  const res = await getAccountSetting();

  return (
    <div className="flex flex-col gap-8 w-2/5">
      <UserProfileForm user={res?.data} />
      <ChangePassword/>
      <SubscriptionCard/>
    </div>
  );
};

export default Settings;
