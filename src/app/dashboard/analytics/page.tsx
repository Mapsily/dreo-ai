import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Calendar, Phone, ChartLine, UserCheck, User } from "lucide-react";

import ProspectOverview from "@/components/analytics/prospect-overview";
import DashboardCard from "@/components/analytics/dashboard-card";
import ConversationOverview from "@/components/analytics/conversation-overview";
import InfoBar from "@/components/shared/infobar";
import { fetchAnalytics } from "@/actions/analytic";
import { OutreachSheetButton } from "@/components/shared/outreach-sheet";
import { getDirection } from "@/lib/utils";

const AnalyticsPage = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");

  const { data } = await fetchAnalytics(clerkUser.id);
  if (!data) {
    return null;
  }

  const {
    todayProspectCount,
    prospectCTY,
    activeProspectCTY,
    callCTY,
    conversionCTY,
    lastWeekCalls,
    todayActiveProspect,
    todaysPassedProspects,
    todayCallCount,
    todayConversionRate,
  } = data;

  return (
    <div className="w-full flex-1 p-8">
      <InfoBar Actions={<OutreachSheetButton />} />
      <div className="grid grid-cols-4 gap-5">
        <DashboardCard
          value={todayProspectCount || 0}
          percentage={prospectCTY || 0}
          direction={getDirection(prospectCTY)}
          title="New Prospects"
          icon={<User size={20} />}
        />
        <DashboardCard
          value={todayCallCount || 0}
          percentage={callCTY || 0}
          direction={getDirection(callCTY)}
          title="Today's Calls"
          icon={<Phone size={20} />}
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
        <ProspectOverview prospects={todaysPassedProspects || []} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
