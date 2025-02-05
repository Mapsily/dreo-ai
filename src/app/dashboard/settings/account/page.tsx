import ChangePassword from "@/components/settings/change-password";
import DarkModetoggle from "@/components/settings/dark-mode";
import React from "react";

const Settings = () => {
  return (
    <div className="flex flex-col gap-4">
      <DarkModetoggle />
      <ChangePassword />
    </div>
  );
};

export default Settings;
