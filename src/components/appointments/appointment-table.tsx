"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Appointment } from "./appointment-view";
import { APPOINTMENT_HEADERS } from "@/constants/table";
import TagView from "../shared/tag-view";
import { Loader } from "../shared/loader";

interface Props {
  appointments: Appointment[];
  onDelete: (id: string) => Promise<void>;
}

export default function AppointmentTable({ appointments, onDelete }: Props) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const selectedId = searchParams.get("id");
  const q = searchParams.get("q");

  const handleDelete = async (id: string) => {
    setLoading(true);
    await onDelete(id);
    setLoading(false);
  };

  const filteredAppointments = appointments.filter((a) =>
    q
      ? a.prospect.name.toLowerCase().includes(q.toLowerCase()) ||
        a.prospect.phone.toLowerCase().includes(q.toLowerCase())
      : true
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {APPOINTMENT_HEADERS.map((a) => (
            <TableHead key={a}>{a}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((a) => (
            <TableRow
              key={a.id}
              className={`${selectedId === a.id ? "bg-muted" : ""}`}
            >
              <TableCell>{a.prospect.name}</TableCell>
              <TableCell>{a.prospect.phone}</TableCell>
              <TableCell>{a.productsInterest.toString()}</TableCell>
              <TableCell>
                <TagView tag={a.interestLevel} />
              </TableCell>
              <TableCell>{a.scheduledFor.toDateString()}</TableCell>
              <TableCell>{a.notes}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleDelete(a.id)}
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50 hover:text-red-600"
                >
                  <Loader loading={loading}>
                    <Trash2 /> Delete
                  </Loader>
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={APPOINTMENT_HEADERS.length}
              className="text-center pt-4 text-gray-600"
            >
              No appointments found for "{q}"
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
