import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  min: boolean;
};

export const CreditProgress = ({ min = false }: Props) => {
  const router = useRouter();

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
      <h2 className="font-semibold text-xl">{min ? "*" : "* 1050 min"}</h2>
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-center text-sm">
          30 {min && <br />} <span>/120</span> {min ? "" : "min used today"}
        </div>
      </div>
    </div>
  );
};
