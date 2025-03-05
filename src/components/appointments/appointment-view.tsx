"use client";

import { useSearchParams } from "next/navigation";
import { Prisma } from "@prisma/client";

import Calendar from "@/components/appointments/calendar";
import AppointmentTable from "./appointment-table";
import { deleteAppointment } from "@/actions/appointment";
import { useToast } from "@/hooks/use-toast";

export type Appointment = Prisma.AppointmentGetPayload<{
  include: {
    prospect: true;
  };
}>;

type Props = {
  appointments: Appointment[];
};

export default function AppointmentView({ appointments }: Props) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const layout = searchParams.get("layout");

  const onDelete = async (appointmentId: string) => {
    const res = await deleteAppointment(appointmentId);
    if (res.status === 200) {
      toast({ title: "Success", description: res.message });
    } else {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    }
  };

  if (!appointments?.length) {
    return null;
  }

  if (layout === "grid") {
    return <Calendar onDelete={onDelete} appointments={appointments} />;
  }

  return <AppointmentTable onDelete={onDelete} appointments={appointments} />;
}
