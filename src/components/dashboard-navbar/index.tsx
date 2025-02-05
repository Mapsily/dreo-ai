import Image from "next/image";
import Link from "next/link";
import { HelpCircle, Settings } from "lucide-react";
import ThemeSwitch from "./theme-switch";
import UserProfile from "./user-profile";

function DashboardNavBar() {
  return (
    <div className="bg-white px-4 text-gray-800 flex items-center justify-between border-b">
      <Image src="/images/logo.png" alt="" width={140} height={140} />
      <div className="flex items-center gap-4">
        <ThemeSwitch />
        <Link href="">
          <HelpCircle />
        </Link>
        <Link href="">
          <Settings />
        </Link>
        <UserProfile />
      </div>
    </div>
  );
}

export default DashboardNavBar;
