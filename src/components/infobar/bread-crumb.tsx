"use client";

import { usePathname } from "next/navigation";
import React from "react";

const BreadCrumb = () => {
  const pathname = usePathname();
  const page = pathname.split("/").pop();

  return (
    <div className="flex flex-col ">
      <div className="flex gap-5 items-center">
        <h2 className="text-3xl font-bold capitalize">{page}</h2>
      </div>
      <p className="text-gray-500 text-sm">
        {page == "settings"
          ? "Manage your account settings, preferences and integrations"
          : page == "dashboard"
          ? "A detailed overview of your metrics, usage, customers and more"
          : page == "appointment"
          ? "View and edit all your appointments"
          : page == "email-marketing"
          ? "Send bulk emails to your customers"
          : page == "integration"
          ? "Connect third-party applications into Corinna-AI"
          : page == "agent"
          ? "Configure and manage settings for your AI agents handling calls."
          : page == "script"
          ? "Set up and customize conversation scripts for your AI agents."
          : page == "advanced"
          ? "Tune advanced settings for your agent behavior."
          : "Manage your dashboard preferences and settings."}
      </p>
    </div>
  );
};

export default BreadCrumb;
