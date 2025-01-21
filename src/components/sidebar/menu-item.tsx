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
        "rounded-full p-3",
        current == path ? "bg-primary text-black" : "text-white",
        className
      )}
      href={path ? `/${path}` : "#"}
    >
      {icon}
    </Link>
  );
};

export default MenuItem;
