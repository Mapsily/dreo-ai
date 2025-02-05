import { MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const ConversationOverview = () => {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-2">
          <MessageCircle />
          <CardTitle>Recent Conversations</CardTitle>
        </div>
        <CardDescription className="text-gray-500">
          recent conversations with AI agent
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        <Table className="bg-white">
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ConversationOverview;
