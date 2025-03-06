"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import FormGenerator from "@/components/shared/form-generator";
import { USER_LOGIN_FORM } from "@/constants/forms";
import { Button } from "../ui/button";
import Image from "next/image";
import { useSignInForm } from "@/hooks/sign-in/use-sign-in";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { onGoogleAuth } = useSignInForm();
  return (
    <>
      <h2 className="md:text-3xl font-bold">Log In</h2>
      <p className="text-sm text-gray-600">
        Continue with your existing account
      </p>
      <Button onClick={onGoogleAuth} variant="outline">
        <Image
          src="/images/google.png"
          alt="google-logo"
          width={20}
          height={20}
        />{" "}
        Log In with google
      </Button>
      <span className="text-sm text-center text-gray-600">
        Or continue with email
      </span>
      {USER_LOGIN_FORM.map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
      ))}
    </>
  );
};

export default LoginForm;
