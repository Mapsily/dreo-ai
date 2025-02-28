"use server";

import { client } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const onAddProspect = async (data: Prisma.ProspectCreateInput) => {
  try {
    await client.prospect.create({ data });
    return { status: 200, message: "Prospect added" };
  } catch (error) {
    return { status: 500, error: "Error adding prospect" };
  }
};

export const getPropects = async (clerkId: string) => {
  try {
    const prospects = await client.prospect.findMany({
      where: {
        user: {
          clerkId,
        },
      },
    });
    return { status: 200, data: prospects };
  } catch (error) {
    return { status: 500, error: "Error fetching prospects" };
  }
};
