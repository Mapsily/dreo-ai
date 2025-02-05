import { getPropects } from "@/actions/prospect";
import { getUser } from "@/actions/auth";
import InfoBar from "@/components/infobar";
import AddProspectDialog from "@/components/prospects/add-prospect-dailog";
import ProspectsTable from "@/components/prospects/prospects-table";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const ProspectsPage = async () => {
  const { user } = await getUser();
  if (!user?.id) redirect("/");
  const { data } = await getPropects(user.id);

  return (
    <>
      <InfoBar Actions={<AddProspectDialog />} />
      <ProspectsTable prospects={data || []} />
    </>
  );
};

export default ProspectsPage;
