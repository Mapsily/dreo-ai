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
        {SETTINGS_TABS.map(({ icon: Icon, label, path }) => (
          <Link
            key={label}
            href={`/dashboard/settings/${path}`}
            className={clsx(
              "flex items-center gap-4 px-4 pr-28 py-2 rounded-md text-sm",
              current === path
                ? "bg-black/5 text-black"
                : "text-black hover:bg-black/5"
            )}
          >
            <Icon />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};
