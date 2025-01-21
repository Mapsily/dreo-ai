"use client";

import { SIDE_BAR_MENU } from "@/constants/menu";

import React from "react";

import { LogOut } from "lucide-react";
import { MenuLogo } from "@/icons/menu-logo";
import MenuItem from "./menu-item";
import { usePathname } from "next/navigation";

export const Menu = () => {
  const pathname = usePathname();
  const current = pathname.split("/");

  return (
    <div className="px-3 py-6 flex flex-col justify-between items-center h-full">
      <MenuLogo />
      <div className="flex flex-col gap-4">
        {SIDE_BAR_MENU.map((menu, key) => (
          <MenuItem {...menu} key={key} current={current[1]} />
        ))}
      </div>
      <MenuItem
        path="log-out"
        label="Sign out"
        icon={<LogOut />}
        onSignOut={() => {}}
        className="bg-muted"
      />
    </div>
  );
};
