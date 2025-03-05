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
          : page == "analytics"
          ? "A detailed overview of your metrics, usage, customers and more"
          : page == "appointments"
          ? "View and edit all your appointments"
          : page == "conversations"
          ? "Send bulk emails to your customers"
          : page == "products"
          ? "A list of all your products/services."
          : page === "support"
          ? "Your support home, raise a ticket and our team will resolve it."
          : page === "plan"
          ? "Check your subscribed plan details"
          : page === "prospects"
          ? "A list of all your contacts of the clients"
          : "Manage your dashboard preferences and settings."}
      </p>
    </div>
  );
};

export default BreadCrumb;
