import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();
  if (user) redirect("/dashboard/analytics");
  else redirect("/");
}
