import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

import TestimonialCarousel from "@/components/shared/testimonial-carousel";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const user = await currentUser();
  if (user) redirect("/dashboard/analytics");

  return (
    <div className="min-w-screen flex items-center justify-center bg-gray-50 p-16">
      <div className="grid grid-cols-2 bg-white rounded-xl border">
        <TestimonialCarousel />
        <div className="px-16 py-12 flex flex-col justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
