import AppointmentOverview from "@/components/analytics/appointment-overview";
import DashboardCard from "@/components/analytics/dashboard-card";
import ConversationOverview from "@/components/analytics/conversation-overview";
import { Calendar, Phone, ChartLine, UserCheck } from "lucide-react";
import InfoBar from "@/components/shared/infobar";
import { fetchAnalytics } from "@/actions/analytic";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import OutreachSheet from "@/components/analytics/outreach-sheet";
import React from "react";
import { getDirection } from "@/lib/utils";

const AnalyticsPage = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");

  const {
    todayCallCount,
    callCTY,
    appointmentCTY,
    todayAppointmentCount,
    conversionCTY,
    todayConversionRate,
    activeProspectCTY,
    todayActiveProspect,
    todaysAppointments,
    lastWeekCalls,
  } = await fetchAnalytics(clerkUser.id);

  return (
    <div className="w-full flex-1 p-8">
      <InfoBar Actions={<OutreachSheet />} />
      <div className="grid grid-cols-4 gap-5">
        <DashboardCard
          value={todayCallCount || 0}
          percentage={callCTY || 0}
          direction={getDirection(callCTY)}
          title="Total Calls"
          icon={<Phone size={20} />}
        />
        <DashboardCard
          value={todayAppointmentCount || 0}
          percentage={appointmentCTY || 0}
          direction={getDirection(appointmentCTY)}
          title="Appointments Booked"
          icon={<Calendar size={20} />}
        />
        <DashboardCard
          value={`${todayConversionRate}%` || 0}
          percentage={conversionCTY || 0}
          direction={getDirection(conversionCTY)}
          title="Conversion Rate"
          icon={<ChartLine size={20} />}
        />
        <DashboardCard
          value={todayActiveProspect || 0}
          percentage={activeProspectCTY || 0}
          direction={getDirection(activeProspectCTY)}
          title="Active Prospects"
          icon={<UserCheck size={20} />}
        />
        <ConversationOverview conversations={lastWeekCalls || []} />
        <AppointmentOverview appointments={todaysAppointments || []} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
