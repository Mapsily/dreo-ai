type Props = {
  children: React.ReactNode;
  label: string;
  description: string;
  direction?: "horizontal" | "vertical";
};

export const InputContainer = ({
  children,
  label,
  description,
  direction = "vertical",
}: Props) => {
  return (
    <div
      className={`bg-white p-8 rounded-2xl w-[70%] flex  ${
        direction === "horizontal" ? "flex-col gap-8" : "gap-16 justify-between items-center"
      }`}
    >
      <div className="flex flex-col gap-2">
        <label>{label}</label>
        <span className="text-sm text-gray-400 w-2/3">{description}</span>
      </div>
      {children}
    </div>
  );
};
