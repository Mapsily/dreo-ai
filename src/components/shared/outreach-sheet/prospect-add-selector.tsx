import { BookMarked, FileUp, Keyboard } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  onSelect: (type: "manual" | "upload") => void;
};

export default function ProspectAddSelector({ onSelect }: Props) {
  return (
    <div>
      <div className="flex items-start gap-2 mb-4">
        <BookMarked />
        <span>
          <h3 className="font-medium mb-1">Add prospects</h3>
          <p className="text-sm text-gray-400 mb-4">
            Add prospects you want AI agent to contact.
          </p>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onSelect("upload")}
          className="cursor-pointer hover:bg-gray-100 flex flex-col items-center gap-2 border rounded-md p-8 text-center"
        >
          <FileUp size={32} />
          <h3>Upload CSV</h3>
          <p className="text-gray-600 text-sm">
            Upload a csv file and add prospects automatically
          </p>
        </button>
        <button
          onClick={() => onSelect("manual")}
          className="cursor-pointer hover:bg-gray-100 flex flex-col items-center gap-2 border rounded-md p-8 text-center"
        >
          <Keyboard size={32} />
          <h3>Add Manually</h3>
          <p className="text-gray-600 text-sm">
            Type prospects data to add prospects manually
          </p>
        </button>
      </div>
    </div>
  );
}
