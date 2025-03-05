"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayContent } from "./day-content";
import { Button } from "@/components/ui/button";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  parse,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import AppointmentsPanel from "./appointment-panel";
import { useSearchParams } from "next/navigation";
import type { Appointment } from "./appointment-view";

type Props = {
  appointments: Appointment[];
  onDelete: (id: string) => Promise<void>;
};

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Calendar = ({ appointments, onDelete }: Props) => {
  const searchParams = useSearchParams();
  const selectedDate = searchParams.get("date");

  const [currentMonth, setCurrentMonth] = React.useState(
    format(new Date(), "MMM-yyyy")
  );

  const selectedAppointments = appointments.filter(
    (a) => a.scheduledFor.toLocaleDateString() === selectedDate
  );

  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(firstDayCurrentMonth)),
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="flex gap-4 items-center justify-center">
        <Button variant="ghost" className="mr-2" onClick={previousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </h2>
        <Button variant="ghost" className="ml-2" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-2">
        <div className="w-full grid grid-cols-7 gap-px text-center text-sm text-gray-600">
          {DAYS.map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
          {days.map((day, dayIdx) => (
            <DayContent
              key={dayIdx}
              day={day}
              appointments={appointments.filter(
                (a) =>
                  a.scheduledFor.toLocaleDateString() ===
                  day.toLocaleDateString()
              )}
            />
          ))}
        </div>
        {selectedDate && (
          <AppointmentsPanel
            selectedAppointments={selectedAppointments}
            handleDeleteAppointment={onDelete}
            selectedDate={selectedDate}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
