"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "../use-toast";
import { useState } from "react";
import { Prisma } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { ProductInputSchema } from "@/schemas/product.schema";
import { onAddProduct } from "@/actions/product";

export const useProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Prisma.ProductCreateInput>({
    resolver: zodResolver(ProductInputSchema),
    mode: "onChange",
  });
  const { toast } = useToast();
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const onAdd = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const res = await onAddProduct({
        ...values,
        price: parseFloat(`${values.price}`),
        user: { connect: { clerkId: user?.id } },
      });
      if (res.status === 200) {
        reset();
        toast({ title: "Success", description: res.message });
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
      }
      setLoading(false);
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
