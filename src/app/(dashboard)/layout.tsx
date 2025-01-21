import React from "react";
import SideBar from "@/components/sidebar";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  children: React.ReactNode;
};

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await currentUser();

  if (!authenticated) return null;

  return (
    <div className="flex gap-8 h-screen w-full bg-muted p-4">
      <SideBar />
      <div className="flex flex-col w-full">{children}</div>
    </div>
  );
};

export default OwnerLayout;
