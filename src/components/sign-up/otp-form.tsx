import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";
import FormGenerator from "../shared/form-generator";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
};

const OTPForm = ({ getValues, control, errors, register }: Props) => {
  const email = getValues("email");

  return (
    <>
      <h2 className="md:text-2xl font-bold mb-2">Verify OTP</h2>
      <p className="text-gray-600 md:text-sm">
        Enter a 6 digit code sent to {email}
      </p>
      <div className="flex py-5">
        <FormGenerator
          errors={errors}
          inputType="otp"
          name="otp"
          register={register}
          control={control}
        />
      </div>
    </>
  );
};

export default OTPForm;
