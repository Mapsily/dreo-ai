"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth-provider";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import Link from "next/link";
import React from "react";
import { useFormContext } from "react-hook-form";

const ButtonHandler = () => {
  const { currentStep, setCurrentStep } = useAuthContext();
  const { formState, getFieldState, getValues } = useFormContext();
  const { isDirty: isName } = getFieldState("fullname", formState);
  const { isDirty: isEmail } = getFieldState("email", formState);
  const { isDirty: isPassword } = getFieldState("password", formState);
  const { onGenerateOTP } = useSignUpForm();

  if (currentStep === 2) {
    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Button type="submit" className="w-full">
          Create an account
        </Button>
        <p>
          Already have an account?
          <Link href="/auth/sign-in" className="font-bold">
            Sign In
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <Button
        type="submit"
        className="w-full"
        {...(isName &&
          isEmail &&
          isPassword && {
            onClick: () =>
              onGenerateOTP(
                getValues("email"),
                getValues("password"),
                setCurrentStep
              ),
          })}
      >
        Continue
      </Button>
      <p>
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="font-bold">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default ButtonHandler;
