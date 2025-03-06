"use client";
import { useToast } from "@/hooks/use-toast";
import {
  UserRegistrationProps,
  UserRegistrationSchema,
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { onCompleteUserRegistration } from "@/actions/auth";
import { ClerkAPIError } from "@clerk/types";

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
        redirectUrl: "/dashboard",
        redirectUrlComplete: "/dashboard/analytics",
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

        if (completeSignUp.status == "complete") {
          if (!signUp.createdUserId) return;

          const registered = await onCompleteUserRegistration(
            values.firstName,
            values.lastName,
            values.email,
            signUp.createdUserId
          );

          if (registered?.status == 200) {
            await setActive({
              session: completeSignUp.createdSessionId,
            });

            setLoading(false);
            router.push("/success");
          }

          if (registered?.status == 400) {
            toast({
              title: "Error",
              description: registered.message,
              variant: "destructive",
            });
            setLoading(false);
          }
        }
      } catch (error) {
        toast({
          title: "Error",
          description: (error as Error).message,
          variant: "destructive",
        });
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
