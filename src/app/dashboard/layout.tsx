import React from "react";
import { redirect } from "next/navigation";

import SideBar from "@/components/shared/sidebar";
import NavBar from "@/components/shared/navbar";
import { getUser } from "@/actions/auth";
import { OutreachContextProvider } from "@/context/outreach-provider";
import OutreachSheet from "@/components/shared/outreach-sheet";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const { data: user } = await getUser();
  if (!user?.isOnboarded) redirect("/success");

  return (
    <OutreachContextProvider>
      <div className="h-screen w-full bg-gray-50">
        <NavBar />
        <div className="flex h-[calc(100%-5rem)]">
          <SideBar />
          <section className="flex flex-col w-full overflow-y-auto">
            {children}
          </section>
        </div>
      </div>
      <OutreachSheet />
    </OutreachContextProvider>
  );
};

export default DashboardLayout;
