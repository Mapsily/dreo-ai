"use client";

import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { Loader } from "../loader";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { signOut } = useClerk();

  const handleClick = async () => {
    setLoading(true);
    try {
      await signOut({ redirectUrl: "/auth/sign-in" });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick}>
      <Loader loading={loading}>
        <LogOut />
      </Loader>
    </button>
  );
};

export default LogoutButton;
