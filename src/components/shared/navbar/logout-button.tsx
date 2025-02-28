"use client";

import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const { signOut } = useClerk();
  return (
    <button onClick={() => signOut({ redirectUrl: "/auth/sign-in" })}>
      <LogOut />
    </button>
  );
};

export default LogoutButton;
