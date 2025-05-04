"use server";

import { client } from "@/lib/prisma";
import { getUser } from "../auth";

export const getPlans = async () => {
  try {
    const plans = await client.plan.findMany({});
    return { status: 200, data: plans };
  } catch (error) {
    return { status: 500, error: "Error fethching plans" };
  }
};

export const createSubscription = async (planId: string) => {
  try {
    const plan = await client.plan.findUnique({ where: { id: planId } });
    if (!plan) return { status: 500, error: "Plan not found" };
    const { data: user } = await getUser();
    if (!user) return { status: 500, error: "UnAuthorised" };
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + plan?.duration);
    await client.subscription.create({
      data: {
        userId: user.id,
        planId: plan.id,
        expiresAt,
        status: "ACTIVE",
        autoRenew: plan.autoRenew,
        minutesLeft: plan.minutes,
      },
    });
    return { status: 200, message: "Subscription created" };
  } catch (error) {
    return { status: 500, error: "Error fethching plans" };
  }
};

export const upgradeSubscription = async (planId: string) => {
  try {
    const plan = await client.plan.findUnique({ where: { id: planId } });
    if (!plan) return { status: 404, error: "Plan not found" };
    const { data: user } = await getUser();
    if (!user) return { status: 404, error: "UnAuthorised" };
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + plan?.duration);
    await client.subscription.update({
      where: {
        userId: user.id,
      },
      data: {
        planId: plan.id,
        expiresAt,
        status: "ACTIVE",
        minutesLeft: plan.minutes,
        dailyUsed: 0,
      },
    });
    return { status: 200, message: "Subscription updated" };
  } catch (error) {
    return { status: 500, error: "Error updating subscription" };
  }
};
