import { Calendar } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

const ConversationOverview = () => {
  return (
    <div className="bg-black rounded-2xl p-8 flex flex-col">
      <div className="w-full flex justify-between items-start mb-5">
        <div className="flex gap-3 items-center">
          <Calendar />
          <p className="font-bold">Recent Appointments</p>
        </div>
        <Link href="/dashboard/conversations" className="text-sm">
          See more
        </Link>
      </div>
      <Separator orientation="horizontal" />
    </div>
  );
};

export default ConversationOverview;
