import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getPlans } from "@/actions/plan";
import { getSubscription } from "@/actions/setting";
import PlanList from "@/components/shared/plan-list";
import SubscriptionCard from "@/components/plan/subscription-card";
import InfoBar from "@/components/shared/infobar";

const PlanPage = async () => {
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/");

  const { data: subscription } = await getSubscription(clerkId);
  const { data: plans } = await getPlans();

  return (
    <div className="p-8">
      <InfoBar />
      <SubscriptionCard subscription={subscription} />
      <div className="mt-12">
        <h2 className="text-center text-2xl mb-6">Upgrade your plan</h2>
        <PlanList plans={plans || []} subscribedPlanId={subscription?.planId} />
      </div>
    </div>
  );
};

export default PlanPage;
