"use client";

import { SETTINGS_TABS } from "@/constants/menu";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const SettingTabs = () => {
  const pathname = usePathname();
  const current = pathname.split("/").pop();

  return (
    <nav className="flex flex-col gap-4">
      {SETTINGS_TABS.map((tab) => (
        <Link
          key={tab.label}
          href={`/settings/${tab.path}`}
          className={clsx(
            "flex items-center gap-4 px-4 py-4 text-sm rounded-2xl hover:bg-black hover:text-white",
            current === tab.path ? "bg-primary text-black" : "text-white"
          )}
        >
          {tab.icon} {tab.label}
        </Link>
      ))}
    </nav>
  );
};
