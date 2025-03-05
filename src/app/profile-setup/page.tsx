import ProfileSetupFormRenderer from "@/components/profile-setup/profile-setup-form-renderer";
import { ProfileSetupContextProvider } from "@/context/profile-setup-provider";
import { redirect } from "next/navigation";
import { getUser, updateUser } from "@/actions/auth";

export default async function ProfileSetupPage() {
  const res = await getUser();
  if (res.status !== 200) redirect("/auth/sign-in");
  if (res.data?.isOnboarded) redirect("/dashboard");
  await updateUser({ isOnboarded: true });

  return (
    <ProfileSetupContextProvider>
      <ProfileSetupFormRenderer user={res.data} />
    </ProfileSetupContextProvider>
  );
}
