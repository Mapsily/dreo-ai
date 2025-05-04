"use server";

import { client } from "@/lib/prisma";
import {
  calculateConversationRate,
  calculatePercentageChange,
} from "@/lib/utils";
import {
  endOfDay,
  endOfYesterday,
  startOfDay,
  startOfYesterday,
  subWeeks,
} from "date-fns";

export async function fetchProspectAnalytics(clerkId: string) {
  const todayProspectCount = await client.prospect.count({
    where: {
      user: {
        clerkId,
      },
      createdAt: {
        gte: startOfDay(new Date()),
        lt: endOfDay(new Date()),
      },
    },
  });

  const yesterdayProspectCount = await client.prospect.count({
    where: {
      user: {
        clerkId,
      },
      createdAt: {
        gte: startOfYesterday(),
        lt: endOfYesterday(),
      },
    },
  });

  // compare to yesterday percentage
  const cty = calculatePercentageChange(
    todayProspectCount,
    yesterdayProspectCount
  );

  return {
    todayProspectCount,
    cty,
  };
}

export async function fetchConversationAnalytics(clerkId: string) {
  const todayCallCount = await client.conversation.count({
    where: {
      prospect: {
        user: {
          clerkId,
        },
      },
      createdAt: {
        gte: startOfDay(new Date()),
        lt: endOfDay(new Date()),
      },
    },
  });

  const yesterdayCallCount = await client.conversation.count({
    where: {
      prospect: {
        user: {
          clerkId,
        },
      },
      createdAt: {
        gte: startOfYesterday(),
        lt: endOfYesterday(),
      },
    },
  });

  // compare to yesterday percentage
  const cty = calculatePercentageChange(todayCallCount, yesterdayCallCount);

  return {
    todayCallCount,
    cty,
  };
}

export async function fetchConversionRateAnalytics(clerkId: string) {
  const yesterdayPassedCount = await client.prospect.count({
    where: {
      user: {
        clerkId,
      },
      status: "PASSED",
      createdAt: {
        gte: startOfYesterday(),
        lt: endOfYesterday(),
      },
    },
  });

  const yesterdayConversationCount = await client.conversation.count({
    where: {
      prospect: {
        user: {
          clerkId,
        },
      },
      createdAt: {
        gte: startOfYesterday(),
        lt: endOfYesterday(),
      },
    },
  });

  const yesterdayConversionRate = calculateConversationRate(
    yesterdayPassedCount,
    yesterdayConversationCount
  );

  return {
    yesterdayConversionRate,
  };
}

export async function fetchActiveProspectAnalytics(clerkId: string) {
  const todayActiveProspectCount = await client.prospect.count({
    where: {
      status: {
        in: ["INITIAL", "RESCHEDULED"],
      },
      user: {
        clerkId: clerkId,
      },
      createdAt: {
        gte: startOfDay(new Date()),
        lt: endOfDay(new Date()),
      },
    },
  });

  const yesterdayActiveProspectCount = await client.prospect.count({
    where: {
      status: {
        in: ["INITIAL", "RESCHEDULED"],
      },
      user: {
        clerkId: clerkId,
      },
      createdAt: {
        gte: startOfYesterday(),
        lt: endOfYesterday(),
      },
    },
  });

  // compare to yesterday percentage
  const cty = calculatePercentageChange(
    todayActiveProspectCount,
    yesterdayActiveProspectCount
  );

  return {
    todayActiveProspectCount,
    cty,
  };
}

export async function fetchLastWeekCalls(clerkId: string) {
  const calls = await client?.conversation.findMany({
    where: {
      createdAt: {
        gte: subWeeks(new Date(), 1),
      },
      prospect: {
        user: {
          clerkId,
        },
      },
    },
    select: {
      prospect: {
        select: {
          name: true,
        },
      },
      status: true,
      endAt: true,
      startAt: true,
      notes: true,
      result:true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return calls;
}

export async function fetchTodaysPassedProspects(clerkId: string) {
  const appointments = await client.prospect.findMany({
    where: {
      updatedAt: {
        gte: startOfDay(new Date()),
        lte: endOfDay(new Date()),
      },
      user: {
        clerkId,
      },
      status: "PASSED",
    },
    orderBy: {
      updatedAt: "asc",
    },
  });

  return appointments;
}

export async function fetchAnalytics(clerkId: string) {
  try {
    const [
      prospects,
      conversations,
      conversionRate,
      activeProspect,
      lastWeekCalls,
      todaysPassedProspects,
    ] = await Promise.all([
      fetchProspectAnalytics(clerkId),
      fetchConversationAnalytics(clerkId),
      fetchConversionRateAnalytics(clerkId),
      fetchActiveProspectAnalytics(clerkId),
      fetchLastWeekCalls(clerkId),
      fetchTodaysPassedProspects(clerkId),
    ]);

    const todayConversionRate = calculateConversationRate(
      todaysPassedProspects.length,
      conversations.todayCallCount
    );

    const conversionCTY = calculatePercentageChange(
      todayConversionRate,
      conversionRate.yesterdayConversionRate
    );

    return {
      status: 200,
      data: {
        todayProspectCount: prospects.todayProspectCount,
        prospectCTY: prospects.cty,
        todayCallCount: conversations.todayCallCount,
        callCTY: conversations.cty,
        todayConversionRate,
        conversionCTY,
        todayActiveProspect: activeProspect.todayActiveProspectCount,
        activeProspectCTY: activeProspect.cty,
        lastWeekCalls,
        todaysPassedProspects,
      },
    };
  } catch (error) {
    return { state: 500, error: (error as Error).message };
  }
}
