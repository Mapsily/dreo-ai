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
      className={`bg-white p-8 border rounded-2xl flex  ${
        direction === "horizontal"
          ? "flex-col gap-6"
          : "gap-8 justify-between items-center"
      }`}
    >
      <div
        className={`flex flex-col gap-2 ${
          direction === "horizontal" ? "" : "w-1/2"
        }`}
      >
        <label>{label}</label>
        <span className="text-sm text-gray-600">{description}</span>
      </div>
      <div className={direction === "horizontal" ? "" : "w-1/2"}>
        {children}
      </div>
    </div>
  );
};
