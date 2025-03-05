import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

import { getPropects } from "@/actions/prospect";
import InfoBar from "@/components/shared/infobar";
import AddProspectDialog from "@/components/prospects/add-prospect-dailog";
import ProspectsTable from "@/components/prospects/prospects-table";
import UploadProspectSheet from "@/components/prospects/upload-prospect-sheet";

const ProspectsPage = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");
  const { data } = await getPropects(clerkUser.id);

  return (
    <div className="p-8">
      <InfoBar
        Actions={
          <div className="flex gap-2">
            <UploadProspectSheet />
            <AddProspectDialog />
          </div>
        }
      />
      <ProspectsTable prospects={data || []} />
    </div>
  );
};

export default ProspectsPage;
