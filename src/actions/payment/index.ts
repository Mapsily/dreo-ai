"use server";

import {
  StandardCheckoutClient,
  Env,
  StandardCheckoutPayRequest,
} from "pg-sdk-node";
import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

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

interface PaymentPayload {
  amount: number;
  planId: string;
}

export async function initiatePayment({ amount, planId }: PaymentPayload) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) return { status: 401, redirectUrl: "" };

    const { id } = await client.transaction.create({
      data: {
        user: { connect: { clerkId } },
      },
      select: {
        id: true,
      },
    });

    const request = StandardCheckoutPayRequest.builder()
      .merchantOrderId(id)
      .amount(amount * 100)
      .redirectUrl(
        `http://localhost:3000/api/payment-callback/${id}?planId=${planId}`
      )
      .build();

    const response = await phonepeClient.pay(request);
    return { status: 200, redirectUrl: response.redirectUrl };
  } catch (error) {
    console.log(error);
    
    return { status: 500, redirectUrl: "" };
  }
}
