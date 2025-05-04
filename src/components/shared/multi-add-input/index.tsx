import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState, ChangeEvent } from "react";
import { Control, Controller } from "react-hook-form";

type Props = {
  control: Control<any>;
  name: string;
};

export default function MultiAddInput({ control, name }: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const deleteValue = (idx: number, values: string[]) => {
    return values.filter((_, i) => i !== idx);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <div className="flex gap-2">
            <Input
              name={name}
              placeholder={`Enter ${name}`}
              onChange={handleChange}
              value={inputValue}
              className="w-full"
            />
            <Button
              type="button"
              onClick={() => {
                onChange([inputValue, ...value]);
                setInputValue("");
              }}
            >
              Add
            </Button>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {value.map((v: string, idx: number) => (
              <div key={idx} className="px-2 py-2 bg-gray-100 rounded-md flex items-center gap-2">
                <p className="w-full">{v}</p>
                <Button
                  onClick={() => onChange(deleteValue(idx, value))}
                  size="icon"
                  variant="destructive"
                  type="button"
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    />
  );
}
