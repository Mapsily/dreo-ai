import { createSubscription, upgradeSubscription } from "@/actions/plan";
import { getSubscription, setupDefaultSettings } from "@/actions/setting";
import { client } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { Env, StandardCheckoutClient } from "pg-sdk-node";

const clientId = "MAPSILYUAT_2503131433081787947875";
const clientSecret = "ZDg0OGM5MTEtNWFmNy00NzlkLWE1MjctNThmY2MzYjBmNGY3";
const clientVersion = 1;
const env = Env.SANDBOX;

const phonepeClient = StandardCheckoutClient.getInstance(
  clientId,
  clientSecret,
  clientVersion,
  env
);

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  const searchParams = req.nextUrl.searchParams;
  const planId = searchParams.get("planId");
  let isSuccess = true;
  if (!planId || !orderId) throw new Error("no value");
  try {
    const response = await phonepeClient.getOrderStatus(orderId);
    if (response.state === "COMPLETED") {
      const { userId: clerkId } = await auth();
      if (!clerkId) throw new Error("unauthorised");
      const oldSubscription = await getSubscription(clerkId);
      if (oldSubscription) {
        await Promise.all([
          upgradeSubscription(planId),
          client.transaction.update({
            where: { id: orderId },
            data: {
              status: "SUCCESS",
            },
          }),
        ]);
      } else {
        await Promise.all([
          setupDefaultSettings(),
          createSubscription(planId),
          client.transaction.update({
            where: { id: orderId },
            data: {
              status: "SUCCESS",
            },
          }),
        ]);
      }
    } else throw new Error("failed payment");
  } catch (error) {
    console.log(error);
    await client.transaction.update({
      where: { id: orderId },
      data: {
        status: "FAILED",
      },
    });
    isSuccess = false;
  } finally {
    if (isSuccess) redirect("/success");
    else redirect("/failed");
  }
}
