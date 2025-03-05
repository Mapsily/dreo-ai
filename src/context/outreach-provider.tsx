"use client";

import React, { createContext, useContext, useState } from "react";

type OutreachContextType = {
  openSheet: boolean;
  openOutreachSheet: () => void;
  closeOutreachSheet: () => void;
};

const OutreachContext = createContext<OutreachContextType | undefined>(
  undefined
);

export const OutreachContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openSheet, setOpenSheet] = useState(false);

  const openOutreachSheet = () => {
    setOpenSheet(true);
  };

  const closeOutreachSheet = () => {
    setOpenSheet(false);
  };

  return (
    <OutreachContext.Provider
      value={{
        openSheet,
        openOutreachSheet,
        closeOutreachSheet,
      }}
    >
      {children}
    </OutreachContext.Provider>
  );
};

export const useOutreachContext = () => {
  const context = useContext(OutreachContext);
  if (!context) {
    throw new Error(
      "useOutreachContext must be used within an OutreachContextProvider"
    );
  }
  return context;
};
