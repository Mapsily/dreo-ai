import React from "react";

import ButtonHandler from "@/components/sign-up/button-handlers";
import SignUpFormProvider from "@/components/sign-up/form-provider";
import RegistrationFormStep from "@/components/sign-up/registration-step";
import { AuthContextProvider } from "@/context/auth-provider";

export default function SignUp() {
  return (
    <AuthContextProvider>
      <SignUpFormProvider>
        <RegistrationFormStep />
        <ButtonHandler />
      </SignUpFormProvider>
    </AuthContextProvider>
  );
}
