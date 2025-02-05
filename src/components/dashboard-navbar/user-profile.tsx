import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export default function UserProfile() {
  return (
    <Button className="px-2 font-semibold" size="lg" variant="secondary">
      <Avatar className="w-8 h-8 bg-white rounded-md">
        <AvatarImage
          width={50}
          height={50}
          src="https://github.com/shadcn.pn"
        />
        <AvatarFallback className="bg-white rounded-md font-bold">
          S
        </AvatarFallback>
      </Avatar>
      Saif Malik
      <ChevronDown />
    </Button>
  );
}
