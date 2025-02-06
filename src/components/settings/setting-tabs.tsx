"use client";

import { SETTINGS_TABS } from "@/constants/menu";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

export const SettingTabs = () => {
  const pathname = usePathname();
  const current = pathname.split("/").pop();

  return (
    <div>
      <h3 className="font-bold text-3xl mb-8">Settings</h3>
      <nav className="flex flex-col gap-4">
        {SETTINGS_TABS.map((tab) => (
          <Link
            key={tab.label}
            href={`/dashboard/settings/${tab.path}`}
            className={clsx(
              "flex items-center gap-4 px-4 pr-28 py-2 rounded-md text-sm",
              current === tab.path
                ? "bg-gray-200 text-black"
                : "text-black hover:bg-gray-100"
            )}
          >
            {tab.icon} {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};
