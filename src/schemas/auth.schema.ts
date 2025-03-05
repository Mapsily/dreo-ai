import { ZodType, z } from "zod";

export type UserRegistrationProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otp: string;
};

export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z.object({
  firstName: z.string().min(1, { message: "your first name required" }),
  lastName: z.string().min(1, { message: "your last name required" }),
  email: z.string().email({ message: "Incorrect email format" }),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    })
    .refine(
      (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
      "password should contain only alphabets and numbers"
    ),

  otp: z.string().min(6, { message: "You must enter a 6 digit code" }),
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
