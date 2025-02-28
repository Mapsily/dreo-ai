import { getSettings, setupDefaultSettings } from "@/actions/setting";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { BarChart, Bot, Check, Clock, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const FEATURES = [
  { text: "Everything in Starter +", Icon: Check },
  { text: "AI Follow-Ups & Scheduling", Icon: Bot },
  { text: "Advanced Call Analytics", Icon: BarChart },
  { text: "10 Calls per Day", Icon: Phone },
  { text: "1000 Minutes", Icon: Clock },
];

export default async function SuccessPage() {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/auth/sign-in");
  const res = await getSettings(clerkUser?.id);
  if (res.status === 200) redirect("/dashboard");
  await setupDefaultSettings();

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
          to the <strong>Growth Plan</strong>
        </p>
        <span className="text-sm text-gray-600">Includes:</span>
        <div className="mt-2 flex flex-col gap-2 mb-6">
          {FEATURES.map(({ text, Icon }) => (
            <div
              key={text}
              className="flex items-center gap-4 text-sm text-gray-600 "
            >
              <Icon size={16} />
              <span>{text}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-8">
          <Button asChild>
            <Link href="/profile-setup">Profile Setup</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard">Go to dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
