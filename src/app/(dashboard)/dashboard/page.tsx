import AppointmentOverview from "@/components/dashboard/appointment-overview";
import DashboardCard from "@/components/dashboard/cards";
import ConversationOverview from "@/components/dashboard/conversation-overview";
import InfoBar from "@/components/infobar";
import { Separator } from "@/components/ui/separator";
import {
  CircleUser,
  User,
  Calendar,
  CirclePercent,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardPage = async () => {
  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0">
        <div className="grid grid-cols-4 gap-5">
          <DashboardCard value={0} title="Prospects" icon={<User />} />
          <DashboardCard
            value={0}
            title="Leads Generated"
            icon={<CircleUser />}
          />
          <DashboardCard value={0} title="Appointments" icon={<Calendar />} />
          <DashboardCard
            value={0}
            title="Converstions"
            icon={<CirclePercent />}
          />
        </div>
        <div className="w-full grid gap-6 grid-cols-1 lg:grid-cols-2 py-10">
          <ConversationOverview />
          <AppointmentOverview />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
