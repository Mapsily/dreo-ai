"use server";

import { client } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

export const onUpdatePassword = async (password: string) => {
  try {
    const user = await currentUser();

    if (!user) return null;
    const update = await (
      await clerkClient()
    ).users.updateUser(user.id, { password });
    if (update) {
      return { status: 200, message: "Password updated" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetAdvanceSettings = async () => {
  try {
    const user = await currentUser();
    if (!user) return null;

    const settings = await client.setting.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        advanceSetting: true,
      },
    });

    if (settings) {
      return settings;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAccountSetting = async () => {
  try {
    const user = await currentUser();
    const res = await client.user.findFirst({
      where: {
        clerkId: user?.id,
      },
    });
    return { status: 200, data: res };
  } catch (error) {
    return { status: 500, message: "Server Error!" };
  }
};

export const onUpdateAccountSettings = async (
  settings: Prisma.UserUpdateInput
) => {
  try {
    const user = await currentUser();
    if (!user) return null;

    await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        ...settings,
      },
    });

    return { status: 200, message: "Advance settings updated" };
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateAdvanceSettings = async (
  settings: Prisma.AdvanceSettingUpdateInput
) => {
  try {
    const user = await currentUser();
    if (!user) return null;

    const update = await client.setting.update({
      where: {
        userId: user.id,
      },
      data: {
        advanceSetting: {
          update: settings,
        },
      },
    });

    if (update) {
      return { status: 200, message: "Advance settings updated" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetScriptSettings = async () => {
  try {
    const user = await currentUser();
    if (!user) return null;

    const settings = await client.setting.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        scriptSetting: true,
      },
    });

    if (settings) {
      return settings;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateScriptSettings = async (
  settings: Prisma.ScriptSettingUpdateInput
) => {
  try {
    const user = await currentUser();
    if (!user) return null;

    const update = await client.setting.update({
      where: {
        userId: user.id,
      },
      data: {
        scriptSetting: {
          update: settings,
        },
      },
    });

    if (update) {
      return { status: 200, message: "Script settings updated" };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetAgentSettings = async () => {
  try {
    const user = await currentUser();
    if (!user) return null;

    const settings = await client.setting.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        agentSetting: true,
      },
    });

    if (settings) {
      return settings;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateAgentSettings = async (
  settings: Prisma.AgentSettingUpdateInput
) => {
  try {
    const user = await currentUser();
    if (!user) return null;

    const update = await client.setting.update({
      where: {
        userId: user.id,
      },
      data: {
        agentSetting: {
          update: settings,
        },
      },
    });

    if (update) {
      return { status: 200, message: "Agent settings updated" };
    }
  } catch (error) {
    console.log(error);
  }
};
