"use server";

import { client } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
    await client.appointment.delete({
      where: {
        id: appointmentId,
      },
    });
    revalidatePath("/dashboard/appointments");
    return { status: 200, message: "Appointment deleted" };
  } catch (error) {
    return { status: 500, message: "Error deleting appointment" };
  }
};
