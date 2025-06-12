"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import RequestCard from "@/components/RequestCard";
import { isAdmin } from "@/lib/auth";
import { notFound } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Filter, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
type OrderBy = "asc" | "desc";
const RequestsPage = () => {
  const [selectedStatus, setSelectedStatus] = React.useState<string>("");
  const [orderBy, setOrderBy] = React.useState<OrderBy>("desc");
  const storeRequests = useQuery(api.storeRequest.getStoreRequests, {
    orderBy,
  });
  const storeRequestsByStatus = useQuery(
    api.storeRequest.getStoreRequestsByStatus,
    {
      status: selectedStatus,
      all: selectedStatus === "",
      orderBy,
    }
  );
  const authUser = useQuery(api.users.current);
  if (!authUser) return;
  if (!isAdmin(authUser)) {
    notFound();
    return null;
  }
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    console.log(value);
  };
  const handleOrderByChange = (value: OrderBy) => {
    setOrderBy(value);
  };
  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">Store Requests</h1>
      <p className="text-gray-600 mb-6">
        Here you can view and manage all store requests.
      </p>
      <div className="flex items-center justify-between p-4 bg-background border  rounded-lg shadow-sm">
        <div className="flex items-center space-x-4">
          {/* Filter by Status */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-300" />
            <span className="text-sm font-medium ">Filter:</span>
            <Select value={selectedStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select requests status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Order By */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="h-4 w-4 text-gray-300" />
            <span className="text-sm font-medium ">Order:</span>
            <Select value={orderBy} onValueChange={handleOrderByChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Descending</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Request Count */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-muted-foreground">
              Requests:
            </span>
            <Badge variant="outline" className="text-sm">
              {selectedStatus === ""
                ? storeRequests?.length
                : storeRequestsByStatus?.length}
            </Badge>
          </div>
        </div>

        {/* Show All Requests Button */}
        <Button
          onClick={() => setSelectedStatus("")}
          variant="outline"
          className="flex items-center space-x-2 hover:scale-[1.02]"
        >
          <List className="h-4 w-4" />
          <span>Show All Requests</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 ">
        {selectedStatus === "" &&
          storeRequests?.map((storeRequest) => (
            <RequestCard
              key={storeRequest._id}
              requestData={{
                ...storeRequest,
                requester: storeRequest.requester
                  ? storeRequest.requester
                  : undefined,
                responseBy: storeRequest.responseBy
                  ? storeRequest.responseBy
                  : undefined,
              }}
            />
          ))}
        {selectedStatus !== "" &&
          storeRequestsByStatus?.map((storeRequest) => (
            <RequestCard
              key={storeRequest._id}
              requestData={{
                ...storeRequest,
                requester: storeRequest.requester
                  ? storeRequest.requester
                  : undefined,
                responseBy: storeRequest.responseBy
                  ? storeRequest.responseBy
                  : undefined,
              }}
            />
          ))}
        {selectedStatus !== "" && storeRequestsByStatus?.length === 0 && (
          <div className="text-center text-muted-foreground">
            No requests found for
            <span className="underline"> {selectedStatus}</span> status
          </div>
        )}
        {selectedStatus === "" && storeRequests?.length === 0 && (
          <div className="text-center">No requests found with any status</div>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
