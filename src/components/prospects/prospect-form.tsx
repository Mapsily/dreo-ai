"use client";

import { useProspectForm } from "@/hooks/prospect/use-prospect-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function ProspectForm() {
  const { errors, register, onAdd, loading } = useProspectForm();

  return (
    <form onSubmit={onAdd} className="grid gap-4 grid-cols-2">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input {...register("name")} placeholder="Enter name" />
      </div>
      <div className="space-y-2">
        <Label>Phone Number</Label>
        <Input {...register("phone")} placeholder="Enter phone number" />
      </div>
      <div className="col-span-2 space-y-2">
        <Label>Notes</Label>
        <Input {...register("notes")} placeholder="Add notes (optional)" />
      </div>
      <div>
        <Button type="submit">submit</Button>
      </div>
    </form>
  );
}
