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
import { Play, Square } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Prisma } from "@prisma/client";

export type CONVERSATION = Prisma.ConversationGetPayload<{
  select: {
    prospect: {
      select: {
        name: true;
        phone: true;
      };
    };
    id: true;
    createdAt: true;
    callEndAt: true;
    callStartAt: true;
    recordingUrl: true;
    transcript: true;
    notes: true;
  };
}>;

interface ConversationsTableProps {
  conversations: CONVERSATION[];
}

export function ConversationsTable({ conversations }: ConversationsTableProps) {
  const seachParams = useSearchParams();
  const router = useRouter();
  const selectedId = seachParams.get("conversationId");

  const handleClick = (id: string) => {
    router.replace(`/dashboard/conversations?id=${id}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Phone number</TableHead>
          <TableHead>Last contacted</TableHead>
          <TableHead>Duration</TableHead>
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
            <TableCell>{conversation.createdAt.toDateString()}</TableCell>
            <TableCell>{conversation.callStartAt.toDateString()}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                {selectedId === conversation.id ? (
                  <Square className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
