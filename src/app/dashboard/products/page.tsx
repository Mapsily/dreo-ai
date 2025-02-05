import { getUser } from "@/actions/auth";
import InfoBar from "@/components/infobar";
import AddProductDialog from "@/components/products/add-product-dialog";
import ProductsTable from "@/components/products/products-table";
import { redirect } from "next/navigation";
import React from "react";
import { getProducts } from "@/actions/product";

const ProspectsPage = async () => {
  const { user } = await getUser();
  if (!user?.id) redirect("/");

  const { data } = await getProducts(user.id);

  return (
    <>
      <InfoBar Actions={<AddProductDialog />} />
      <ProductsTable products={data || []} />
    </>
  );
};

export default ProspectsPage;
