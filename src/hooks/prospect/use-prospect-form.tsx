"use client";

import { ProspectInputSchema } from "@/schemas/prospect.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "../use-toast";
import { useState } from "react";
import { onAddProspect } from "@/actions/prospect";
import { Prisma } from "@prisma/client";
import { useUser } from "@clerk/nextjs";

export const useProspectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Prisma.ProspectCreateInput>({
    resolver: zodResolver(ProspectInputSchema),
    mode: "onChange",
  });
  const { toast } = useToast();
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const onAdd = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const res = await onAddProspect({
        ...values,
        user: { connect: { clerkId: user?.id } },
      });
      if (res.status === 200) {
        reset();
        setLoading(false);
        toast({ title: "Success", description: res.message });
      }
    } catch (error) {
      console.log(error);
    }
  });

  return {
    register,
    errors,
    onAdd,
    loading,
    getValues,
  };
};
