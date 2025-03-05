import LevelView from "@/components/shared/level-view";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Appointment } from "./appointment-view";
import { useState } from "react";
import { Loader } from "../shared/loader";

type Props = {
  selectedAppointments: Appointment[];
  handleDeleteAppointment: (appointmentId: string) => Promise<void>;
  selectedDate: string;
};

const AppointmentsPanel = ({
  selectedAppointments,
  handleDeleteAppointment,
  selectedDate,
}: Props) => {
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
          <h3 className="font-semibold">{selectedDate}</h3>
          <span className="text-sm">
            You have {selectedAppointments.length} appointments
          </span>
        </div>
        <Button variant="ghost" onClick={handleClick}>
          <X />
        </Button>
      </div>
      {!!selectedAppointments.length && (
        <div className="mt-8">
          {selectedAppointments
            .sort((a, b) => (a.scheduledFor <= b.scheduledFor ? -1 : 1))
            .map((a) => (
              <div key={a.id} className="mb-6 flex flex-col gap-2">
                <time className="col-span-2 text-sm text-gray-600">
                  {a.scheduledFor.toLocaleTimeString()}
                </time>
                <div className="bg-gray-100 border rounded-md text-sm py-2 px-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{a.prospect.name}</p>
                    <LevelView level={a.interestLevel} />
                    <Button
                      variant="ghost"
                      onClick={() => handleDelete(a.id)}
                      disabled={loading}
                    >
                      <Loader loading={loading}>
                        <Trash2 size={20} className="text-red-600" />
                      </Loader>
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Interested Products:</p>
                    <p>{a.productsInterest.toString()}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </Card>
  );
};

export default AppointmentsPanel;
