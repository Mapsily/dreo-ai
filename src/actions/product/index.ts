"use server";

import { client } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getProducts = async (userId: string) => {
  try {
    const products = await client.product.findMany({
      where: {
        userId,
      },
    });
    return { status: 200, data: products };
  } catch (error) {
    return { status: 500, error: "Error fethching product!" };
  }
};

export const onAddProduct = async (data: Prisma.ProductCreateInput) => {
  try {
    await client.product.create({ data });
    return { status: 200, message: "Product Added!" };
  } catch (error) {
    return { status: 500, error: "Error add product!" };
  }
};
