import LevelView from "@/components/shared/level-view";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Trash2, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type { APPOINTMENT } from "./calendar";
import { useState } from "react";
import { Loader } from "../shared/loader";

const AppointmentsPanel = ({
  selectedAppointments,
  handleDeleteAppointment,
}: {
  selectedAppointments: APPOINTMENT[];
  handleDeleteAppointment: (appointmentId: string) => Promise<void>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setLoading(true);
    await handleDeleteAppointment(id);
    setLoading(false);
  };

  const handleClick = () => {
    const sp = new URLSearchParams(searchParams);
    sp.delete("date");
    router.replace(`/dashboard/appointments?${sp.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Card className="w-2/5 p-4 mt-9">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">
            {format(selectedAppointments[0].scheduledFor, "d MMM")}
          </h3>
          <span className="text-sm">
            You have {selectedAppointments.length} appointments
          </span>
        </div>
        <Button variant="ghost" onClick={handleClick}>
          <X />
        </Button>
      </div>
      <div className="mt-8">
        {selectedAppointments
          .sort((a, b) => (a.scheduledFor <= b.scheduledFor ? -1 : 1))
          .map((a) => (
            <div key={a.id} className="grid grid-cols-6 mb-4">
              <time className="col-span-2 text-sm text-gray-600">
                {a.scheduledFor.toLocaleTimeString()}
              </time>
              <span className="col-span-4 bg-gray-100 border grid grid-cols-3 place-items-center gap-2 rounded-md text-sm">
                <p className="font-semibold">{a.prospect.name}</p>
                <LevelView level={a.interestLevel} />
                <Button variant="ghost" onClick={() => handleDelete(a.id)} disabled={loading}>
                  <Loader loading={loading}>
                    <Trash2 size={20} className="text-red-600" />
                  </Loader>
                </Button>
              </span>
            </div>
          ))}
      </div>
    </Card>
  );
};

export default AppointmentsPanel;
