import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { PlusCircle, UserPlus } from "lucide-react";
import ProspectForm from "./prospect-form";

export default function AddProspectDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle /> Add manually
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader className="flex flex-row gap-2 items-start">
          <UserPlus size={24} />
          <div>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              Add new prospect you want AI Agent to contact.
            </DialogDescription>
          </div>
        </DialogHeader>
        <ProspectForm />
      </DialogContent>
    </Dialog>
  );
}
