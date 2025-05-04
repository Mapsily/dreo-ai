import React from "react";

import TestimonialCarousel from "@/components/shared/testimonial-carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function FailedPage() {
  return (
    <div className="min-w-screen flex items-center justify-center bg-gray-50 p-16">
      <div className="grid grid-cols-2 bg-white rounded-xl border">
        <TestimonialCarousel />
        <div className="px-16 py-12 flex flex-col justify-center">
          <h1 className="text-2xl font-medium mb-2">
            Uh-oh! payment failed 🤔
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            Payments fail sometimes, you're still in control. Double-check your
            details and retry when ready.
          </p>
          <div className="text-gray-600 text-sm mb-6">
            <p className="mb-2">Possible reasons:</p>
            <ul className="list-disc">
              <li>Insufficent funds</li>
              <li>Card expired or Incorrect details</li>
              <li>Bank declined the transaction</li>
            </ul>
          </div>
          <Button className="w-fit mb-4"><Link href="/plan-select">Try again</Link></Button>
          <p className="text-gray-600 text-sm">
            Need help?{" "}
            <Link className="text-lime-600" href="tel:+919389586440">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
