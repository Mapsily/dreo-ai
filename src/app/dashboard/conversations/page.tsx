import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

import ConversationsTable from "@/components/conversations/conversation-table";
import ConversationPanel from "@/components/conversations/conversation-panel";
import InfoBar from "@/components/shared/infobar";
import { getConversations } from "@/actions/conversation";
import NoItemsLayout from "@/components/shared/no-items-layout.tsx";
import { PhoneForwarded } from "lucide-react";
import { Button } from "@/components/ui/button";

const ConversationPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");
  const { id } = await searchParams;
  const res = await getConversations(clerkUser.id);
  const selectedConversation = res.data?.find((c) => c.id === id);

  return (
    <div className="w-full h-full p-8">
      <InfoBar />
      <div className="flex justify-center gap-2">
        <ConversationsTable conversations={res.data || []} />
        {selectedConversation && (
          <ConversationPanel conversation={selectedConversation} />
        )}
      </div>
      {!res.data?.length && (
        <NoItemsLayout
          description="Once your AI reaches out to prospects, their responses will appear here."
          imageUrl="/images/no-conversations.png"
          title="No Conversations Yet!"
          Actions={
            <Button variant="outline">
              <PhoneForwarded /> Start Outreach
            </Button>
          }
        />
      )}
    </div>
  );
};

export default ConversationPage;
