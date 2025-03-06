"use server";

import { client } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

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
  noStore()
  try {
    const { userId } = await auth();
    if (!userId) return { status: 404, data: null };
    const user = await client.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    return { status: 200, data: user };
  } catch (error) {
    return { status: 500, error: (error as Error).message };
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
