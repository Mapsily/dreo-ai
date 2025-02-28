import React from "react";
import { SettingTabs } from "@/components/settings/setting-tabs";

type Props = {
  children: React.ReactNode;
};

const TabsLayout = async ({ children }: Props) => {
  return (
    <div className="h-full flex gap-8 p-8 pr-0">
      <SettingTabs />
      <section className="overflow-y-auto w-full">{children}</section>
    </div>
  );
};

export default TabsLayout;
