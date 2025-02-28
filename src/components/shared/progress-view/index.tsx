import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PROPS {
  steps: string[];
  currentStep: number;
}

export default function ProgressView({ steps = [], currentStep = 0 }: PROPS) {
  return (
    <div className={`w-fit grid grid-cols-${steps.length || 1} gap-16`}>
      {steps.map((step, index) => (
        <div className="flex flex-col items-center gap-2" key={step}>
          <p
            className={cn(
              "text-xs font-medium text-gray-400",
              currentStep >= index + 1 && "text-gray-900"
            )}
          >
            {step}
          </p>
          <div className="relative flex items-center gap-2">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-gray-400 border grid place-items-center",
                currentStep >= index + 1 && "border-primary"
              )}
            >
              <div
                className={cn(
                  "rounded-full grid place-items-center",
                  currentStep > index + 1 && "w-5 h-5 bg-primary",
                  currentStep === index + 1 && "w-3 h-3 bg-primary"
                )}
              >
                {currentStep > index + 1 && (
                  <Check size={16} className="text-white font-semibold" />
                )}
              </div>
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`${
                  index < currentStep ? "bg-primary" : "bg-gray-300"
                } h-px w-20 absolute left-8`}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
