"use client";

import { useCreditContext } from "@/context/credit-provider";
import { Prisma } from "@prisma/client";
import { useEffect } from "react";

type Subscription = Prisma.SubscriptionGetPayload<{
  include: { plan: true };
}>;

type Props = {
  subscription?: Subscription | null;
};

export default function CreditUpdater({ subscription }: Props) {
  const { setSubscription } = useCreditContext();

  useEffect(() => {
    if (!subscription) return;
    setSubscription(subscription);
  }, [subscription]);

  return null
}
