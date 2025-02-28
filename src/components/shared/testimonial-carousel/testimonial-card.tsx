import { Card } from "@/components/ui/card";
import Image from "next/image";

type AUTHOR = {
  name: string;
  post: string;
  profileUrl: string;
};

interface PROPS {
  text: string;
  author: AUTHOR;
}

const TestimonialCard = ({ text, author }: PROPS) => {
  return (
    <Card className="text-xs p-6 space-y-4">
      <p>{text}</p>
      <div className="flex items-center gap-1">
        <Image src={author.profileUrl} alt="profile" width={30} height={30} />
        <div className="space-y-1">
          <p className="text-sm font-medium">{author.name}</p>
          <span className="text-gray-600 text-xs">{author.post}</span>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;
