import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Settings = async () => {
  const user = await currentUser();
  if (user) redirect(`/dashboard/settings/account`);
  else redirect("/");
};

export default Settings;
