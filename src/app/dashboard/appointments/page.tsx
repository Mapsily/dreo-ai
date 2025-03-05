import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

import InfoBar from "@/components/shared/infobar";
import { getAppointments } from "@/actions/appointment";
import NoItemsLayout from "@/components/shared/no-items-layout.tsx";
import AppointmentHeader from "@/components/appointments/appointment-header";
import AppointmentView from "@/components/appointments/appointment-view";
import { OutreachSheetButton } from "@/components/shared/outreach-sheet";

const AppointmentsPage = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");
  const { data: appointments } = await getAppointments(clerkUser.id);
  const isEmpty = !appointments?.length;

  return (
    <div className="p-8">
      <InfoBar />
      {!isEmpty && (
        <div className="mb-8">
          <AppointmentHeader />
        </div>
      )}
      <AppointmentView appointments={appointments || []} />
      {isEmpty && (
        <NoItemsLayout
          description="Start an outreach and Let the AI book appointments for you!"
          imageUrl="/images/no-appointments.png"
          title="Your scheduled meetings will appear here. "
          Actions={<OutreachSheetButton variant="outline" />}
        />
      )}
    </div>
  );
};

export default AppointmentsPage;
