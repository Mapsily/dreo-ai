"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth-provider";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import { ArrowRight } from "lucide-react";
import { useFormContext } from "react-hook-form";
import Link from "next/link";
import React from "react";
import { Loader } from "../shared/loader";

const ButtonHandler = () => {
  const { currentStep, setCurrentStep } = useAuthContext();
  const { formState, getFieldState, getValues } = useFormContext();
  const { isDirty: isFirstName } = getFieldState("firstName", formState);
  const { isDirty: isLastName } = getFieldState("lastName", formState);
  const { isDirty: isEmail } = getFieldState("email", formState);
  const { isDirty: isPassword } = getFieldState("password", formState);
  const { onGenerateOTP, loading } = useSignUpForm();

  if (currentStep === 2) {
    return (
      <>
        <Button className="w-full" type="submit">Verify</Button>
        <p className="text-sm text-gray-600 flex items-center">
          Didn&apos;t received a code?
          <Button variant="link" className="text-lime-600 hover:no-underline">
            Click here to resend
          </Button>
        </p>
      </>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <Button
        className="w-full"
        {...(isFirstName &&
          isLastName &&
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
        <Loader loading={loading}>Continue</Loader>
      </Button>
      <p className="text-sm text-center">
        By clicking on continue you agree{" "}
        <Link
          href="https://corena.mapsily.com/terms-and-conditions"
          target="_blank"
          className="text-lime-600 font-medium"
        >
          Term of use
        </Link>{" "}
        and{" "}
        <Link
          href="https://corena.mapsily.com/privacy-policy"
          target="_blank"
          className="text-lime-600 font-medium"
        >
          Privacy Policy
        </Link>
      </p>
      <p className="text-sm flex items-center">
        Already have an account?
        <Button asChild variant="link" className="text-lime-600">
          <Link href="/auth/sign-in" className="font-medium">
            Sign In <ArrowRight size={16} />
          </Link>
        </Button>
      </p>
    </div>
  );
};

export default ButtonHandler;
