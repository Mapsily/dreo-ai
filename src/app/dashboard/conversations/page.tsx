import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

import ConversationsTable from "@/components/conversations/conversation-table";
import ConversationPanel from "@/components/conversations/conversation-panel";
import InfoBar from "@/components/shared/infobar";
import { getConversations } from "@/actions/conversation";
import NoItemsLayout from "@/components/shared/no-items-layout.tsx";
import ConversationHeader from "@/components/conversations/conversation-header";
import { OutreachSheetButton } from "@/components/shared/outreach-sheet";

const ConversationPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");
  const { id } = await searchParams;
  const { data: conversations } = await getConversations(clerkUser.id);
  const selectedConversation = conversations?.find((c) => c.id === id);
  const isEmpty = !conversations?.length;

  return (
    <div className="w-full h-full p-8">
      <InfoBar />
      {!isEmpty && (
        <div className="mb-8">
          <ConversationHeader />
        </div>
      )}
      <div className="flex justify-center gap-2">
        <ConversationsTable conversations={conversations || []} />
        {selectedConversation && (
          <ConversationPanel conversation={selectedConversation} />
        )}
      </div>
      {isEmpty && (
        <NoItemsLayout
          description="Once your AI reaches out to prospects, their responses will appear here."
          imageUrl="/images/no-conversations.png"
          title="No Conversations Yet!"
          Actions={<OutreachSheetButton variant="outline" />}
        />
      )}
    </div>
  );
};

export default ConversationPage;
