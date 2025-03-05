"use client";

import { Upload } from "lucide-react";
import { useCallback, useState } from "react";

interface FileUploadInputProps {
  onFileSelect: (file: File | null) => void;
  accept?: string; // e.g., ".csv, .xlsx"
}

export default function FileUploadInput({
  onFileSelect,
  accept = "*",
}: FileUploadInputProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Handle file drop
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        onFileSelect(files[0]); // Pass the first file
      }
    },
    [onFileSelect]
  );

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (files[0].size > 5 * 1024 * 1024) return;
      onFileSelect(files[0]);
    } else {
      onFileSelect(null);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-12 text-center ${
        isDragging ? "border-black" : "border-gray-300"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center"
      >
        <Upload size={32} className="text-gray-600" />
        <p className="mt-4">
          {isDragging ? (
            "Drop your file here!"
          ) : (
            <>
              {" "}
              Drag and drop or{" "}
              <span className="text-lime-600">Choose a file</span>
            </>
          )}
        </p>
        <span className="mt-2 inline-block text-sm text-gray-600">
          Max 5.0mb file size
        </span>
      </label>
    </div>
  );
}
