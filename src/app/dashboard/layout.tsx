import React from "react";
import SideBar from "@/components/shared/sidebar";
import NavBar from "@/components/shared/navbar";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
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
