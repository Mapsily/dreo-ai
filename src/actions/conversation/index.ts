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
      select: {
        prospect: {
          select: {
            name: true,
            phone: true,
          },
        },
        id: true,
        createdAt: true,
        callEndAt: true,
        callStartAt: true,
        recordingUrl: true,
        transcript: true,
        notes: true,
      },
    });
    return { status: 200, data: conversations };
  } catch (error) {
    return { status: 500, message: "Server Error" };
  }
};
