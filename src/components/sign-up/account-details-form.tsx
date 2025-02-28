import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import FormGenerator from "@/components/shared/form-generator";
import { Button } from "@/components/ui/button";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import { Eye, Lock, Mail, User } from "lucide-react";
import Image from "next/image";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

function AccountDetailsForm({ errors, register }: Props) {
  const { onGoogleAuth } = useSignUpForm();

  return (
    <>
      <h1 className="md:text-2xl font-semibold mb-2">Sign up</h1>
      <p className="text-gray-600 md:text-sm">
        Create an account to get started
      </p>
      <Button
        onClick={onGoogleAuth}
        variant="outline"
        size="sm"
        className="w-full mt-4 mb-2"
      >
        <Image src="/images/google.png" alt="google" width={30} height={30} />{" "}
        Continue with google
      </Button>
      <p className="text-center text-sm text-gray-600 mb-6">
        or continue with email
      </p>
      <div className="flex flex-col gap-4 mb-4">
        <FormGenerator
          inputType="input"
          errors={errors}
          register={register}
          name="email"
          label="Email"
          placeholder="Enter your email"
          LeftIcon={<Mail size={18} />}
        />
        <div className="flex gap-2">
          <FormGenerator
            inputType="input"
            errors={errors}
            register={register}
            name="firstName"
            label="First name"
            placeholder="Enter first name"
            LeftIcon={<User size={18} />}
          />
          <FormGenerator
            inputType="input"
            errors={errors}
            register={register}
            name="lastName"
            label="Last name"
            placeholder="Enter last name"
            LeftIcon={<User size={18} />}
          />
        </div>
        <div>
          <FormGenerator
            inputType="input"
            type="password"
            errors={errors}
            register={register}
            name="password"
            label="Password"
            placeholder="Enter password"
            LeftIcon={<Lock size={18} />}
            RightIcon={<Eye size={18} />}
          />
          <span className="text-xs text-gray-600">at least 8 character</span>
        </div>
      </div>
      <div id="clerk-captcha" />
    </>
  );
}

export default AccountDetailsForm;
