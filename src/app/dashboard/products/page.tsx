import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

import InfoBar from "@/components/shared/infobar";
import { ProductContextProvider } from "@/context/product-provider";
import AddProductDialog, {
  AddProductDialogButton,
} from "@/components/products/add-product-dialog";
import UpdateProductDialog from "@/components/products/update-product-dialog";
import ProductTable from "@/components/products/product-table";
import { getProducts } from "@/actions/product";
import NoItemsLayout from "@/components/shared/no-items-layout.tsx";

const ProspectsPage = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");
  const { data: products } = await getProducts(clerkUser.id);
  const isEmpty = !products?.length;

  return (
    <ProductContextProvider>
      <div className="p-8">
        <InfoBar Actions={isEmpty ? <></> : <AddProductDialogButton />} />
        <ProductTable products={products || []} />
        {isEmpty && (
          <NoItemsLayout
            description="Your AI is ready to pitch, but it needs to know what you offer. Add your products/services to begin outreach!"
            imageUrl="/images/no-products.png"
            title="No Products Yet!"
            Actions={<AddProductDialogButton />}
          />
        )}
        <AddProductDialog />
        <UpdateProductDialog />
      </div>
    </ProductContextProvider>
  );
};

export default ProspectsPage;
