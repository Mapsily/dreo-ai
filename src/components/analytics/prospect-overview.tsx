import { UserCheck } from "lucide-react";
import { Prospect } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import NoItemsLayout from "../shared/no-items-layout.tsx";

const AppointmentOverview = ({ prospects = [] }: { prospects: Prospect[] }) => {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-2">
          <UserCheck />
          <CardTitle>Interested Prospects</CardTitle>
        </div>
        <CardDescription className="text-gray-500">
          your prospects for today
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        {prospects.map((c) => (
          <div key={c.id} className="bg-gray-100 rounded-md px-4 py-2 flex justify-between items-center">
            <div>
              <h3 className="font-medium">{c.name}</h3>
              <span className="text-sm">{c.notes}</span>
            </div>
            <p className="text-right text-sm">{c.updatedAt.toDateString()}</p>
          </div>
        ))}
        {!prospects.length && (
          <NoItemsLayout
            description="Start an outreach and Let the AI call prospects for you!"
            imageUrl="/images/no-prospects.png"
            title="Today's passed prospect will appear here. "
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentOverview;
