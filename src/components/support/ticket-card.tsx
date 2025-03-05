import { Calendar, Grid2X2Plus, MessageSquareMore } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import type { Ticket } from "./ticket-view";
import { useRouter, useSearchParams } from "next/navigation";

export default function TicketCard({
  title,
  status,
  category,
  createdAt,
  id,
  selected,
}: Ticket & { selected: boolean }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = () => {
    const sp = new URLSearchParams(searchParams);
    sp.set("id", id);
    router.replace(`/dashboard/support?${sp.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Card className={selected ? "border border-lime-600" : "border-none"}>
      <div className="p-6 flex justify-between items-center">
        <CardTitle>#{id.slice(-6)}</CardTitle>
        <span className="px-2 py-1 bg-gray-50 rounded-sm text-sm">
          {status}
        </span>
      </div>
      <CardContent className="flex items-center justify-between">
        <p>{title}</p>
        <Button
          onClick={handleClick}
          variant="outline"
          className="text-lime-600 border-lime-600 hover:bg-lime-100 hover:text-lime-600"
        >
          <MessageSquareMore /> View Thread
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between text-sm">
        <p className="flex items-center gap-2">
          <Grid2X2Plus size={18} /> {category}
        </p>
        <p className="flex items-center gap-2">
          <Calendar size={18} /> {createdAt.toDateString()}
        </p>
      </CardFooter>
    </Card>
  );
}
