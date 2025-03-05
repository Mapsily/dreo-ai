"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import type { Conversation } from "./conversation-table";
import AudioPlayer from "../shared/audio-player";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getCallRecording,
  getCallTranscript,
  Message,
} from "@/actions/ultravox";
import { useToast } from "@/hooks/use-toast";

interface ConversationPanelProps {
  conversation: Conversation;
}

export default function ConversationPanel({
  conversation,
}: ConversationPanelProps) {
  const [audioUrl, setAudioUrl] = useState("");
  const [transcript, setTranscript] = useState<Message[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const fetchTranscript = async () => {
    const res = await getCallTranscript(conversation.ultravoxCallId);
    if (res.status === 200 && res.data) {
      setTranscript(res.data);
    }
  };

  useEffect(() => {
    fetchTranscript();
  }, []);

  // useEffect(() => {
  //   const fetchAudio = async () => {
  //     const res = await getCallRecording(conversation.ultravoxCallId);
  //     if (res.status === 200 && res.data)
  //       setAudioUrl(URL.createObjectURL(res.data));
  //     else {
  //       toast({
  //         title: "Error",
  //         description: "Error fetching recording",
  //         variant: "destructive",
  //       });
  //     }
  //   };
  //   fetchAudio();
  //   return () => {
  //     if (audioUrl) {
  //       URL.revokeObjectURL(audioUrl);
  //     }
  //   };
  // }, [conversation.ultravoxCallId]);

  const handleClose = () => {
    router.replace(`/dashboard/conversations`);
  };

  return (
    <Card className="relative min-w-[380px] w-[380px] p-4">
      <Button
        onClick={handleClose}
        className="absolute right-2 top-2"
        variant="ghost"
      >
        <X />
      </Button>
      <Tabs defaultValue="conversation">
        <TabsList className="bg-background border-b pb-0 pl-0 rounded-none w-full justify-start">
          <TabsTrigger
            value="conversation"
            className="data-[state=active]:shadow-none data-[state=active]:border-b-2 rounded-none border-lime-600"
          >
            Conversation
          </TabsTrigger>
          <TabsTrigger
            value="fieldNotes"
            className="data-[state=active]:shadow-none data-[state=active]:border-b-2 rounded-none border-lime-600"
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
          <AudioPlayer src={audioUrl} />
          <Separator className="my-2" />
          <h3 className="text-sm font-semibold text-gray-800">TRANSCRIPT</h3>
          <div className="bg-gray-50 flex flex-col gap-4 px-4 py-2 rounded-md max-h-[800px] overflow-y-auto">
            {transcript.map((t) => (
              <div>
                <p className="font-semibold">
                  {t.role === "MESSAGE_ROLE_AGENT"
                    ? "Agent"
                    : conversation.prospect.name}
                </p>
                <p className="text-sm">{t.text || "{No response}"}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="fieldNotes">
          <h3 className="text-sm font-semibold text-gray-800">Summary</h3>
          <p className="mt-4 text-sm">{conversation.notes}</p>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
