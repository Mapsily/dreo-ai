import { HelpCircle, Settings } from "lucide-react";

import UserProfile from "./user-profile";
import Logo from "../logo";
import NavbarLink from "./navbar-link";

function DashboardNavBar() {
  return (
    <div className="h-20 bg-white px-4 text-gray-800 flex items-center justify-between border-b">
      <Logo />
      <div className="flex items-center gap-4">
        <NavbarLink Icon={<HelpCircle />} path="support" />
        <NavbarLink Icon={<Settings />} path="settings" />
        <UserProfile />
      </div>
    </div>
  );
}

export default DashboardNavBar;
