import { getScriptSettings } from "@/actions/setting";
import ScriptSettingsForm from "@/components/settings/script-settings-form";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ScriptSetting = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");
  const { data } = await getScriptSettings(clerkUser.id);

  return (
    <div className="flex flex-col gap-8 w-2/3">
      <ScriptSettingsForm defaultValues={data}/>
    </div>
  );
};

export default ScriptSetting;
