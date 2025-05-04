"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClerkAPIError } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useToast } from "@/hooks/use-toast";
import {
  UserRegistrationProps,
  UserRegistrationSchema,
} from "@/schemas/auth.schema";
import { register } from "@/actions/auth";

export const useSignUpForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();
  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    mode: "onChange",
  });

  const onGoogleAuth = async () => {
    if (!isLoaded) return;
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/google-auth",
        redirectUrlComplete: "/google-auth",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: (err as Error).message,
      });
    }
  };

  const onGenerateOTP = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!isLoaded) return;
    try {
      setLoading(true);
      await signUp.create({
        emailAddress: email,
        password: password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      onNext((prev) => prev + 1);
    } catch (error: unknown) {
      const clerkError = error as { errors?: ClerkAPIError[] };
      toast({
        title: "Error",
        description: clerkError?.errors?.[0].longMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserRegistrationProps) => {
      if (!isLoaded) return;
      try {
        setLoading(true);
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.otp,
        });
        if (completeSignUp.status !== "complete") {
          setLoading(false);
          toast({
            title: "Error",
            description: "Something went wrong!",
          });
        }
        if (completeSignUp.status == "complete" && signUp.createdUserId) {
          const registered = await register(
            values.firstName,
            values.lastName,
            values.email,
            signUp.createdUserId
          );

          if (registered?.status == 200) {
            await setActive({
              session: completeSignUp.createdSessionId,
            });
            router.push("/plan-select");
          }

          if (registered?.status == 400) {
            toast({
              title: "Error",
              description: registered.message,
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        toast({
          title: "Error",
          description: (error as Error).message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  );
  return {
    methods,
    onHandleSubmit,
    onGenerateOTP,
    loading,
    onGoogleAuth,
  };
};
