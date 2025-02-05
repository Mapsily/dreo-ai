"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const onCompleteUserRegistration = async (
  name: string,
  email: string,
  clerkId: string
) => {
  try {
    const registered = await client.user.create({
      data: {
        name,
        email,
        clerkId,
      },
      select: {
        name: true,
        email: true,
        id: true,
      },
    });

    if (registered) {
      return { status: 200, user: registered };
    }
  } catch (error) {
    return { status: 400 };
  }
};

export const getUser = async () => {
  const user = await currentUser();
  if (!user) return { status: 404, user: null };
  else {
    try {
      const authenticated = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          name: true,
          id: true,
        },
      });
      return { status: 200, user: authenticated };
    } catch (error) {
      return { status: 400, user: null };
    }
  }
};
