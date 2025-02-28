"use client";

import React, { useState } from "react";
import { Menu } from "./menu";

const SideBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white p-2 h-full fill-mode-forwards border-r">
      <Menu open={open} setOpen={setOpen} />
    </div>
  ); 
};

export default SideBar;
