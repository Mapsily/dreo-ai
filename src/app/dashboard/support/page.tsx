import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

import InfoBar from "@/components/shared/infobar";
import { getSupportTickets } from "@/actions/support";
import NoItemsLayout from "@/components/shared/no-items-layout.tsx";
import AddTicketDailog from "@/components/support/add-ticket-dialog";
import SupportHeader from "@/components/support/support-header";
import TicketView from "@/components/support/ticket-view";

const ProspectsPage = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");
  const { data } = await getSupportTickets(clerkUser.id);

  return (
    <div className="p-8">
      <InfoBar Actions={!!data?.length && <AddTicketDailog />} />
      {!!data?.length && (
        <div className="mt-4 space-y-8">
          <SupportHeader />
          <TicketView tickets={data} />
        </div>
      )}
      {!data?.length && (
        <NoItemsLayout
          description="If you ever need help, you can raise a support ticket, and our team will be here to assist you."
          imageUrl="/images/no-support.png"
          title="No active requests"
          Actions={<AddTicketDailog />}
        />
      )}
    </div>
  );
};

export default ProspectsPage;
