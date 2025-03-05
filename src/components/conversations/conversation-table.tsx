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
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Prisma } from "@prisma/client";
import { cn, getDuration } from "@/lib/utils";
import TagView from "../shared/tag-view";
import { CONVERSATION_HEADERS } from "@/constants/table";

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
  const q = seachParams.get("q");

  const handleClick = (id: string) => {
    const newSearchParams = new URLSearchParams(seachParams);
    if (id) newSearchParams.set("id", id);
    if (id === selectedId) newSearchParams.delete("id");
    router.replace(`/dashboard/conversations?${newSearchParams.toString()}`);
  };

  if (!conversations.length) {
    return null;
  }

  const filteredConversations = conversations.filter((a) =>
    q
      ? a.prospect.name.toLowerCase().includes(q.toLowerCase()) ||
        a.prospect.phone.toLowerCase().includes(q.toLowerCase())
      : true
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {CONVERSATION_HEADERS.map((h) => (
            <TableHead key={h}>{h}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredConversations.map((conversation) => (
          <TableRow
            key={conversation.id}
            className={cn(
              "cursor-pointer",
              selectedId === conversation.id && "border border-lime-600"
            )}
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
        {!filteredConversations.length && (
          <TableRow>
            <TableCell
              colSpan={CONVERSATION_HEADERS.length}
              className="text-center pt-4 text-gray-600"
            >
              No conversations found for "{q}"
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
