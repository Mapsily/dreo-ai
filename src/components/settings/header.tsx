"use client";

import { Button } from "../ui/button";

export default function Header({
  heading,
  onSave,
  disabled,
}: {
  heading: string;
  onSave?: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <h2 className="font-semibold">{heading}</h2>
      <Button disabled={disabled} type="submit" onClick={onSave}>
        Save
      </Button>
    </div>
  );
}
