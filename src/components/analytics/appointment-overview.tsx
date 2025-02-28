import { Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Prisma } from "@prisma/client";
import NoItemsLayout from "../shared/no-items-layout.tsx";

export type Appointment = Prisma.AppointmentGetPayload<{
  select: {
    scheduledFor: true;
    notes: true;
    prospect: {
      select: {
        name: true;
      };
    };
  };
}>;

const AppointmentOverview = ({
  appointments = [],
}: {
  appointments: Appointment[];
}) => {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-2">
          <Calendar />
          <CardTitle>Today's Appointments</CardTitle>
        </div>
        <CardDescription className="text-gray-500">
          your appointments for today
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        {appointments.map((c) => (
          <div className="bg-black/20 flex justify-between items-center">
            <div>
              <h3 className="font-medium">{c.prospect.name}</h3>
              <span>{c.notes}</span>
            </div>
            <p className="text-right">{c.scheduledFor.toDateString()}</p>
          </div>
        ))}
        {!appointments.length && (
          <NoItemsLayout
            description="Start an outreach and Let the AI book appointments for you!"
            imageUrl="/images/no-appointments.png"
            title="Your scheduled meetings will appear here. "
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentOverview;
