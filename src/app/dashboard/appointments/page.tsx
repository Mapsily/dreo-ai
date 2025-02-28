import InfoBar from "@/components/shared/infobar";
import { getAppointments } from "@/actions/appointment";
import Calendar from "@/components/appointments/calendar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const AppointmentsPage = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");
  const { data } = await getAppointments(clerkUser.id);

  return (
    <div className="p-8">
      <InfoBar />
      <Calendar appointments={data || []} />
    </div>
  );
};

export default AppointmentsPage;
