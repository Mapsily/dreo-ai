"use client"

import { useOutreachContext } from "@/context/outreach-provider";
import { useEffect } from "react";

type Props = {
  outreachRunning: boolean;
};

export default function OutreachUpdater({ outreachRunning }: Props) {
  const { updateOutreachRunning } = useOutreachContext();

  useEffect(() => {
    updateOutreachRunning(outreachRunning);
  }, [outreachRunning]);

  return null;
}
