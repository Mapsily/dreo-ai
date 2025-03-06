"use client";

import { Prisma } from "@prisma/client";
import TicketCard from "./ticket-card";
import TicketPanel from "./ticket-panel";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export type Ticket = Prisma.TicketGetPayload<{
  include: {
    responses: true;
  };
}>;

type Props = {
  tickets: Ticket[];
};

export default function TicketView({ tickets }: Props) {
  const searchParams = useSearchParams();
  const selectedTicketId = searchParams.get("id");
  const q = searchParams.get("q");

  const openTickets = useMemo(() => {
    return tickets.filter((t) => {
      if (q) {
        return t.status !== "CLOSED" && t.id.includes(q);
      } else {
        return t.status !== "CLOSED";
      }
    });
  }, [q, tickets]);

  const closeTickets = useMemo(() => {
    return tickets.filter((t) => {
      if (q) {
        return t.status == "CLOSED" && t.id.includes(q);
      } else {
        return t.status === "CLOSED";
      }
    });
  }, [q, tickets]);

  const selectedTicket = useMemo(() => {
    return tickets.find((t) => t.id === selectedTicketId);
  }, [selectedTicketId,tickets]);

  return (
    <div className="flex justify-between gap-2">
      <div className={`${selectedTicketId ? "w-2/3" : "w-full"}`}>
        <h2 className="font-medium text-gray-900">Active requests</h2>
        <div className={`mt-4 grid grid-cols-${selectedTicketId ? "2" : "3"}`}>
          {openTickets.map((t) => (
            <TicketCard
              key={t.id}
              {...t}
              selected={selectedTicketId === t.id}
            />
          ))}
        </div>
        {!!closeTickets.length && (
          <h2 className="mt-8 font-medium text-gray-900">Closed requests</h2>
        )}
        <div className={`mt-4 grid grid-cols-${selectedTicketId ? "2" : "3"}`}>
          {closeTickets.map((t) => (
            <TicketCard
              key={t.id}
              {...t}
              selected={selectedTicketId === t.id}
            />
          ))}
        </div>
      </div>
      {selectedTicket && <TicketPanel ticket={selectedTicket} />}
    </div>
  );
}
