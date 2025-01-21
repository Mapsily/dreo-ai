import React from "react";
import { ProgressBar } from "../progress";

type PlanUsageProps = {
  plan: "FREE" | "PRO" | "ULTIMATE";
  products: number;
  conversations: number;
};

export const PlanUsage = ({
  plan,
  products,
  conversations,
}: PlanUsageProps) => {
  return (
    <div className="flex flex-col gap-5 py-5">
      <ProgressBar
        end={plan == "FREE" ? 1 : plan == "PRO" ? 2 : 100}
        label="Products"
        credits={products}
      />
      <ProgressBar
        end={plan == "FREE" ? 10 : plan == "PRO" ? 50 : 500}
        label="Conversations"
        credits={conversations}
      />
    </div>
  );
};
