import React from "react";
import { SettingTabs } from "@/components/settings/setting-tabs";
import { currentUser } from "@clerk/nextjs/server";
import InfoBar from "@/components/infobar";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const TabsLayout = async ({ children }: Props) => {
  const authenticated = await currentUser();
  if (!authenticated) return redirect("/");

  return (
    <div className="h-full flex gap-8">
      <SettingTabs />
      <div className="w-full">
        <InfoBar />
        <div className="overflow-y-auto h-[85%]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TabsLayout;
