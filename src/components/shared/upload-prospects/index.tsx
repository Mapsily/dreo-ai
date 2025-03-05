"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import EditProspectsTable from "./edit-prospects-table";
import { uploadProspects } from "@/actions/prospect";
import { FileUp } from "lucide-react";
import FileUploadInput from "../file-upload-input.tsx";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "../loader";
import { Prisma } from "@prisma/client";

interface PredictedData {
  headers: string[];
  rows: Record<string, any>[];
}

type Props = {
  setProspects: Dispatch<SetStateAction<Prisma.ProspectCreateManyInput[]>>;
};

export default function UploadProspects({ setProspects }: Props) {
  const [predictedData, setPredictedData] = useState<PredictedData | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // sync data to hook
  useEffect(() => {
    if (!predictedData) return;
    const finalProspects = predictedData?.rows.map((row) => {
      const prospect: Prisma.ProspectCreateManyInput = {
        name: "",
        phone: "",
        userId: "userId", // mock for further validation
      };
      predictedData?.headers.forEach((header, idx) => {
        if (header !== "Unknown") {
          const value = row[Object.keys(row)[idx]];
          if (header.toLowerCase() === "name") prospect.name = value || "";
          if (header.toLowerCase() === "phone") prospect.phone = value || "";
          if (header.toLowerCase() === "notes") prospect.notes = value || "";
        }
      });
      return prospect;
    });
    setProspects(finalProspects);
  }, [predictedData]);

  const handleUpload = async (file: File | null) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const res = await uploadProspects(formData);
      if (res.status === 200 && res.data) {
        setPredictedData(res.data);
        toast({ title: "Success", description: "File Uploaded" });
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (editedData: PredictedData) => {
    setPredictedData(editedData);
  };

  return (
    <div>
      {!predictedData ? (
        <>
          <div className="flex items-start gap-2 mb-4">
            <FileUp />
            <span>
              <h3 className="font-medium mb-1">Upload Excel, CSV</h3>
              <p className="text-sm text-gray-400 mb-4">
                Upload a excel or csv file and add prospects automatically
              </p>
            </span>
          </div>
          <Loader loading={loading}>
            <FileUploadInput onFileSelect={handleUpload} accept=".csv, .xlsx" />
          </Loader>
        </>
      ) : (
        <EditProspectsTable
          predictedData={predictedData}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
