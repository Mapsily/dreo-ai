import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import type { Ticket } from "./ticket-view";

type Props = {
  ticket: Ticket;
};

export default function TicketPanel({ ticket }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const sp = new URLSearchParams(searchParams);
    sp.delete("id");
    router.replace(`/dashboard/support?${sp.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Card className="w-1/3 p-4 mt-9">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">#{ticket.id.slice(-6)}</h3>
          <span className="text-sm">{ticket.title}</span>
        </div>
        <Button variant="ghost" onClick={handleClick}>
          <X />
        </Button>
      </div>
      <p className="my-4 font-light">{ticket.description}</p>
      <div className="">
        <h4 className="text-sm font-medium">Support team actions</h4>
        <div className="mt-2 bg-gray-200 rounded-md p-2">
          <p className="font-medium">adasdasdasdasdasdas</p>
          <span className="text-sm">sadasdasdasdasd</span>
        </div>
      </div>
    </Card>
  );
}
