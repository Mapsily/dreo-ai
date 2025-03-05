"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Prisma } from "@prisma/client";

import { useToast } from "../use-toast";
import { onAddTicket } from "@/actions/support";
import { TicketInputSchema } from "@/schemas/ticket.schema";
import { getUser } from "@/actions/auth";

export const useTicketForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<Prisma.TicketCreateInput>({
    resolver: zodResolver(TicketInputSchema),
    mode: "onChange",
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (ticket) => {
    setLoading(true);
    try {
      const res = await getUser();
      if (res.status !== 200 || !res.data) {
        toast({
          title: "Error",
          description: "UnAuthorised",
          variant: "destructive",
        });
        return;
      }
      await onAddTicket({
        ...ticket,
        user: { connect: { id: res.data.id } },
      });
      reset();
      toast({ title: "Success", description: "Ticket added" });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  });

  return {
    register,
    errors,
    loading,
    onSubmit,
    control
  };
};
