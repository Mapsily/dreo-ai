"use client";

import React from "react";
import { useChangePassword } from "@/hooks/setting/use-setting";
import FormGenerator from "@/components/shared/form-generator";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/shared/loader";

const ChangePassword = () => {
  const { register, errors, onUpdate, loading, isDirty } = useChangePassword();

  return (
    <form onSubmit={onUpdate} className="relative">
      <Button
        disabled={!isDirty}
        variant="link"
        className="absolute right-0 -top-3 p-0"
      >
        <Loader loading={loading}>Change Password</Loader>
      </Button>
      <FormGenerator
        register={register}
        errors={errors}
        name="newPassword"
        placeholder="Enter new password"
        type="password"
        inputType="input"
        label="Password"
      />
    </form>
  );
};

export default ChangePassword;
