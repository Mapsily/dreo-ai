"use client";

import { Prisma, Prospect } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { ProspectInputSchema } from "@/schemas/prospect.schema";
import { useToast } from "../use-toast";
import { addProspects, updateProspect } from "@/actions/prospect";
import { getUser } from "@/actions/auth";

export const useProspectForm = (defaultValues?: Prospect) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitSuccessful },
    getValues,
    reset,
  } = useForm<Prisma.ProspectCreateManyInput>({
    resolver: zodResolver(ProspectInputSchema),
    mode: "onChange",
    defaultValues,
  });
  const { toast } = useToast();
  const [prospects, setProspects] = useState<Prisma.ProspectCreateManyInput[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const onUpdate = handleSubmit(async (prospect) => {
    if (!defaultValues) return;
    setLoading(true);
    try {
      const res = await updateProspect(defaultValues.id, prospect);
      if (res.status === 200) {
        toast({ title: "Success", description: res.message });
        reset();
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
  });

  const onDelete = (prospectIdx: number) => {
    setProspects((prev) => prev.filter((_, idx) => idx !== prospectIdx));
    toast({ title: "Success", description: "Prospect deleted" });
  };

  const onAdd = handleSubmit((prospect) => {
    setProspects((p) => [...p, prospect]);
    reset();
    toast({ title: "Success", description: "Prospect added" });
  });

  const onAddSingle = handleSubmit(async (prospect) => {
    await onSubmit(prospect);
    reset();
  });

  const onSubmit = async (
    prospect?: Prisma.ProspectCreateManyInput | undefined
  ) => {
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
      const ps = [...prospects];
      if (prospect) ps.push(prospect);
      const finalProspects = ps.map((p) => ({
        ...p,
        userId: user.id,
      }));
      const res = await addProspects(finalProspects);
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
    isDirty,
    isSubmitSuccessful,
    onAdd,
    onAddSingle,
    onUpdate,
    loading,
    getValues,
    onDelete,
    onSubmit,
    prospects,
    setProspects,
  };
};
