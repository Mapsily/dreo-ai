"use client";

import { Product } from "@prisma/client";
import React, { createContext, useContext, useState } from "react";

type ProductContextType = {
  openAddDialog: boolean;
  openAddProductDialog: () => void;
  closeAddProductDialog: () => void;
  openUpdateDialog: boolean;
  openUpdateProductDialog: (product: Product) => void;
  closeUpdateProductDialog: () => void;
  product: Product |  undefined;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const openAddProductDialog = () => {
    setOpenAddDialog(true);
  };

  const closeAddProductDialog = () => {
    setOpenAddDialog(false);
  };

  const openUpdateProductDialog = (product: Product) => {
    setProduct(product);
    setOpenUpdateDialog(true);
  };

  const closeUpdateProductDialog = () => {
    setProduct(undefined);
    setOpenUpdateDialog(false);
  };

  return (
    <ProductContext.Provider
      value={{
        openAddDialog,
        openAddProductDialog,
        closeAddProductDialog,
        openUpdateDialog,
        openUpdateProductDialog,
        closeUpdateProductDialog,
        product,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProductContext must be used within an ProductContextProvider"
    );
  }
  return context;
};
