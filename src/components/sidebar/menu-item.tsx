import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { JSX } from "react";

type Props = {
  label: string;
  icon: JSX.Element;
  path?: string;
  current?: string;
  onSignOut?(): void;
  className?: string;
};

const MenuItem = ({ path, icon, current, onSignOut, className }: Props) => {
  return (
    <Link
      onClick={onSignOut}
      className={cn(
        "p-2 rounded-md hover:text-black",
        current == path ? "bg-primary" : "text-gray-600",
        className
      )}
      href={path ? `/dashboard/${path}` : "#"}
    >
      {icon}
    </Link>
  );
};

export default MenuItem;
