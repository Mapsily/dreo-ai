import { Calendar, MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const AppointmentOverview = () => {
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
      <CardContent className="py-4"></CardContent>
    </Card>
  );
};

export default AppointmentOverview;
