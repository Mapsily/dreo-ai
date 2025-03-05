"use client";

import { ProspectInputSchema } from "@/schemas/prospect.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "../use-toast";
import { useState } from "react";
import { onAddProspects } from "@/actions/prospect";
import { Prisma } from "@prisma/client";
import { getUser } from "@/actions/auth";

export const useProspectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Prisma.ProspectCreateManyInput>({
    resolver: zodResolver(ProspectInputSchema),
    mode: "onChange",
  });
  const { toast } = useToast();
  const [prospects, setProspects] = useState<Prisma.ProspectCreateManyInput[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const onDelete = (prospectIdx: number) => {
    setProspects((prev) => prev.filter((_, idx) => idx !== prospectIdx));
    toast({ title: "Success", description: "Prospect deleted" });
  };

  const onAdd = handleSubmit((prospect) => {
    setProspects((p) => [...p, prospect]);
    reset();
    toast({ title: "Success", description: "Prospect added" });
  });

  const onSubmit = async () => {
    setLoading(true);
    try {
      const { data: user } = await getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "UnAuthorised",
          variant: "destructive",
        });
        return;
      }
      const finalProspects = prospects.map((p) => ({
        ...p,
        userId: user.id,
      }));
      const res = await onAddProspects(finalProspects);
      if (res.status === 200) {
        toast({ title: "Success", description: res.message });
        return;
      }
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    errors,
    onAdd,
    loading,
    getValues,
    onDelete,
    onSubmit,
    prospects,
    setProspects
  };
};
