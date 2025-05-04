import { MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Prisma } from "@prisma/client";
import NoItemsLayout from "../shared/no-items-layout.tsx";
import { getDuration } from "@/lib/utils";
import TagView from "../shared/tag-view";

export type Conversation = Prisma.ConversationGetPayload<{
  select: {
    prospect: {
      select: {
        name: true;
      };
    };
    status: true;
    endAt: true;
    startAt: true;
    notes: true;
    result:true
  };
}>;

const ConversationOverview = ({
  conversations = [],
}: {
  conversations: Conversation[];
}) => {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-2">
          <MessageCircle />
          <CardTitle>Recent Conversations</CardTitle>
        </div>
        <CardDescription className="text-gray-500">
          recent conversations with AI agent (1 Week)
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        {!!conversations.length && (
          <Table className="bg-white">
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conversations.map((c) => (
                <TableRow key={c.prospect.name}>
                  <TableCell className="font-medium">
                    {c.prospect.name}
                  </TableCell>
                  <TableCell><TagView tag={c.status} /></TableCell>
                  <TableCell>{getDuration(c.startAt, c.endAt)}</TableCell>
                  <TableCell className="text-right truncate"><TagView tag={c.result}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {!conversations.length && (
          <NoItemsLayout
            description="Once your AI reaches out to prospects, their responses will appear here."
            imageUrl="/images/no-conversations.png"
            title="No Conversations Yet!"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ConversationOverview;
