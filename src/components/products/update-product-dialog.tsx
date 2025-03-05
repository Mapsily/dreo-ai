"use client";

import {  Box } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductForm from "./product-form";
import { useProductContext } from "@/context/product-provider";

export default function updateProductDialog() {
  const { openUpdateDialog, closeUpdateProductDialog, product } =
    useProductContext();

  const handleChange = (value: boolean) => {
    if (!value) closeUpdateProductDialog();
  };

  const handleSubmit = () => {
    closeUpdateProductDialog();
  };

  const handleCancel = () => {
    closeUpdateProductDialog();
  };

  return (
    <Dialog open={openUpdateDialog} onOpenChange={handleChange}>
      <DialogContent className="bg-white">
        <DialogHeader className="flex flex-row gap-2 items-start">
          <Box size={24} />
          <div>
            <DialogTitle>Update product/service</DialogTitle>
            <DialogDescription>
              update your product or service from your list.
            </DialogDescription>
          </div>
        </DialogHeader>
        <ProductForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          product={product}
        />
      </DialogContent>
    </Dialog>
  );
}
