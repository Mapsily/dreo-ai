import InfoBar from "@/components/infobar";
import { getUserAppointments } from "@/actions/appointment";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const AppointmentsPage = async () => {
  const user = await currentUser();
  if (!user) redirect("/");

  const res = await getUserAppointments();
  return (
    <>
      <InfoBar />
      <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 h-0 gap-5">
      
      </div>
    </>
  );
};

export default AppointmentsPage;
