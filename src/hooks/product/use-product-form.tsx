"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Prisma, Product } from "@prisma/client";
import { useState } from "react";

import { useToast } from "../use-toast";
import { ProductInputSchema } from "@/schemas/product.schema";
import { addProducts, updateProduct } from "@/actions/product";
import { getUser } from "@/actions/auth";

export const useProductForm = (defaultValues?: Product) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitSuccessful },
    getValues,
    reset,
  } = useForm<Prisma.ProductCreateManyInput>({
    resolver: zodResolver(ProductInputSchema),
    mode: "onChange",
    defaultValues,
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Prisma.ProductCreateManyInput[]>([]);

  const onUpdate = handleSubmit(async (product) => {
    if (!defaultValues) return;
    setLoading(true);
    try {
      const res = await updateProduct(defaultValues.id, product);
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

  const onDelete = (productIdx: number) => {
    setProducts((prev) => prev.filter((p, idx) => idx !== productIdx));
    toast({ title: "Success", description: "Product deleted" });
  };

  const onAdd = handleSubmit((product) => {
    setProducts((p) => [...p, product]);
    reset();
    toast({ title: "Success", description: "Product added" });
  });

  const onAddSingle = handleSubmit(async (product) => {
    await onSubmit(product);
    reset();
  });

  const onSubmit = async (
    product?: Prisma.ProductCreateManyInput | undefined
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
      const ps = [...products];
      if (product) ps.push(product);
      const finalProducts = ps.map((p) => ({
        ...p,
        userId: user.id,
      }));
      const res = await addProducts(finalProducts);
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
    onSubmit,
    products,
    isDirty,
    isSubmitSuccessful,
    onDelete,
    onAddSingle,
    onUpdate,
    setProducts
  };
};
