import { redirect } from "next/navigation";

import { getUser, googleRegister } from "@/actions/auth";

export default async function GoogleAuthRoute() {
  const { data: user } = await getUser();
  if (user?.id) redirect("/dashboard/analytics");
  await googleRegister();

  return null;
}
