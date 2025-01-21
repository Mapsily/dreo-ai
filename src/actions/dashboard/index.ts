"use server";

import { client } from "@/lib/prisma";

export const getTotalLeads = async () => {
  try {
    const leadsCount = await client.prospect.count({
      where: { stage: "BOOKED" },
    });
    return { status: 200, data: leadsCount };
  } catch (error) {
    return { status: 500, error: "Error fetching leads count" };
  }
};

export const getConversionRate = async () => {
  try {
    const passedCount = await client.conversation.count({
      where: { result: "PASSED" },
    });

    const totalCount = await client.conversation.count();

    const conversionRate = totalCount
      ? Math.round((passedCount / totalCount) * 100)
      : 0;

    return {
      status: 200,
      data: {
        conversionRate,
      },
    };
  } catch (error) {
    return { status: 500, error: "Error fetching conversion rate" };
  }
};

export const getCoversationsOverview = async () => {
  try {
    const conversations = await client.conversation.findMany({
      select: {
        id: true,
        prospect: {
          select: {
            name: true,
          },
        },
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return { status: 200, data: conversations };
  } catch (error) {
    return { status: 500, error: "Error fetching conversations" };
  }
};

