import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage } from "@hookform/error-message";
import React, { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Controller,
  Control,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimePicker } from "../time-picker";
import OTPInput from "../otp";

type Props = {
  type?: "text" | "email" | "password" | "number";
  inputType: "select" | "input" | "textarea" | "otp" | "timepicker";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
  form?: string;
  defaultValue?: string;
  className?: string;
  control?: Control<any>;
  LeftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
  disabled?: boolean;
};

const FormGenerator = ({
  errors,
  inputType,
  name,
  placeholder,
  defaultValue,
  register,
  type,
  form,
  label,
  lines,
  options,
  className,
  control,
  LeftIcon,
  RightIcon,
  disabled,
}: Props) => {
  switch (inputType) {
    case "input":
    default:
      return (
        <Label
          className={clsx("flex flex-col gap-2", className)}
          htmlFor={`input-${label}`}
        >
          {label && label}
          <div className="flex items-center py-px px-4 bg-gray-100 rounded-md border">
            {LeftIcon}
            <Input
              id={`input-${label}`}
              type={type}
              placeholder={placeholder}
              form={form}
              defaultValue={defaultValue}
              disabled={disabled}
              className="text-gray-600 border-none shadow-none focus:ring-0 focus-visible:ring-0"
              {...register(name)}
            />
            {RightIcon}
          </div>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-1 text-sm">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );

    case "select":
      return (
        <Label className={className} htmlFor={`select-${label}`}>
          {label && label}
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value, disabled } }) => (
              <div className="mt-2 flex items-center py-px px-2 text-gray-600 rounded-md border">
                {LeftIcon}
                <Select
                  onValueChange={onChange}
                  value={value}
                  disabled={disabled}
                  defaultValue={defaultValue}
                >
                  <SelectTrigger className="border-none shadow-none  focus-visible:ring-0">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options?.map((option) => (
                      <SelectItem key={option.id} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );

    case "textarea":
      return (
        <Label
          className={clsx("flex flex-col gap-2", className)}
          htmlFor={`input-${label}`}
        >
          {label && label}
          <Textarea
            form={form}
            id={`input-${label}`}
            placeholder={placeholder}
            {...register(name)}
            rows={lines}
            defaultValue={defaultValue}
            className="border"
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );

    case "otp":
      return (
        <Label className={className}>
          {label && <span>{label}</span>}
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <OTPInput otp={value} setOtp={(val) => onChange(String(val))} />
            )}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );

    case "timepicker":
      return (
        <Label className={className}>
          {label && <span>{label}</span>}
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TimePicker
                date={value || new Date()}
                setDate={(d) => {
                  onChange(d);
                }}
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
  }
};

export default FormGenerator;
