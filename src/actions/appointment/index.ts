"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getUserAppointments = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const bookings = await client.appointment.count({
        where: {
          prospect: {
            user: {
              clerkId: user.id,
            },
          },
        },
      });

      return { status: 200, data: bookings };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Error fetching appoinments" };
  }
};
