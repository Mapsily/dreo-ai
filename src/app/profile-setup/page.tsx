import { getUser } from "@/actions/auth";
import { getSettings } from "@/actions/setting";
import ProfileSetupFormRenderer from "@/components/profile-setup/profile-setup-form-renderer";
import { ProfileSetupContextProvider } from "@/context/profile-setup-provider";
import { redirect } from "next/navigation";

export default async function ProfileSetupPage() {
  const userRes = await getUser();
  if (userRes.status !== 200 || !userRes.data) redirect("/auth/sign-in");
  const res = await getSettings(userRes.data?.clerkId);
  if (res.status === 200) redirect("/dashboard");

  return (
    <ProfileSetupContextProvider>
      <ProfileSetupFormRenderer user={userRes.data} />
    </ProfileSetupContextProvider>
  );
}
