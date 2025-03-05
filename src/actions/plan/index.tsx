"use server";

import { client } from "@/lib/prisma";

export const getPlans = async (clerkId: string) => {
  try {
    const plans = await client.plan.findMany({});
    return { status: 200, data: plans };
  } catch (error) {
    return { status: 500, error: "Error fethching plans" };
  }
};
