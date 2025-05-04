import { getPlans } from "@/actions/plan";
import { getSubscription } from "@/actions/setting";
import PlanList from "@/components/shared/plan-list";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Plans() {
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/auth/sign-in");
  const { data: subcription } = await getSubscription(clerkId);
  if (subcription) redirect("/dashboard/analytics");
  const { data: plans } = await getPlans();

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl">Select a plan to continue</h1>
      <PlanList plans={plans || []} />
    </div>
  );
}
