"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Play, Square } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Prisma } from "@prisma/client";
import { getDuration } from "@/lib/utils";
import TagView from "../shared/tag-view";

export type Conversation = Prisma.ConversationGetPayload<{
  include: { prospect: true };
}>;

interface Props {
  conversations: Conversation[];
}

export default function ConversationsTable({ conversations }: Props) {
  const seachParams = useSearchParams();
  const router = useRouter();
  const selectedId = seachParams.get("id");

  const handleClick = (id: string) => {
    router.replace(`/dashboard/conversations?id=${id}`);
  };

  if (!conversations.length) {
    return null;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Phone number</TableHead>
          <TableHead>Last contacted</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Result</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {conversations.map((conversation) => (
          <TableRow
            key={conversation.id}
            className={`cursor-pointer ${
              selectedId === conversation.id ? "bg-muted" : ""
            }`}
            onClick={() => handleClick(conversation.id)}
          >
            <TableCell>{conversation.prospect.name}</TableCell>
            <TableCell>{conversation.prospect.phone}</TableCell>
            <TableCell>
              {conversation.prospect.lastContacted?.toDateString()}
            </TableCell>
            <TableCell>
              {getDuration(conversation.startAt, conversation.endAt)}
            </TableCell>
            <TableCell>
              <TagView tag={conversation.status} />
            </TableCell>
            <TableCell>
              <TagView tag={conversation.result} />
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                {selectedId === conversation.id ? (
                  <ArrowLeft className="h-4 w-4" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
