import React from "react";
import { redirect } from "next/navigation";

import SideBar from "@/components/shared/sidebar";
import NavBar from "@/components/shared/navbar";
import { OutreachContextProvider } from "@/context/outreach-provider";
import OutreachSheet from "@/components/shared/outreach-sheet";
import { CreditContextProvider } from "@/context/credit-provider";
import { getSubscription } from "@/actions/setting";
import CreditUpdater from "@/components/shared/credit-updater";
import { auth } from "@clerk/nextjs/server";
import OutreachUpdater from "@/components/shared/outreach-updater";
import { getOutreachStatus } from "@/actions/prospect";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/auth/sign-in");

  const { data: subscription } = await getSubscription(clerkId);
  if (!subscription) redirect("/plan-select");

  const { data: isOutreachRunning } = await getOutreachStatus(clerkId);

  return (
    <CreditContextProvider>
      <OutreachContextProvider>
        <CreditUpdater subscription={subscription} />
        <OutreachUpdater outreachRunning={isOutreachRunning} />
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
