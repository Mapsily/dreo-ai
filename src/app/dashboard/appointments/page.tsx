import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { PhoneForwarded } from "lucide-react";
import React from "react";

import InfoBar from "@/components/shared/infobar";
import { getAppointments } from "@/actions/appointment";
import NoItemsLayout from "@/components/shared/no-items-layout.tsx";
import { Button } from "@/components/ui/button";
import AppointmentHeader from "@/components/appointments/appointment-header";
import AppointmentView from "@/components/appointments/appointment-view";

type Props = {
  searchParams: Promise<{ layout: "grid" | "list"; q: string }>;
};

const AppointmentsPage = async ({ searchParams }: Props) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");
  const { layout, q } = await searchParams;
  const { data } = await getAppointments(clerkUser.id);

  return (
    <div className="p-8">
      <InfoBar />

      {data && !!data.length && (
        <>
          <AppointmentHeader />
          <div className="mt-8">
            <AppointmentView appointments={data} layout={layout} q={q} />
          </div>
        </>
      )}
      {!data?.length && (
        <NoItemsLayout
          description="Start an outreach and Let the AI book appointments for you!"
          imageUrl="/images/no-appointments.png"
          title="Your scheduled meetings will appear here. "
          Actions={
            <Button variant="outline">
              <PhoneForwarded /> Start Outreach
            </Button>
          }
        />
      )}
    </div>
  );
};

export default AppointmentsPage;
