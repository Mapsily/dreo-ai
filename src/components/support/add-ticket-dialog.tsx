"use client";

import { HelpCircle, PlusCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import TicketForm from "./ticket-form";
import { FormEvent, useState } from "react";
import { useTicketForm } from "@/hooks/support/use-ticket-form";

export default function AddTicketDailog() {
  const [open, setOpen] = useState(false);
  const { control, errors, loading, onSubmit, register } = useTicketForm();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    await onSubmit(e);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle /> Raise Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader className="flex flex-row gap-2 items-start">
          <HelpCircle size={24} />
          <div>
            <DialogTitle>Raise a new ticket</DialogTitle>
            <DialogDescription>
              Get help from our support team.
            </DialogDescription>
          </div>
        </DialogHeader>
        <TicketForm
          control={control}
          errors={errors}
          loading={loading}
          onSubmit={handleSubmit}
          register={register}
        />
      </DialogContent>
    </Dialog>
  );
}
