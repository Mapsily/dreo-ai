"use client";

import { useAccountSettings } from "@/hooks/setting/use-setting";
import FormGenerator from "@/components/shared/form-generator";
import Header from "./header";
import { User } from "@prisma/client";
import { Building, Mail, Phone, User as UserIcon } from "lucide-react";

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
        <div className="flex justify-between">
          <FormGenerator
            errors={errors}
            register={register}
            inputType="input"
            name="firstName"
            placeholder="Enter first name"
            type="text"
            label="First name"
            LeftIcon={<UserIcon size={16} />}
          />
          <FormGenerator
            errors={errors}
            register={register}
            inputType="input"
            name="lastName"
            placeholder="Enter last name"
            type="text"
            label="Last name"
            LeftIcon={<UserIcon size={16} />}
          />
        </div>
        <FormGenerator
          errors={errors}
          register={register}
          inputType="input"
          name="email"
          placeholder="Enter email"
          type="email"
          label="Email"
          disabled
          LeftIcon={<Mail size={16} />}
        />
        <FormGenerator
          errors={errors}
          register={register}
          inputType="input"
          name="phoneNumber"
          placeholder="Enter phone number"
          type="text"
          label="Phone Number"
          LeftIcon={<Phone size={16} />}
        />
        <FormGenerator
          errors={errors}
          register={register}
          inputType="input"
          name="companyName"
          placeholder="Enter company name"
          type="text"
          label="Company Name"
          LeftIcon={<Building size={16} />}
        />
      </fieldset>
    </form>
  );
}
