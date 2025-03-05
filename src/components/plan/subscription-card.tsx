import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Prisma } from "@prisma/client";
import { Progress } from "../ui/progress";

export type Subscription = Prisma.SubscriptionGetPayload<{
  include: {
    plan: true;
  };
}>;

const SubscriptionCard = async ({
  subscription,
}: {
  subscription?: Subscription | null;
}) => {
  return (
    <div className="w-fit">
      <h3 className="mb-6 text-sm font-medium">Credits</h3>
      <Card className="flex flex-row items-center justify-between gap-16 p-4">
        <div className="flex gap-4">
          <span className="text-4xl text-primary/100">*</span>
          <span>
            <h4 className="text-2xl font-semibold text-black text-md mb-2">
              {subscription?.minutesLeft} min
            </h4>
            <p className="text-sm mb-4">
              {subscription?.dailyUsed} min out of {subscription?.plan.perDay}{" "}
              min used today
            </p>
            <Progress
              className="bg-gray-100"
              value={subscription?.dailyUsed || 10}
              max={subscription?.plan.perDay || 100}
            />
          </span>
        </div>
        <Button variant="outline">Upgarde</Button>
      </Card>
    </div>
  );
};

export default SubscriptionCard;
