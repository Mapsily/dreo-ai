import InfoBar from "@/components/shared/infobar";
import React from "react";
import { getConversations } from "@/actions/conversation";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ConversationsTable } from "@/components/conversations/conversation-table";
import { ConversationPanel } from "@/components/conversations/conversation-panel";

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
      <div className="flex gap-2">
        <ConversationsTable conversations={res.data || []} />
        {selectedConversation && (
          <ConversationPanel conversation={selectedConversation} />
        )}
      </div>
    </div>
  );
};

export default ConversationPage;
