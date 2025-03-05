import { TimePicker } from "@/components/shared/time-picker";
import { Clock } from "lucide-react";

export default function TimeSelect() {
  return (
    <div className="flex gap-2 mb-2">
      <Clock />
      <span>
        <h3 className="font-medium">Select time</h3>
        <p className="text-sm text-gray-400 mb-2">
          Select time, AI agent will contract the prospects on this
          time frame.
        </p>
   
      </span>
    </div>
  );
}
