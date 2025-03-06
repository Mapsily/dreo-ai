import { cn } from "@/lib/utils";
import { format, isToday } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import type { Appointment } from "./appointment-view";

interface DayContentProps {
  day: Date;
  appointments: Appointment[];
}

export function DayContent({ day, appointments }: DayContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isSelected = searchParams.get("date") === day.toLocaleDateString();

  const handleClick = () => {
    const sp = new URLSearchParams(searchParams);
    sp.set("date", day.toLocaleDateString());
    router.replace(`/dashboard/appointments?${sp.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div
      onClick={handleClick}
      key={day.toString()}
      className={cn(
        "bg-white p-3 min-h-[120px] border rounded-md flex flex-col justify-between",
        "hover:bg-gray-200 cursor-pointer",
        isSelected && "bg-gray-200"
      )}
    >
      <div className="flex items-center justify-between">
        <time
          dateTime={format(day, "yyyy-MM-dd")}
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full",
            isToday(day) && "bg-primary text-primary-foreground font-semibold"
          )}
        >
          {format(day, "d")}
        </time>
        <span
          className={cn(
            "text-xs bg-primary p-px px-1 rounded-md",
            !appointments.length && "bg-gray-100"
          )}
        >
          {appointments.length}
        </span>
      </div>
      <div className="space-y-1">
        {appointments.slice(0, 2).map((appointment, index) => (
          <p key={index} className="text-xs">
            {appointment.prospect.name}
          </p>
        ))}
        {appointments.length > 2 && (
          <p className="text-xs text-muted-foreground">
            and {appointments.length - 2} more
          </p>
        )}
        {!appointments.length && (
          <p className="text-xs text-muted-foreground">No scheduled</p>
        )}
      </div>
    </div>
  );
}
