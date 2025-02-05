import ButtonHandler from "@/components/forms/sign-up/button-handlers";
import SignUpFormProvider from "@/components/forms/sign-up/form-provider";
import RegistrationFormStep from "@/components/forms/sign-up/registration-step";
import { AuthContextProvider } from "@/context/auth-provider";

import React from "react";

const SignUp = () => {
  return (
    <AuthContextProvider>
      <div className="flex-1 px-24 py-8 w-full">
        <div className="flex flex-col h-full gap-3">
          <SignUpFormProvider>
            <div className="flex flex-col gap-3">
              <RegistrationFormStep />
              <ButtonHandler />
            </div>
          </SignUpFormProvider>
        </div>
      </div>
    </AuthContextProvider>
  );
};

export default SignUp;
