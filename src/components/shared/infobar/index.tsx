import React from "react";
import BreadCrumb from "./bread-crumb";

const InfoBar = ({ Actions }: { Actions?: React.ReactNode }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <BreadCrumb />
      {Actions && <div className="flex gap-6">{Actions}</div>}
    </div>
  );
};

export default InfoBar;
