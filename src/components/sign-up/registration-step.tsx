"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";

import { Spinner } from "@/components/shared/loader/spinner";
import { useAuthContext } from "@/context/auth-provider";
import DetailForm from "./account-details-form";

const OTPForm = dynamic(() => import("./otp-form"), {
  ssr: false,
  loading: () => <Spinner />,
});

const RegistrationFormStep = () => {
  const {
    register,
    formState: { errors },
    control,
    getValues,
  } = useFormContext();
  const { currentStep } = useAuthContext();

  switch (currentStep) {
    case 1:
      return <DetailForm errors={errors} register={register} />;
    case 2:
      return (
        <OTPForm
          getValues={getValues}
          errors={errors}
          register={register}
          control={control}
        />
      );
  }

  return <div>RegistrationFormStep</div>;
};

export default RegistrationFormStep;
