"use client";

import { Plan } from "@prisma/client";

import PlanCard from "./plan-card";

type Props = {
  plans: Plan[];
  subscribedPlanId?: string;
};

export default function PlanList({ plans = [], subscribedPlanId }: Props) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className={`grid grid-cols-${plans.length} gap-4`}>
        {plans.map((p) => (
          <PlanCard
            key={p.name}
            {...p}
            isPurchased={subscribedPlanId === p.id}
          />
        ))}
      </div>
    </div>
  );
}
