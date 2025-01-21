import React, { JSX } from "react";

type Props = {
  title: string;
  value: number;
  icon: JSX.Element;
};

const DashboardCard = ({ icon, title, value }: Props) => {
  return (
    <div className="rounded-2xl flex flex-col gap-3 p-8 bg-cream dark:bg-black">
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="font-bold text-xl">{title}</h2>
      </div>
      <p className="font-bold text-4xl">{value}</p>
    </div>
  );
};

export default DashboardCard;
