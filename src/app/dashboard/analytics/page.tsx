import AppointmentOverview from "@/components/analytics/appointment-overview";
import AppointmentSuccess from "@/components/analytics/appointment-success";
import DashboardCard from "@/components/analytics/dashboard-card";
import ConversationOverview from "@/components/analytics/conversation-overview";
import ConversationTrends from "@/components/analytics/conversation-trends";
import { Calendar, Phone, ChartLine, UserCheck, ListCollapse, PhoneForwarded } from "lucide-react";
import React from "react";
import InfoBar from "@/components/infobar";
import { Button } from "@/components/ui/button";

const AnalyticsPage = async () => {
  return (
    <div className="overflow-y-auto w-full chat-window flex-1 h-0">
      <InfoBar
        Actions={
          <>
            <Button variant="outline">
              <ListCollapse /> View Calls Results
            </Button>
            <Button>
              <PhoneForwarded /> Start Outreach
            </Button>
          </>
        }
      />
      <div className="grid grid-cols-4 gap-5">
        <DashboardCard
          value={1212}
          percentage={20}
          direction="DOWN"
          title="Total Calls"
          icon={<Phone size={20} />}
        />
        <DashboardCard
          value={0}
          percentage={20}
          direction="UP"
          title="Appointments Booked"
          icon={<Calendar size={20} />}
        />
        <DashboardCard
          value={0}
          percentage={20}
          direction="UP"
          title="Conversion Rate"
          icon={<ChartLine size={20} />}
        />
        <DashboardCard
          value={0}
          percentage={20}
          direction="DOWN"
          title="Active Prospects"
          icon={<UserCheck size={20} />}
        />
        <ConversationOverview />
        <AppointmentOverview />
        <ConversationTrends />
        <AppointmentSuccess />
      </div>
    </div>
  );
};

export default AnalyticsPage;
