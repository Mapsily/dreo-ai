import { ZodType, z } from "zod";

export type UserRegistrationProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otp: string;
};

export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z.object({
  firstName: z.string().min(1, { message: "Your first name is required" }),
  lastName: z.string().min(1, { message: "Your last name is required" }),
  email: z.string().email({ message: "Incorrect email format" }),
  password: z
    .string()
    .min(8, { message: "Your password must be at least 8 characters long" })
    .max(64, {
      message: "Your password cannot be longer than 64 characters",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "Your password must contain at least one special character",
    }),
  otp: z.string().min(6, { message: "You must enter a 6-digit code" }),
});

export type UserLoginProps = {
  email: string;
  password: string;
};

export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
  email: z.string().email({ message: "You did not enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    }),
});
