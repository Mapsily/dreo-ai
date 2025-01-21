import React from "react";
import BreadCrumb from "./bread-crumb";
import { UserButton } from "@clerk/nextjs";

const InfoBar = () => {
  return (
    <div className="flex w-full justify-between items-center py-1 mb-8 ">
      <BreadCrumb />
      <UserButton />
    </div>
  );
};

export default InfoBar;
