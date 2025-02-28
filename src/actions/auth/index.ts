"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onCompleteUserRegistration = async (
  firstName: string,
  lastName: string,
  email: string,
  clerkId: string
) => {
  try {
    await client.user.create({
      data: {
        firstName,
        lastName,
        email,
        clerkId,
      },
    });
    return { status: 200, message: "User created" };
  } catch (error) {
    return { status: 400, message: "Error creating user" };
  }
};

export const getUser = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) return { status: 404, data: null };
  else {
    try {
      const authenticated = await client.user.findFirst({
        where: {
          clerkId: clerkUser.id,
        },
      });
      return { status: 200, data: authenticated };
    } catch (error) {
      return { status: 500, data: null };
    }
  }
};
