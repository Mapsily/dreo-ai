"use client";

import { useState, useEffect } from "react";
import { FileUp } from "lucide-react";
import { Prisma } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

import EditProspectsTable from "./edit-prospects-table";
import { uploadProspects } from "@/actions/prospect";
import FileUploadInput from "../file-upload-input";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "../loader";

interface PredictedData {
  headers: string[];
  rows: Record<string, any>[];
}

type Props = {
  setProspects: Dispatch<SetStateAction<Prisma.ProspectCreateManyInput[]>>;
};

export default function UploadProspects({ setProspects }: Props) {
  const [predictedData, setPredictedData] = useState<PredictedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  // Sync validated data to parent state
  useEffect(() => {
    if (!predictedData) return;
    const finalProspects = predictedData.rows.map((row) => {
      const prospect: Prisma.ProspectCreateManyInput = {
        name: "",
        phone: "",
        userId: "userId",
      };
      predictedData.headers.forEach((header, idx) => {
        const value = row[Object.keys(row)[idx]] || "";
        if (header.toLowerCase() === "name") prospect.name = value;
        if (header.toLowerCase() === "phone") prospect.phone = value;
        if (header.toLowerCase() === "notes") prospect.notes = value;
      });
      return prospect;
    });
    if (Object.keys(errors).length === 0) {
      setProspects(finalProspects);
    }else setProspects([]);
  }, [predictedData, errors]);

  const handleUpload = async (file: File | null) => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadProspects(formData);

      if (res.status === 200 && res.data) {
        setPredictedData(res.data);
        toast({ title: "Success", description: "File uploaded successfully" });
      } else {
        toast({ title: "Error", description: res.message, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!predictedData ? (
        <>
          <div className="flex items-start gap-2 mb-4">
            <FileUp />
            <span>
              <h3 className="font-medium mb-1">Upload Excel, CSV</h3>
              <p className="text-sm text-gray-400 mb-4">Upload a file to add prospects automatically.</p>
            </span>
          </div>
          <Loader loading={loading}>
            <FileUploadInput onFileSelect={handleUpload} accept=".csv, .xlsx" />
          </Loader>
        </>
      ) : (
        <EditProspectsTable predictedData={predictedData} setPredictedData={setPredictedData} setErrors={setErrors} />
      )}
    </div>
  );
}
