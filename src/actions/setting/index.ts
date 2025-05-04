"use server";

import { DEFAULT_SETTINGS } from "@/constants/setting";
import { client } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

export const getSettings = async (clerkId: string) => {
  try {
    const settings = await client.setting.findFirst({
      where: {
        user: {
          clerkId,
        },
      },
    });
    if (settings) return { status: 200, data: settings };
    return { status: 404, data: null };
  } catch (error) {
    return { status: 500, message: "Server Error" };
  }
};

export const getAccountSettings = async (clerkId: string) => {
  try {
    const user = await client.user.findFirst({
      where: {
        clerkId,
      },
    });
    return { status: 200, data: user };
  } catch (error) {
    return { status: 500, message: "Server Error" };
  }
};

export const onUpdateAccountSettings = async (
  updates: Prisma.UserUpdateInput
) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) return { status: 401, message: "UnAuthorised" };

    await client.user.update({
      where: {
        clerkId: clerkUser.id,
      },
      data: updates,
    });
    return { status: 200, message: "Account settings updated" };
  } catch (error) {
    return { status: 500, message: "Server Error" };
  }
};

export const onUpdatePassword = async (password: string) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) return { status: 401, message: "UnAuthorised" };
    await (await clerkClient()).users.updateUser(clerkUser.id, { password });
    return { status: 200, message: "Password updated" };
  } catch (error: any) {
    return { status: 500, message: error.errors[0].message };
  }
};

export const onSubscribeToPlan = async (planId: string) => {
  const clerkUser = await currentUser();
  if (!clerkUser) return { status: 401, message: "UnAuthorised" };

  const user = await client.user.findUnique({
    where: { clerkId: clerkUser?.id },
  });

  if (!user) return { status: 401, message: "UnAuthorised" };

  const existingSubscription = await client.subscription.findFirst({
    where: {
      user: {
        clerkId: clerkUser.id,
      },
    },
  });

  const plan = await client.plan.findUnique({ where: { id: planId } });

  if (!plan) return { status: 404, message: "Plan not found" };

  const newExpiry = new Date();
  newExpiry.setDate(newExpiry.getDate() + plan.duration);

  if (existingSubscription) {
    await client.subscription.update({
      where: { userId: user?.id },
      data: {
        planId,
        minutesLeft: plan.minutes,
        expiresAt: newExpiry,
        autoRenew: plan.autoRenew,
        status: "ACTIVE",
      },
    });
    return { status: 200, message: "New plan subscribed" };
  }

  await client.subscription.create({
    data: {
      userId: user?.id,
      planId,
      minutesLeft: plan.minutes,
      expiresAt: newExpiry,
      autoRenew: plan.autoRenew,
      status: "ACTIVE",
    },
  });

  return { status: 200, message: "New plan subscribed" };
};

export const getSubscription = async (clerkId: string) => {
  try {
    const subscription = await client.subscription.findFirst({
      where: {
        user: {
          clerkId,
        },
      },
      include: {
        plan: true,
      },
    });
    if (subscription) return { status: 200, data: subscription };
    return { status: 404, data: subscription };
  } catch (error) {
    return { status: 500, message: "Server Error" };
  }
};

export const getAgentSettings = async (clerkId: string) => {
  try {
    const settings = await client.setting.findFirst({
      where: {
        user: {
          clerkId,
        },
      },
      select: {
        agentSetting: true,
      },
    });
    return { status: 200, data: settings?.agentSetting };
  } catch (error) {
    return { status: 500, message: "Server Error" };
  }
};

export const onUpdateAgentSettings = async (
  updates: Prisma.AgentSettingUpdateInput
) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) return { status: 401, message: "UnAuthorised" };

    const user = await client.user.findFirst({
      where: { clerkId: clerkUser.id },
    });

    if (!user) return { status: 401, message: "UnAuthorised" };

    await client.setting.update({
      where: {
        userId: user.id,
      },
      data: {
        agentSetting: {
          update: updates,
        },
      },
    });

    return { status: 200, message: "Agent settings updated" };
  } catch (error) {
    console.log(error);

    return { status: 500, message: "Server Error" };
  }
};

export const getScriptSettings = async (clerkId: string) => {
  try {
    const settings = await client.setting.findFirst({
      where: {
        user: {
          clerkId,
        },
      },
      select: {
        scriptSetting: true,
      },
    });
    return { status: 200, data: settings?.scriptSetting };
  } catch (error) {
    return { status: 500, message: "Server ErrorF" };
  }
};

export const onUpdateScriptSettings = async (
  updates: Prisma.ScriptSettingUpdateInput
) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) return { status: 401, message: "UnAuthorised" };

    const user = await client.user.findFirst({
      where: { clerkId: clerkUser.id },
    });

    if (!user) return { status: 401, message: "UnAuthorised" };

    await client.setting.update({
      where: {
        userId: user.id,
      },
      data: {
        scriptSetting: {
          update: updates,
        },
      },
    });

    return { status: 200, message: "Script settings updated" };
  } catch (error) {
    return { status: 500, message: "Server Error" };
  }
};

export const getAdvancedSettings = async (clerkId: string) => {
  try {
    const settings = await client.setting.findFirst({
      where: {
        user: {
          clerkId,
        },
      },
      select: {
        advancedSetting: true,
      },
    });
    return { status: 200, data: settings?.advancedSetting };
  } catch (error) {
    return { status: 500, message: "Server Error" };
  }
};

export const onUpdateAdvancedSettings = async (
  update: Prisma.AdvancedSettingUpdateInput
) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) return { status: 401, message: "UnAuthorised" };

    const user = await client.user.findFirst({
      where: { clerkId: clerkUser.id },
    });

    if (!user) return { status: 401, message: "UnAuthorised" };

    await client.setting.update({
      where: {
        userId: user.id,
      },
      data: {
        advancedSetting: {
          update: update,
        },
      },
    });
    return { status: 200, message: "Advance settings updated" };
  } catch (error) {
    return { status: 500, message: "Server Error" };
  }
};

export const setupDefaultSettings = async () => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) return { status: 401, message: "UnAuthorised" };

    const user = await client.user.findFirst({
      where: { clerkId: clerkUser.id },
    });

    if (!user) return { status: 401, message: "UnAuthorised" };

    await client.setting.create({
      data: {
        userId: user.id,
        agentSetting: {
          create: DEFAULT_SETTINGS.agent,
        },
        scriptSetting: {
          create: DEFAULT_SETTINGS.script,
        },
        advancedSetting: {
          create: DEFAULT_SETTINGS.advanced,
        },
      },
    });
    return { status: 200, message: "Setup default settings" };
  } catch (error) {
    return { status: 500, message: "Server Error" };
  }
};
