"use client";
import React, { Dispatch } from "react";
import { Button } from "./ui/button";
import { Check, X } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { SendApprovalEmail } from "@/emails/resend";
import { toast } from "sonner";

interface RequestCardButtonProps {
  use: "approve" | "reject";
  requestId: string;
}
const RequestCardButton = ({ use, requestId }: RequestCardButtonProps) => {
  const [cause, setCause] = React.useState<string>("");

  const approve = useMutation(api.storeRequest.approveStoreRequest);
  const reject = useMutation(api.storeRequest.rejectStoreRequest);
  const owner = useQuery(api.storeRequest.getStoreOWner, {
    requestId: requestId as Id<"StoreRequests">,
  });
  const handleApprove = async () => {
    const { message, success } = await approve({
      requestId: requestId as Id<"StoreRequests">,
    });
    if (!success) {
      toast.error(message);
      return;
    }
    toast.success("Store request approved successfully");
    SendApprovalEmail(owner?.name as string, owner?.email as string);
  };

  const handleReject = async () => {
    if (cause.trim() === "") {
      toast.error("Please provide a reason for rejection");
      return;
    }
    reject({
      requestId: requestId as Id<"StoreRequests">,
      cause,
    });
  };
  return use === "approve" ? (
    <Button variant={"action"} className="grow-1" onClick={handleApprove}>
      <Check className=" mr-2 size-5" />
      Approve Request
      <span className="sr-only">Approve Request</span>
    </Button>
  ) : (
    <RejectDialog
      cause={cause}
      setCause={setCause}
      ownerName={owner?.name}
      handleReject={handleReject}
    />
  );
};

export default RequestCardButton;

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface RejectDialogProps {
  setCause: Dispatch<React.SetStateAction<string>>;
  cause: string;
  ownerName: string | undefined;
  handleReject: () => void;
}
export function RejectDialog({
  setCause,
  cause,
  ownerName,
  handleReject,
}: RejectDialogProps) {
  if (!ownerName) return;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="grow-1 text-red-400 hover:scale-[1.02] transition-all duration-200"
        >
          <X className="inline mr-2 size-5" />
          Reject Request
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to reject
            <span className="font-semibold text-primary"> {ownerName} </span>
            request
          </AlertDialogTitle>
          <AlertDialogDescription>
            Enter the reason for rejection. This will be sent to the requester
            via email.
          </AlertDialogDescription>
          <Label htmlFor="reason" className="mt-4">
            Reason for rejection
          </Label>
          <Input
            id="reason"
            placeholder="eg. bad store name"
            value={cause}
            onChange={(e) => setCause(e.target.value)}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button asChild variant={"destructive"} onClick={handleReject}>
            <AlertDialogAction>Reject</AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
