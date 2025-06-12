import { RequestCardType } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Calendar,
  Clock,
  Mail,
  MapPin,
  NotebookText,
  Store,
  User,
} from "lucide-react";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import RequestCardButton from "./RequestCardButton";
import { Separator } from "./ui/separator";

const requestDataCard = ({ requestData }: { requestData: RequestCardType }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col gap-4">
          {/* status and date */}
          <div className="flex items-center justify-between">
            <RequestCardStatus status={requestData.status} />
            <span className="text-sm text-gray-500">
              <Calendar className="inline mr-1" />
              {new Date(requestData.createdAt).toLocaleDateString()}
            </span>
          </div>
          <RequestCardAvatar
            email={requestData.requester?.email}
            name={requestData.requester?.name}
            avatar={requestData.requester?.avatar}
            use="requester"
          />
          {/* requester info */}
        </div>
      </CardHeader>
      {/* store info */}
      <CardContent>
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-4 mt-5 ">
            <h3 className="text-xl font-semibold flex items-center">
              <Store className="inline mr-1 text-primary" />
              {requestData.storeName}
            </h3>
            <div className="flex items-center">
              <NotebookText className="inline mr-3 text-purple-300 " />
              <span className="font-semibold mr-2">Bio: </span>

              {requestData.bio}
            </div>
            <div className="flex items-center">
              <Clock className="inline mr-3 text-purple-300 " />
              <span className="font-semibold mr-2">Hours: </span>

              {" " + requestData.workHours}
            </div>
            <div className="flex items-center">
              <MapPin className="inline mr-3 text-green-300 " />
              <span className="font-semibold mr-2">Location: </span>
              {" " + requestData.location}
            </div>
          </div>
          {requestData.storeImage ? (
            <div className="relative  rounded-lg overflow-hidden">
              <Avatar>
                <AvatarImage
                  src={requestData.storeImage}
                  alt="store image"
                  width={400}
                />
              </Avatar>
            </div>
          ) : (
            <p>Request doesn&apos;t include a store image.</p>
          )}
        </div>
      </CardContent>
      {/* admin response */}
      {requestData.responseBy ? (
        <CardFooter className="flex flex-col items-start gap-4 w-full border  border-primary/80 bg-primary/10 rounded-lg p-4 ">
          <p className="text-left">Responded by:</p>
          <RequestCardAvatar
            email={requestData.responseBy?.email}
            name={requestData.responseBy?.name}
            avatar={requestData.responseBy?.avatar}
            use="admin"
          />
          <p>
            {
              // the cause of the rejection
            }
          </p>
        </CardFooter>
      ) : (
        <p className="p-4">No response yet</p>
      )}
      <Separator />
      {requestData.status === "PENDING" && (
        <div className="flex w-full items-center justify-between p-4 gap-4">
          <RequestCardButton use="reject" requestId={requestData._id} />
          <RequestCardButton use="approve" requestId={requestData._id} />
        </div>
      )}
    </Card>
  );
};

interface RequestCardAvatarProps {
  name: string | undefined;
  email: string | undefined;
  avatar?: string;
  use: string; // Assuming 'use' is a prop for some purpose, but not used in the component
}
const RequestCardAvatar = ({
  name,
  email,
  avatar,
  use,
}: RequestCardAvatarProps) => {
  return (
    <div className="w-full flex items-center bg-background/20 gap-4  p-4 rounded-lg">
      <Avatar>
        <AvatarImage
          src={avatar || ""}
          width={50}
          height={50}
          className="rounded-full"
        />
        <AvatarFallback>
          {name ? name.slice(0, 1).toUpperCase() : "U"}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">
          <User className="inline mr-1" />
          {name}
        </h2>
        {use === "requester" && (
          <p className="text-sm text-gray-600">
            <Mail className="inline mr-1" />

            {email}
          </p>
        )}
      </div>
    </div>
  );
};

const RequestCardStatus = ({ status }: { status: string }) => {
  switch (status) {
    case "PENDING":
      return (
        <Skeleton className={`border rounded-md p-2 flex  gap-2 items-center `}>
          <Skeleton className="w-5 h-5 rounded-full bg-gray-200" />
          <p className="text-gray-200">{status}</p>
        </Skeleton>
      );
    case "APPROVED":
      return (
        <div className={`border rounded-md p-2 flex  gap-2 items-center `}>
          <div className="w-5 h-5 rounded-full bg-green-400" />
          <p className="text-green-400">{status}</p>
        </div>
      );
    case "REJECTED":
      return (
        <div className={`border rounded-md p-2 flex  gap-2 items-center `}>
          <div className="w-5 h-5 rounded-full bg-red-400" />
          <p className="text-red-400">{status}</p>
        </div>
      );
    default:
      return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
  }
};
export default requestDataCard;
