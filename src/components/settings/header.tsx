"use client";

import { Spinner } from "@/components/shared/loader/spinner";
import { Button } from "../ui/button";

const Header = ({
  heading,
  onSave,
  disabled,
  loading,
}: {
  heading: string;
  onSave?: () => void;
  disabled?: boolean;
  loading?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <h2 className="font-semibold">{heading}</h2>
      <Button disabled={disabled} type="submit" onClick={onSave}>
        {loading ? <Spinner /> : " Save"}
      </Button>
    </div>
  );
}

export default Header
