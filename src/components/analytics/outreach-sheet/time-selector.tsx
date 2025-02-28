import { TimePicker } from "@/components/shared/time-picker";
import { Clock } from "lucide-react";
import { useState } from "react";

export default function TimeSelect() {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <div>
      <div className="flex gap-2 mb-2">
        <Clock />
        <span>
          <h3  className="font-medium">Select start time</h3>
          <p className="text-sm text-gray-400 mb-2">
            Select date and time, AI agent will contract the prospects on this
            date and time.
          </p>
          <TimePicker date={date} setDate={(d) => d && setDate(d)} />
        </span>
      </div>
     
      <div className="flex gap-2 mt-8 mb-2">
        <Clock />
        <span>
          <h3   className="font-medium">Select end time</h3>
          <p className="text-sm text-gray-400 mb-2">
            Select date and time, AI agent will contract the prospects on this
            date and time.
          </p>
          <TimePicker date={date} setDate={(d) => d && setDate(d)} />
        </span>
      </div>
     
    </div>
  );
}
