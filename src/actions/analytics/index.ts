'use server'

import { client } from '@/lib/prisma'

export async function getAnalyticsData(clerkUser) {
  const user = await client.user.findUnique({ where: { id: clerkUser?.id } });

  const calls = await client.conversation.findMany({
    where: {
      prospectId: user?.id,
    },
    select: {
      result: true,
    },
  });

  const appointments = await client.appointment.findMany({
    where: {
      prospectId: user?.id,
    },
    select: {
      createdAt: true,
      date: true,
    },
  });

  return {
    calls,
    appointments,
  }
}
