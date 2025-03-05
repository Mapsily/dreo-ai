import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

import { getPropects } from "@/actions/prospect";
import InfoBar from "@/components/shared/infobar";
import AddProspectDialog, {
  AddProspectDialogButton,
} from "@/components/prospects/add-prospect-dailog";
import ProspectsTable from "@/components/prospects/prospects-table";
import UploadProspectSheet from "@/components/prospects/upload-prospect-sheet";
import NoItemsLayout from "@/components/shared/no-items-layout.tsx";
import { ProspectContextProvider } from "@/context/prospect-provider";
import UpdateProspectDialog from "@/components/prospects/update-prospect-dialog";
import DeleteProspectDialog from "@/components/prospects/delete-prospect-dialog";

const ProspectsPage = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");
  const { data: prospects } = await getPropects(clerkUser.id);
  const isEmpty = !prospects?.length;

  return (
    <ProspectContextProvider>
      <div className="p-8">
        <InfoBar
          Actions={
            isEmpty ? (
              <></>
            ) : (
              <div className="flex gap-2">
                <UploadProspectSheet />
                <AddProspectDialogButton />
              </div>
            )
          }
        />
        <ProspectsTable prospects={prospects || []} />
        {isEmpty && (
          <NoItemsLayout
            description="Your AI needs a list of prospects to start outreach. Add them to begin engaging potential customers."
            imageUrl="/images/no-prospects.png"
            title="No Prospects Yet!"
            Actions={
              <div className="flex gap-2">
                <UploadProspectSheet />
                <AddProspectDialogButton />
              </div>
            }
          />
        )}
        <AddProspectDialog />
        <UpdateProspectDialog />
        <DeleteProspectDialog />
      </div>
    </ProspectContextProvider>
  );
};

export default ProspectsPage;
