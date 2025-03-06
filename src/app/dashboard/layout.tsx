import React from "react";
import { redirect } from "next/navigation";

import SideBar from "@/components/shared/sidebar";
import NavBar from "@/components/shared/navbar";
import { getUser } from "@/actions/auth";
import { OutreachContextProvider } from "@/context/outreach-provider";
import OutreachSheet from "@/components/shared/outreach-sheet";
import { CreditContextProvider } from "@/context/credit-provider";
import { getSubscription } from "@/actions/setting";
import CreditUpdater from "@/components/shared/credit-updater";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const { data: user } = await getUser();
  if (!user?.isOnboarded) redirect("/success");
  const { data: subscription } = await getSubscription(user.clerkId);

  return (
    <CreditContextProvider>
      <OutreachContextProvider>
        <CreditUpdater subscription={subscription} />
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
    </CreditContextProvider>
  );
};

export default DashboardLayout;
