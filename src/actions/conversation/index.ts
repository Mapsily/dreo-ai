"use server";

import { client } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getConversations = async () => {
  return await client.conversation.findMany();
};

// create
export const createConversation = async (
  data: Prisma.ConversationCreateInput
) => {
  return await client.conversation.create({
    data,
  });
};

// update
export const updateConversation = async (
  where: Prisma.ConversationWhereUniqueInput,
  data: Prisma.ConversationUpdateInput
) => {
  return await client.conversation.update({
    where,
    data,
  });
};