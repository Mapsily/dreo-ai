"use client";

import { Prisma } from "@prisma/client";
import Calendar from "@/components/appointments/calendar";
import AppointmentTable from "./appointment-table";
import { useState } from "react";
import { deleteAppointment } from "@/actions/appointment";
import { useToast } from "@/hooks/use-toast";

export type Appointment = Prisma.AppointmentGetPayload<{
  include: {
    prospect: true;
  };
}>;

type Props = {
  layout: "grid" | "list";
  q: string;
  appointments: Appointment[];
};

export default function AppointmentView({ layout, q, appointments }: Props) {
  const [localAppointments, setLocalAppointments] = useState(appointments);
  const { toast } = useToast();

  const onDelete = async (appointmentId: string) => {
    const res = await deleteAppointment(appointmentId);
    if (res.status === 200) {
      toast({ title: "Success", description: res.message });
      setLocalAppointments((p) => p.filter((a) => a.id !== appointmentId));
    } else {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    }
  };

  if (layout === "grid") {
    return (
      <Calendar onDelete={onDelete} appointments={localAppointments} />
    );
  }

  return <AppointmentTable onDelete={onDelete} appointments={localAppointments} q={q} />;
}
