"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

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
    return { status: 400, message: (error as Error).message };
  }
};

export const getUser = async () => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) return { status: 404, data: null };

    const authenticated = await client.user.findFirst({
      where: {
        clerkId: clerkUser.id,
      },
    });

    return { status: 200, data: authenticated };
  } catch (error) {
    return { status: 500, data: null };
  }
};

export const updateUser = async (updates: Prisma.UserUpdateInput) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) return { status: 404, data: null };

    await client.user.update({
      where: { clerkId: clerkUser.id },
      data: updates,
    });

    return { status: 200, message: "User updated" };
  } catch (error) {
    return { status: 500, message: (error as Error).message };
  }
};

export const onOnboardingSkip = async () => {
  const res = await updateUser({ isOnboarded: true });
  if (res.status === 200) redirect("/dashboard");
};
