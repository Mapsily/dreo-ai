"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import type { CONVERSATION } from "./conversation-table";
import AudioPlayer from "../shared/audio-player";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";

interface ConversationPanelProps {
  conversation: CONVERSATION;
}

export function ConversationPanel({ conversation }: ConversationPanelProps) {
  const router = useRouter();

  const handleClick = () => {
    router.replace(`/dashboard/conversations`);
  };

  return (
    <Card className="relative w-1/3 p-4">
      <Button
        onClick={handleClick}
        className="absolute right-2 top-2"
        variant="ghost"
      >
        <X />
      </Button>
      <Tabs defaultValue="conversation">
        <TabsList className="bg-background border-b pb-0 pl-0 rounded-none w-full justify-start">
          <TabsTrigger
            value="conversation"
            className="data-[state=active]:shadow-none data-[state=active]:border-b-2 rounded-none border-primary"
          >
            Conversation
          </TabsTrigger>
          <TabsTrigger
            value="fieldNotes"
            className="data-[state=active]:shadow-none data-[state=active]:border-b-2 rounded-none border-primary"
          >
            Field notes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="conversation" className="flex flex-col gap-4">
          <div className="mt-4">
            <h3 className="font-semibold text-xl">
              {conversation.prospect.name}
            </h3>
            <span className="text-sm">{conversation.prospect.phone}</span>
          </div>
          <AudioPlayer src="/" />
          <Separator className="my-2" />
          <h3 className="text-sm font-semibold text-gray-800">TRANSCRIPT</h3>
        </TabsContent>
        <TabsContent value="fieldNotes">{conversation.notes}</TabsContent>
      </Tabs>
    </Card>
  );
}
