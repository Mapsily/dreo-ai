"use client";

import { Plan } from "@prisma/client";
import PlanCard from "./plan-card";
import PricingSelector from "./pricing-selector";
import { useSearchParams } from "next/navigation";

type Props = {
  plans: Plan[];
  subscribedPlanId?: string;
};

export default function Plans({ plans = [], subscribedPlanId }: Props) {
  const searchParams = useSearchParams();
  const pricing = searchParams.get("pricing");
  
  return (
    <div className="mt-8">
      <h3 className="mb-6 text-sm font-medium">Plans & Pricing</h3>
      <div className="flex flex-col items-center gap-6">
        <PricingSelector />
        <div className="grid grid-cols-4 gap-4">
          {plans.map((p) => (
            <PlanCard
              key={p.name}
              {...p}
              isPurchased={subscribedPlanId === p.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
