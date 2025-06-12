"use client";
import React from "react";
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
    reject({
      requestId: requestId as Id<"StoreRequests">,
    });
  };
  return (
    <Button
      className="grow-1"
      variant={use === "reject" ? "action-destructive" : "action"}
      size="lg"
      onClick={use === "approve" ? handleApprove : handleReject}
    >
      {use === "reject" ? (
        <X className="inline mr-2 size-5" />
      ) : (
        <Check className="inline mr-2 size-5" />
      )}

      {use === "approve" ? "Approve" : "Reject"}
    </Button>
  );
};

export default RequestCardButton;
