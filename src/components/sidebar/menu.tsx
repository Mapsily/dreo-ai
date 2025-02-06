"use client";

import { SIDE_BAR_MENU } from "@/constants/menu";

import React from "react";

import MenuItem from "./menu-item";
import { usePathname } from "next/navigation";
import { CreditProgress } from "../credit-progress";
import { LogOut } from "lucide-react";

export const Menu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const current = pathname.split("/dashboard/");

  return (
    <div className="px-2 py-4 flex flex-col gap-4 justify-between items-center h-full">
      <div className="flex flex-col gap-4">
        {SIDE_BAR_MENU.map((menu, key) => (
          <MenuItem min={!open} {...menu} key={key} current={current[1]} />
        ))}
      </div>
      <CreditProgress min={!open} />
      <div
        onClick={() => setOpen(!open)}
        className="mr-auto cursor-pointer p-2 rounded-md bg-gray-100"
      >
        <LogOut className={!open ? "" : "rotate-180"}/>
      </div>
    </div>
  );
};
