import { getAgentSettings, getVoices } from "@/actions/setting";
import AgentSettingsForm from "@/components/settings/agent-settings-form";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AgentPage = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");
  const { data } = await getAgentSettings(clerkUser.id);
  const { data: voices } = await getVoices();

  return (
    <div className="flex flex-col gap-8 w-2/3">
      <AgentSettingsForm voices={voices} defaultValues={data} />
    </div>
  );
};

export default AgentPage;
