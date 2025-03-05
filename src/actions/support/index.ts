"use server";

import { client } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getSupportTickets = async (clerkId: string) => {
  try {
    const tickets = await client.ticket.findMany({
      where: {
        user: {
          clerkId,
        },
      },
      include: {
        responses: true,
      },
    });
    return { status: 200, data: tickets };
  } catch (error) {
    return { status: 500, message: "Server error" };
  }
};

export const onAddTicket = async (data: Prisma.TicketCreateInput) => {
  try {
    await client.ticket.create({ data });
    return { status: 200, message: "Ticket added" };
  } catch (error) {
    return { status: 500, error: "Error adding ticket" };
  }
};
