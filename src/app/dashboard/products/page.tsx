import { getUser } from "@/actions/auth";
import InfoBar from "@/components/shared/infobar";
import AddProductDialog from "@/components/products/add-product-dialog";
import ProductsTable from "@/components/products/products-table";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { getProducts } from "@/actions/product";

const ProspectsPage = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");
  const { data } = await getProducts(clerkUser.id);

  return (
    <div className="p-8">
      <InfoBar Actions={<AddProductDialog />} />
      <ProductsTable products={data || []} />
    </div>
  );
};

export default ProspectsPage;
