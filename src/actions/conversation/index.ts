"use server";

import { client } from "@/lib/prisma";

export const getConversations = async (clerkId: string) => {
  try {
    const conversations = await client.conversation.findMany({
      where: {
        prospect: {
          user: {
            clerkId,
          },
        },
      },
      include: {
        prospect: true,
      },
    });
    return { status: 200, data: conversations };
  } catch (error) {
    return { status: 500, message: "Error fetching conversations" };
  }
};
