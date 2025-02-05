import React from "react";
import { Menu } from "./menu";

const SideBar = () => {
  return (
    <div className="bg-white p-2 h-full fill-mode-forwards border-r">
      <Menu />
    </div>
  );
};

export default SideBar;
