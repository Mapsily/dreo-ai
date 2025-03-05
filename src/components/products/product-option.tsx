"use client";

import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { Product } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useProductContext } from "@/context/product-provider";
import { useToast } from "@/hooks/use-toast";
import { deleteProduct } from "@/actions/product";
import { Loader } from "../shared/loader";

type Props = {
  product: Product;
};

export default function ProductOption({ product }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { openUpdateProductDialog } = useProductContext();

  const handleUpdate = () => {
    openUpdateProductDialog(product);
    setOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteProduct(product.id);
    if (res.status === 200)
      toast({ title: "Success", description: res.message });
    else
      toast({ title: "Error", description: res.error, variant: "destructive" });
    setLoading(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" onClick={handleUpdate}>
          Update
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-red-600"
          onClick={handleDelete}
        >
          <Loader loading={loading}>Delete</Loader>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
