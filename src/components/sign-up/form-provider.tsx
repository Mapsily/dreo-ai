"use client";
import { Loader } from "@/components/shared/loader";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import { FormProvider } from "react-hook-form";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const SignUpFormProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading } = useSignUpForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={onHandleSubmit}>
        <Loader loading={loading}>{children}</Loader>
      </form>
    </FormProvider>
  );
};

export default SignUpFormProvider;
