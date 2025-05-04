"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

type Props = {
  Icon: React.ReactNode;
  path: string;
};

export default function NavbarLink({ path, Icon }: Props) {
  const pathname = usePathname();
  const current = pathname.split("/dashboard/")[1];

  return (
    <Link
      className={cn(
        "flex gap-4 items-center py-2 rounded-md hover:text-black",
        current?.includes(path) ? "bg-primary" : "text-gray-600"
      )}
      href={path ? `/dashboard/${path}` : "#"}
    >
      {Icon}
    </Link>
  );
}
