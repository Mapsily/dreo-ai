"use client";

import { Button } from "../ui/button";
import { useProductForm } from "@/hooks/product/use-product-form";
import FormGenerator from "@/components/forms/form-generator";

export default function ProspectForm() {
  const { errors, register, onAdd, loading } = useProductForm();

  return (
    <form onSubmit={onAdd} className="space-y-4">
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

      <Button type="submit">{loading ? "Loading..." : "Add"}</Button>
    </form>
  );
}
