import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

const AppointmentOverview = () => {
  return (
    <div className="bg-black rounded-2xl p-8 flex flex-col">
      <div className="w-full flex justify-between items-start mb-5">
        <div className="flex gap-3 items-center">
          <MessageCircle />
          <p className="font-bold">Recent Conversations</p>
        </div>
        <Link href="/dashboard/conversations" className="text-sm">
          See more
        </Link>
      </div>
      <Separator orientation="horizontal" />
    </div>
  );
};

export default AppointmentOverview;
