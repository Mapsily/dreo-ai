"use client";

import React, { createContext, useContext, useState } from "react";

interface ProfileSetupType {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
}

const ProfileSetup = createContext<ProfileSetupType | undefined>(undefined);

export const ProfileSetupContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <ProfileSetup.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </ProfileSetup.Provider>
  );
};

export const useProfileSetupContext = () => {
  const context = useContext(ProfileSetup);
  if (!context) {
    throw new Error(
      "useProfileSetupContext must be used within an ProfileSetupContextProvider"
    );
  }
  return context;
};
