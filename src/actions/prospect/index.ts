"use server";

import { client } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const onAddProspect = async (data: Prisma.ProspectCreateInput) => {
  try {
    console.log(data, "Test");

    await client.prospect.create({ data });
    return { status: 200, message: "Prospect Added!" };
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error:', error.message);
    } else {
      console.log('Unknown error:', error);
    }
    return { status: 500, error: "Error add prospect" };
  }
};

export const getPropects = async (userId: string) => {
  try {
    const prospects = await client.prospect.findMany({
      where: {
        userId,
      },
    });
    return { status: 200, data: prospects };
  } catch (error) {
    return { status: 500, error: "Error fetching prospects list" };
  }
};
