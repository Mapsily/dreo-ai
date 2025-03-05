import { cn } from "@/lib/utils";

type Props = {
  tag:
    | "COMPLETED"
    | "INPROGRESS"
    | "PASSED"
    | "FAILED"
    | "RESCHEDULED"
    | "NOTRESPONDED"
    | "HIGH"
    | "MEDIUM"
    | "LOW"
    | "INITIAL"
    | "BOOKED"
    | "NOTINTERESTED"
    | "SCHEDULED";
};

export default function TagView({ tag }: Props) {
  const getClasses = () => {
    switch (tag) {
      case "COMPLETED":
        return "text-green-600";
      case "FAILED":
        return "text-red-600";
      case "INPROGRESS":
        return "text-gray-600";
      case "RESCHEDULED":
        return "text-orange-600";
      case "NOTRESPONDED":
        return "text-red-600";
      case "PASSED":
        return "text-green-600";
      case "HIGH":
        return "text-red-600";
      case "MEDIUM":
        return "text-orange-600";
      case "LOW":
        return "text-gray-600";
      case "INITIAL":
        return "text-gray-600";
      case "BOOKED":
        return "text-green-600";
      case "SCHEDULED":
        return "text-gray-600";
      case "NOTINTERESTED":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <p
      className={cn(
        "w-fit py-1 px-2 rounded-md bg-gray-100 font-medium",
        getClasses()
      )}
    >
      {tag}
    </p>
  );
}
