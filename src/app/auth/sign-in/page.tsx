import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import SignInFormProvider from "@/components/sign-in/form-provider";
import LoginForm from "@/components/sign-in/login-form";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <SignInFormProvider>
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
    </SignInFormProvider>
  );
}
