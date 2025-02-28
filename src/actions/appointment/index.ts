"use server";

import { client } from "@/lib/prisma";

export const getAppointments = async (clerkId: string) => {
  try {
    const bookings = await client.appointment.findMany({
      where: {
        prospect: {
          user: {
            clerkId,
          },
        },
      },
      include: {
        prospect: true,
      },
    });
    return { status: 200, data: bookings };
  } catch (error) {
    return { status: 500, message: "Error fetching appoinments" };
  }
};

export const deleteAppointment = async (appointmentId: string) => {
  try {
    const bookings = await client.appointment.delete({
      where: {
        id: appointmentId,
      },
    });
    return { status: 200, message: "Appointment deleted" };
  } catch (error) {
    return { status: 500, message: "Server Error" };
  }
};
