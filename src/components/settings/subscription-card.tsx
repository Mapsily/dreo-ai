import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Prisma } from "@prisma/client";

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
    <div>
      <h3 className="mb-2 text-sm font-medium">Subscription</h3>
      <Card className="flex flex-row items-center justify-between gap-2 p-4">
        <div className="flex gap-4">
          <span className="text-4xl text-primary/100">*</span>
          <span>
            <h4 className="text-black text-md mb-2">
              {subscription?.plan.name}
            </h4>
            <p className="text-sm">
              {subscription?.minutesLeft} | {subscription?.plan.perDay} min/day
            </p>
          </span>
        </div>
        <Button variant="outline">Upgarde</Button>
      </Card>
    </div>
  );
};

export default SubscriptionCard;
