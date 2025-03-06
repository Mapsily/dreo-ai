import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUser } from "@/actions/auth";
import LogoutButton from "./logout-button";
import Link from "next/link";

export default async function UserProfile() {
  const res = await getUser();

  return (
    <div className="px-2 py-1 font-semibold bg-gray-100 flex items-center gap-2 rounded-md">
      <Avatar className="w-8 h-8 bg-white rounded-md">
        <AvatarImage
          width={50}
          height={50}
          src="https://github.com/shadcn.pn"
        />
        <AvatarFallback className="bg-white rounded-md font-bold">
          {`${res.data?.firstName}`.toLocaleUpperCase()[0]}
        </AvatarFallback>
      </Avatar>
      <Link href="/dashboard/settings/account">
        {res.data?.firstName} {res.data?.lastName}
      </Link>
      <LogoutButton />
    </div>
  );
}
