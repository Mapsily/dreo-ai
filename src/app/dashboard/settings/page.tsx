import { redirect } from "next/navigation";

const Settings = async () => {
  redirect(`/dashboard/settings/account`);
};

export default Settings;
