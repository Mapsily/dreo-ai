"use client";

import { useAccountSetting } from "@/hooks/settings/use-settings";
import FormGenerator from "../forms/form-generator";
import Header from "./header";
import { User } from "@prisma/client";

export default function UserProfileForm({ user }: { user?: User | null }) {
  const {
    errors,
    control,
    isDirty,
    loading,
    onChangeAccountSetting,
    register,
  } = useAccountSetting();

  return (
    <form className="space-y-4">
      <Header heading="ACCOUNT" disabled={!isDirty} />
      <fieldset className="space-y-8 w-full">
        <FormGenerator
          errors={errors}
          register={register}
          inputType="input"
          name="name"
          placeholder="Enter name"
          defaultValue={user?.name}
          type="text"
          label="Name"
        />
        <FormGenerator
          errors={errors}
          register={register}
          inputType="input"
          name="email"
          placeholder="Enter email"
          defaultValue={user?.email}
          type="email"
          label="Email"
        />
        <FormGenerator
          errors={errors}
          register={register}
          inputType="input"
          name="phoneNumber"
          placeholder="Enter phone number"
          defaultValue={`${user?.phoneNumber}`}
          type="number"
          label="Phone Number"
        />
        <FormGenerator
          errors={errors}
          register={register}
          inputType="input"
          name="companyName"
          placeholder="Enter company name"
          defaultValue={user?.companyName || ""}
          type="text"
          label="Company Name"
        />
      </fieldset>
    </form>
  );
}
