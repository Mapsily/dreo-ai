import Image from "next/image";
import Link from "next/link";

import { PLANS_FEATURES } from "@/constants/plans";
import { Button } from "@/components/ui/button";
import { getSubscription } from "@/actions/setting";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SuccessPage() {
  const { userId } = await auth();
  if (!userId) redirect("/auth/sign-in");

  const { data: subscription } = await getSubscription(userId);
  if (!subscription) redirect("/failed");

  const features =
    PLANS_FEATURES.find((p) => p.id === subscription.planId)?.features || [];

  return (
    <div className="min-h-screen bg-gray-50 w-full flex flex-col items-center justify-center">
      <Image
        src="/images/logo-grayscale.png"
        alt="logo"
        width={150}
        height={150}
      />
      <div className="mt-8 bg-white border rounded-xl py-16 px-32">
        <h1 className="text-center text-2xl mb-2">Congratulation 🎉</h1>
        <p className="mb-6 text-sm text-gray-600 text-center">
          You are successfully subscribed <br />
          to the <strong>{subscription.plan.name}</strong>
        </p>
        <span className="text-sm text-gray-600">Includes:</span>
        <div className="mt-2 flex flex-col gap-2 mb-6">
          {features.map(({ text, Icon }) => (
            <div
              key={text}
              className="flex items-center gap-4 text-sm text-gray-600 "
            >
              <Icon size={16} />
              <span>{text}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <Button asChild>
            <Link href="/dashboard/analytics" replace>Go to dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
