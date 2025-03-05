"use client";

import { PlusCircle, Box } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import ProductForm from "./product-form";
import { useProductContext } from "@/context/product-provider";

export default function AddProductDialog() {
  const { openAddDialog, closeAddProductDialog } = useProductContext();

  const handleOpenChange = (value: boolean) => {
    if (!value) closeAddProductDialog();
  };

  const handleSubmit = () => {
    closeAddProductDialog();
  };

  const handleCancel = () => {
    closeAddProductDialog();
  };

  return (
    <Dialog open={openAddDialog} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader className="flex flex-row gap-2 items-start">
          <Box size={24} />
          <div>
            <DialogTitle>Add product/service</DialogTitle>
            <DialogDescription>
              Add new product or service to your list.
            </DialogDescription>
          </div>
        </DialogHeader>
        <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}

export function AddProductDialogButton() {
  const { openAddProductDialog } = useProductContext();

  const hancleClick = () => {
    openAddProductDialog();
  };

  return (
    <Button onClick={hancleClick} variant="outline">
      <PlusCircle /> Add new product
    </Button>
  );
}
