import { Button } from "@/components/ui/button";
import { PLANS_FEATURES } from "@/constants/plans";
import { cn } from "@/lib/utils";
import { Plan } from "@prisma/client";
import { Clock } from "lucide-react";
import { Card } from "../ui/card";

const PricingCard = ({
  id,
  isPopular,
  minutes,
  name,
  perDay,
  price,
  isPurchased,
}: Plan & { isPurchased: boolean }) => {
  const details = PLANS_FEATURES.find((p) => p.id === id);

  return (
    <Card className="relative border z-10 rounded-xl px-6 py-10">
      {isPopular && (
        <div className="absolute top-0 left-1/3 bg-primary rounded-b-md px-2 py-1">
          <p className="text-sm">Popular</p>
        </div>
      )}
      <div className="flex justify-between">
        <p className="text-2xl font-medium">{name}</p>
        <span
          className={cn(
            "p-2 bg-gray-200 text-black rounded-xl",
            isPopular && "bg-primary"
          )}
        >
          {details?.Icon && <details.Icon size={18} />}
        </span>
      </div>
      <h3 className="font-semibold text-3xl my-2">{price}/mo</h3>
      <p className="text-sm flex gap-2 items-center mb-8">
        <Clock size={16} /> {minutes}, {perDay} mins/day
      </p>
      <div className="space-y-4 mt-8">
        {details?.features.map(({ Icon, text }, index) => (
          <p key={index} className="flex gap-4 text-sm">
            <Icon size={18} />
            {text}
          </p>
        ))}
      </div>
      <Button
        disabled={isPurchased}
        className="mt-8 w-full"
        variant={isPopular ? "default" : "secondary"}
      >
        {isPurchased
          ? "Subscribed"
          : name === "Custom"
          ? "Contact Sales"
          : "Upgrade"}
      </Button>
    </Card>
  );
};

export default PricingCard;
