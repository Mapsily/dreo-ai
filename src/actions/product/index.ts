"use server";

import { revalidatePath } from "next/cache";
import { client } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getProducts = async (clerkId: string) => {
  try {
    const products = await client.product.findMany({
      where: {
        user: {
          clerkId,
        },
      },
    });
    return { status: 200, data: products };
  } catch (error) {
    return { status: 500, error: "Error fetching products" };
  }
};

export const addProducts = async (data: Prisma.ProductCreateManyInput[]) => {
  try {
    await client.product.createMany({ data });
    revalidatePath("/dashboard/products");
    return { status: 200, message: "Products added" };
  } catch (error) {
    return { status: 500, error: "Error adding products" };
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    await client.product.delete({ where: { id: productId } });
    revalidatePath("/dashboard/products");
    return { status: 200, message: "Product deleted" };
  } catch (error) {
    return { status: 500, error: "Error deleting product" };
  }
};

export const updateProduct = async (
  productId: string,
  updates: Prisma.ProductUpdateInput
) => {
  try {
    await client.product.update({
      where: {
        id: productId,
      },
      data: updates,
    });
    revalidatePath("/dashboard/products");
    return { status: 200, message: "Product updated" };
  } catch (error) {
    console.log(error);
    return { status: 500, error: "Error updating product" };
  }
};
