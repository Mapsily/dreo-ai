"use client";

import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { Prisma } from "@prisma/client";

import { Button } from "../ui/button";
import FormGenerator from "../shared/form-generator";
import { TICKET_CATEGORIES } from "@/constants/forms";
import { Loader } from "../shared/loader";
import { FormEvent } from "react";

type Props = {
  register: UseFormRegister<Prisma.TicketCreateInput>;
  errors: FieldErrors<FieldValues>;
  control: Control<Prisma.TicketCreateInput>;
  loading: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function TicketForm({
  control,
  errors,
  loading,
  onSubmit,
  register,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <FormGenerator
        name="title"
        placeholder="Enter issue here"
        register={register}
        errors={errors}
        inputType="input"
        type="text"
        label="Title"
      />
      <FormGenerator
        name="category"
        placeholder="Select Category"
        register={register}
        errors={errors}
        inputType="select"
        type="text"
        options={TICKET_CATEGORIES}
        label="Category"
        control={control}
      />
      <FormGenerator
        name="description"
        placeholder="Add description"
        register={register}
        errors={errors}
        inputType="input"
        type="text"
        label="Description"
      />
      <div className="flex justify-end items-center gap-2">
        <Button type="submit" disabled={loading}>
          <Loader loading={loading}>Submit</Loader>
        </Button>
        <Button disabled={loading} variant="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}
