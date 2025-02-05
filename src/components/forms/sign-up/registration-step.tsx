"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/spinner";
import { useAuthContext } from "@/context/auth-provider";
import DetailForm from "./account-details-form";

const OTPForm = dynamic(() => import("./otp-form"), {
  ssr: false,
  loading: Spinner,
});

const RegistrationFormStep = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { currentStep } = useAuthContext();
  const [onOTP, setOnOTP] = useState<string>("");

  setValue("otp", onOTP);

  switch (currentStep) {
    case 1:
      return <DetailForm errors={errors} register={register} />;
    case 2:
      return <OTPForm onOTP={onOTP} setOTP={setOnOTP} />;
  }

  return <div>RegistrationFormStep</div>;
};

export default RegistrationFormStep;
