"use client";

import { Prisma } from "@prisma/client";
import React, { createContext, useContext, useState } from "react";

type Subscription = Prisma.SubscriptionGetPayload<{
  include: { plan: true };
}>;

type CreditContextType = {
  subscription: Subscription | undefined;
  setSubscription: React.Dispatch<
    React.SetStateAction<Subscription | undefined>
  >;
};

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const CreditContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [subscription, setSubscription] = useState<Subscription | undefined>(
    undefined
  );

  return (
    <CreditContext.Provider
      value={{
        subscription,
        setSubscription,
      }}
    >
      {children}
    </CreditContext.Provider>
  );
};

export const useCreditContext = () => {
  const context = useContext(CreditContext);
  if (!context) {
    throw new Error(
      "useCreditContext must be used within an CreditContextProvider"
    );
  }
  return context;
};
