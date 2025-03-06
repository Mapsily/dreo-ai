"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { Menu } from "./menu";

const SideBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      animate={{ width: open ? 256 : 100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white p-2 h-full fill-mode-forwards border-r"
    >
      <Menu open={open} setOpen={setOpen} />
    </motion.div>
  );
};

export default SideBar;
