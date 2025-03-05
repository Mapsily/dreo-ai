"use client";

import { Lock } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { useChangePassword } from "@/hooks/setting/use-setting";
import ChangePasswordForm from "./change-password-form";

export default function ChangePasswordDialog() {
  const { isDirty, onUpdate, errors, loading, register } = useChangePassword();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    await onUpdate(e);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-lime-600 border-lime-600 hover:text-lime-600 hover:bg-lime-100"
        >
          <Lock /> Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader className="flex flex-row gap-2 items-start">
          <Lock size={24} />
          <div>
            <DialogTitle>Change password</DialogTitle>
            <DialogDescription>
              Enter a new password you want to update
            </DialogDescription>
          </div>
        </DialogHeader>
        <ChangePasswordForm
          register={register}
          errors={errors}
          loading={loading}
          isDirty={isDirty}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
