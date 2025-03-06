import { getPlans } from "@/actions/plan";
import { getSubscription } from "@/actions/setting";
import PlanList from "@/components/plan/plan-list";
import SubscriptionCard from "@/components/plan/subscription-card";
import InfoBar from "@/components/shared/infobar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const PlanPage = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");
  const { data: subscription } = await getSubscription(clerkUser.id);
  const { data: plans } = await getPlans();

  return (
    <div className="p-8">
      <InfoBar />
      <SubscriptionCard subscription={subscription} />
      <PlanList plans={plans || []} subscribedPlanId={subscription?.planId} />
    </div>
  );
};

export default PlanPage;
