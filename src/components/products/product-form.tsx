"use client";

import { FormEvent, MouseEvent, useEffect } from "react";
import { Product } from "@prisma/client";

import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/shared/form-generator";
import { Loader } from "@/components/shared/loader";
import { useProductForm } from "@/hooks/product/use-product-form";

type Props = {
  product: Product;
  onSubmit?: () => void;
  onCancel?: () => void;
};

export default function ProspectForm({ product, onSubmit, onCancel }: Props) {
  const {
    errors,
    loading,
    onAddSingle,
    register,
    onUpdate,
    isDirty,
    isSubmitSuccessful,
  } = useProductForm(product);
  const isUpdate = !!product;

  useEffect(() => {
    if (!isSubmitSuccessful) return;
    onSubmit && onSubmit();
  }, [isSubmitSuccessful]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (isUpdate) await onUpdate(e);
    else await onAddSingle(e);
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onCancel && onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <FormGenerator
          label="Name"
          errors={errors}
          inputType="input"
          type="text"
          register={register}
          name="name"
          placeholder="Enter product name"
        />
        <FormGenerator
          label="Price"
          errors={errors}
          inputType="input"
          type="number"
          register={register}
          name="price"
          placeholder="Enter product price"
        />
      </div>
      <FormGenerator
        label="Description"
        errors={errors}
        inputType="input"
        type="text"
        register={register}
        name="description"
        placeholder="Enter product description"
      />
      <div className="flex justify-end gap-2">
        <Button
          disabled={
            loading || (isUpdate && !isDirty)
          }
          type="submit"
        >
          <Loader loading={loading}>{isUpdate ? "Update" : "Add"}</Loader>
        </Button>
        <Button variant="secondary" disabled={loading} onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
