"use client";

import { useAccountSettings } from "@/hooks/setting/use-setting";
import FormGenerator from "@/components/shared/form-generator";
import Header from "./header";
import { User } from "@prisma/client";

export default function UserProfileForm({
  defaultValues,
}: {
  defaultValues?: User | null;
}) {
  const { errors, isDirty, loading, onUpdate, register } =
    useAccountSettings(defaultValues);

  return (
    <form className="space-y-4" onSubmit={onUpdate}>
      <Header heading="ACCOUNT" disabled={!isDirty} loading={loading} />
      <fieldset className="space-y-8 w-full">
        <FormGenerator
          errors={errors}
          register={register}
          inputType="input"
          name="name"
          placeholder="Enter name"
          type="text"
          label="Name"
        />
        <FormGenerator
          errors={errors}
          register={register}
          inputType="input"
          name="email"
          placeholder="Enter email"
          type="email"
          label="Email"
        />
        <FormGenerator
          errors={errors}
          register={register}
          inputType="input"
          name="phoneNumber"
          placeholder="Enter phone number"
          type="text"
          label="Phone Number"
        />
        <FormGenerator
          errors={errors}
          register={register}
          inputType="input"
          name="companyName"
          placeholder="Enter company name"
          type="text"
          label="Company Name"
        />
      </fieldset>
    </form>
  );
}
