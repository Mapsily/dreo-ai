"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const onCompleteUserRegistration = async (
  fullname: string,
  email: string,
  clerkId: string,
  type: string
) => {
  try {
    const registered = await client.user.create({
      data: {
        fullname,
        email,
        clerkId,
        type,
      },
      select: {
        fullname: true,
        email: true,
        id: true,
        type: true,
      },
    });

    if (registered) {
      return { status: 200, user: registered };
    }
  } catch (error) {
    return { status: 400 };
  }
};

export const onLoginUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/auth/sign-in");
  else {
    try {
      const authenticated = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          fullname: true,
          id: true,
          type: true,
        },
      });
      if (authenticated) {
        return { status: 200, user: authenticated };
      }
    } catch (error) {
      return { status: 400 };
    }
  }
};
