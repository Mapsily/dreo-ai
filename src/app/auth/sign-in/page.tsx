import SignInFormProvider from "@/components/sign-in/form-provider";
import LoginForm from "@/components/sign-in/login-form";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const SignInPage = () => {
  return (
    <SignInFormProvider>
      <div className="flex flex-col gap-3">
        <LoginForm />
        <div className="w-full flex flex-col gap-3 items-center">
          <Button type="submit" className="w-full">
            Log In
          </Button>
          <p className="text-sm flex items-center">
            Don't have an account?
            <Button asChild variant="link" className="text-lime-600">
              <Link href="/auth/sign-up" className="font-semibold">
                Sign Up <ArrowRight size={16} />
              </Link>
            </Button>
          </p>
        </div>
      </div>
    </SignInFormProvider>
  );
};

export default SignInPage;
