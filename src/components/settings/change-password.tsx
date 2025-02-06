"use client";
import { useChangePassword } from "@/hooks/settings/use-settings";
import React from "react";

import FormGenerator from "../forms/form-generator";
import { Button } from "../ui/button";
import { Loader } from "../loader";

const ChangePassword = () => {
  const { register, errors, onChangePassword, loading, isDirty } =
    useChangePassword();

  return (
    <form onSubmit={onChangePassword} className="relative">
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
        name="confirmPassword"
        placeholder="Enter new password"
        type="password"
        inputType="input"
        label="Password"
      />
    </form>
  );
};

export default ChangePassword;
