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

export async function fetchAppointmentAnalytics(clerkId: string) {
  const todayAppointmentCount = await client.appointment.count({
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

  const yesterdayAppointmentCount = await client.appointment.count({
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
  const cty = calculatePercentageChange(
    todayAppointmentCount,
    yesterdayAppointmentCount
  );

  return {
    todayAppointmentCount,
    cty,
  };
}

export async function fetchConversionRateAnalytics(clerkId: string) {
  const yesterdayAppointmentCount = await client.appointment.count({
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

  const yesterdayConversionRate = calculateConversationRate(
    yesterdayAppointmentCount,
    yesterdayCallCount
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
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return calls;
}

export async function fetchTodaysAppointments(clerkId: string) {

  const appointments = await client.appointment.findMany({
    where: {
      scheduledFor: {
        gte: startOfDay(new Date()),
        lte: endOfDay(new Date()),
      },
      prospect: {
        user: {
          clerkId,
        },
      },
    },
    select: {
      scheduledFor: true,
      notes: true,
      prospect: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      scheduledFor: "asc",
    },
  });

  return appointments;
}
