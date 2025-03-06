import React, { FormEvent } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import FormGenerator from "../form-generator";
import { Button } from "@/components/ui/button";
import { Loader } from "../loader";
import { Lock } from "lucide-react";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  isDirty: boolean;
  loading: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function ChangePasswordForm({
  errors,
  onSubmit,
  register,
  isDirty,
  loading,
  onCancel,
}: Props) {
  return (
    <form onSubmit={onSubmit}>
      <FormGenerator
        errors={errors}
        inputType="input"
        type="password"
        name="newPassword"
        register={register}
        placeholder="Enter a new password"
        label="New Password"
        LeftIcon={<Lock size={16} />}
      />
      <div className="mt-8 flex justify-end items-center gap-2">
        <Button disabled={loading || !isDirty} type="submit">
          <Loader loading={loading}>Change</Loader>
        </Button>
        <Button onClick={onCancel} disabled={loading} variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}
