import Link from "next/link";
import { HelpCircle, Settings } from "lucide-react";
import UserProfile from "./user-profile";
import Logo from "../logo";

function DashboardNavBar() {
  return (
    <div className="h-20 bg-white px-4 text-gray-800 flex items-center justify-between border-b">
      <Logo />
      <div className="flex items-center gap-4">
        <Link href="/dashboard/support">
          <HelpCircle />
        </Link>
        <Link href="/dashboard/settings">
          <Settings />
        </Link>
        <UserProfile />
      </div>
    </div>
  );
}

export default DashboardNavBar;
