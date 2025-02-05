import React from "react";
import SideBar from "@/components/sidebar";
import { currentUser } from "@clerk/nextjs/server";
import DashboardNavBar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const authenticated = await currentUser();
  if (!authenticated) return redirect("/");

  return (
    <div className="h-screen w-full bg-gray-50">
      <DashboardNavBar />
      <div className="flex">
        <SideBar />
        <section className="flex flex-col w-full p-8 overflow-y-auto">
          {children}
        </section>
      </div>
    </div>
  );
};

export default DashboardLayout;
