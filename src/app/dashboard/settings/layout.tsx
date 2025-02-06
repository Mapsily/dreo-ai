import React from "react";
import { SettingTabs } from "@/components/settings/setting-tabs";

type Props = {
  children: React.ReactNode;
};

const TabsLayout = async ({ children }: Props) => {
  return (
    <div className="h-full flex gap-8 overflow-y-auto">
      <SettingTabs />
      {children}
    </div>
  );
};

export default TabsLayout;
