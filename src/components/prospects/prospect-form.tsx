"use client";

import { Prospect } from "@prisma/client";

import { useProspectForm } from "@/hooks/prospect/use-prospect-form";
import { Button } from "@/components/ui/button";
import { FormEvent, MouseEvent, useEffect } from "react";
import FormGenerator from "../shared/form-generator";
import { Loader } from "../shared/loader";

type Props = {
  prospect?: Prospect;
  onSubmit?: () => void;
  onCancel?: () => void;
};

export default function ProspectForm({ onCancel, onSubmit, prospect }: Props) {
  const {
    errors,
    register,
    isDirty,
    loading,
    isSubmitSuccessful,
    onUpdate,
    onAddSingle,
  } = useProspectForm(prospect);
  const isUpdate = !!prospect;

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
          placeholder="Enter prospect name"
        />
        <FormGenerator
          label="Phone Number"
          errors={errors}
          inputType="input"
          type="text"
          register={register}
          name="phone"
          placeholder="Enter prospect phone number"
        />
      </div>
      <FormGenerator
        label="Notes"
        errors={errors}
        inputType="input"
        type="text"
        register={register}
        name="notes"
        placeholder="Enter prospect notes"
      />
      <div className="flex justify-end gap-2">
        <Button disabled={loading || (isUpdate && !isDirty)} type="submit">
          <Loader loading={loading}>{isUpdate ? "Update" : "Add"}</Loader>
        </Button>
        <Button variant="secondary" disabled={loading} onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
