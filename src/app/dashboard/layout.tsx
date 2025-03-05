import React from "react";
import SideBar from "@/components/shared/sidebar";
import NavBar from "@/components/shared/navbar";
import { getUser } from "@/actions/auth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const res = await getUser();
  if (!res.data?.isOnboarded) redirect("/success");

  return (
    <div className="h-screen w-full bg-gray-50">
      <NavBar />
      <div className="flex h-[calc(100%-5rem)]">
        <SideBar />
        <section className="flex flex-col w-full overflow-y-auto">
          {children}
        </section>
      </div>
    </div>
  );
};

export default DashboardLayout;
