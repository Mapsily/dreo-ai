import { cn } from "@/lib/utils";
import React from "react";
import { Menu } from "./menu";

const SideBar = () => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-black rounded-full p-2 h-full fill-mode-forwards fixed md:relative"
      )}
    >
      <Menu />
    </div>
  );
};

export default SideBar;
