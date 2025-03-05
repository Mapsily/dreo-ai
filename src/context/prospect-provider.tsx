"use client";

import { Prospect } from "@prisma/client";
import React, { createContext, useContext, useState } from "react";

type ProspectContextType = {
  openAddDialog: boolean;
  openAddProspectDialog: () => void;
  closeAddProspectDialog: () => void;
  openUpdateDialog: boolean;
  openUpdateProspectDialog: (prospect: Prospect) => void;
  closeUpdateProspectDialog: () => void;
  openDeleteDialog: boolean;
  openDeleteProspectDialog: (prospect: Prospect) => void;
  closeDeleteProspectDialog: () => void;
  prospect: Prospect | undefined;
};

const ProspectContext = createContext<ProspectContextType | undefined>(
  undefined
);

export const ProspectContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [prospect, setProspect] = useState<Prospect | undefined>(undefined);

  const openAddProspectDialog = () => {
    setOpenAddDialog(true);
  };

  const closeAddProspectDialog = () => {
    setOpenAddDialog(false);
  };

  const openUpdateProspectDialog = (prospect: Prospect) => {
    setProspect(prospect);
    setOpenUpdateDialog(true);
  };

  const closeUpdateProspectDialog = () => {
    setProspect(undefined);
    setOpenUpdateDialog(false);
  };

  const openDeleteProspectDialog = (prospect: Prospect) => {
    setProspect(prospect);
    setOpenDeleteDialog(true);
  };

  const closeDeleteProspectDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <ProspectContext.Provider
      value={{
        openAddDialog,
        openAddProspectDialog,
        closeAddProspectDialog,
        openUpdateDialog,
        openUpdateProspectDialog,
        closeUpdateProspectDialog,
        openDeleteDialog,
        openDeleteProspectDialog,
        closeDeleteProspectDialog,
        prospect,
      }}
    >
      {children}
    </ProspectContext.Provider>
  );
};

export const useProspectContext = () => {
  const context = useContext(ProspectContext);
  if (!context) {
    throw new Error(
      "useProspectContext must be used within an ProspectContextProvider"
    );
  }
  return context;
};
