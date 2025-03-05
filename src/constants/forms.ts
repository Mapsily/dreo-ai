type UserRegistrationProps = {
  id: string;
  type: "email" | "text" | "password";
  inputType: "select" | "input";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  name: string;
};

export const USER_LOGIN_FORM: UserRegistrationProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Enter your email",
    name: "email",
    type: "email",
    label: "Email",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Password",
    name: "password",
    type: "password",
    label: "Password",
  },
];

export const TICKET_CATEGORIES = [
  { id: "TECHNICAL", value: "TECHNICAL", label: "Technical" },
  { id: "FEATURE", value: "FEATURE", label: "Feature" },
  { id: "PAYMENT", value: "PAYMENT", label: "Payment" },
];
