
import { useRouter } from "next/navigation";
import React from "react";

import { useCreditContext } from "@/context/credit-provider";

type Props = {
  min: boolean;
};

export const CreditProgress = ({ min = false }: Props) => {
  const router = useRouter();
  const { subscription } = useCreditContext();

  const handleClick = () => {
    router.push("/dashboard/plan");
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer flex flex-col gap-1 ${
        min ? "items-center" : "items-start"
      } w-full p-2 rounded-sm bg-lime-200`}
    >
      {!min && <p className="text-xs font-light">Credits</p>}
      <h2 className="font-semibold text-xl">
        {min ? "*" : `* ${subscription?.minutesLeft} min`}
      </h2>
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-center text-sm">
          {subscription?.dailyUsed}/ {min && <br />}
          <span>{subscription?.plan.perDay}</span>{" "}
          {min ? "" : " called today"}
        </div>
      </div>
    </div>
  );
};
