import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  label: string;
  icon: React.ComponentType;
  path?: string;
  current?: string;
  onSignOut?(): void;
  className?: string;
  min: boolean;
};

const MenuItem = ({
  path,
  icon: Icon,
  current,
  onSignOut,
  className,
  label,
  min,
}: Props) => {
  return (
    <Link
      onClick={onSignOut}
      className={cn(
        "flex gap-4 items-center p-2 rounded-md hover:text-black",
        current == path ? "bg-primary" : "text-gray-600",
        className
      )}
      href={path ? `/dashboard/${path}` : "#"}
    >
      <Icon />
      {!min && label}
    </Link>
  );
};

export default MenuItem;
