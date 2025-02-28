import { getAdvancedSettings } from "@/actions/setting";
import AdvanceSettingsForm from "@/components/settings/advanced-settings-form";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AdvancedPage = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");
  const { data } = await getAdvancedSettings(clerkUser.id);
  
  return (
    <div className="flex flex-col gap-8 w-2/3">
      <AdvanceSettingsForm defaultValues={data} />
    </div>
  );
};

export default AdvancedPage;
