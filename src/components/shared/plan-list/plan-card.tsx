import { Plan } from "@prisma/client";
import { Clock } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { PLANS_FEATURES } from "@/constants/plans";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { initiatePayment } from "@/actions/payment";
import { useToast } from "@/hooks/use-toast";
import { setupDefaultSettings } from "@/actions/setting";
import { createSubscription } from "@/actions/plan";
import { Loader } from "../loader";

const PricingCard = ({
  id,
  isPopular,
  minutes,
  name,
  perDay,
  price,
  isPurchased,
}: Plan & { isPurchased: boolean }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const details = PLANS_FEATURES.find((p) => p.id === id);

  const startFree = async () => {
    setLoading(true);
    await Promise.all([setupDefaultSettings(), createSubscription(id)]);
    router.replace("/dashboard/analytics");
    setLoading(false);
  };

  const handleClick = async () => {
    if (price === 0) {
      startFree();
      return;
    }
    const res = await initiatePayment({ amount: price, planId: id });
    if (res.status === 200) router.replace(res.redirectUrl);
    else {
      toast({
        title: "Error",
        description: "Please try again after some time",
        variant: "destructive",
      });
    }
  };

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
      <h3 className="font-semibold text-3xl my-2">
        {price ? `${price}/mo` : "Free"}
      </h3>
      <p className="text-sm flex gap-2 items-center mb-8">
        <Clock size={16} /> {minutes} mins, {perDay} mins/day
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
        onClick={handleClick}
        disabled={isPurchased}
        className="mt-8 w-full"
        variant={isPopular ? "default" : "secondary"}
      >
        <Loader loading={loading}>
          {isPurchased ? "Subscribed" : price === 0 ? "Subscribe" : "Purchase"}
        </Loader>
      </Button>
    </Card>
  );
};

export default PricingCard;
