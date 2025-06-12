import { RequestCardType } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Calendar, Clock, Mail, MapPin, Store, User } from "lucide-react";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

const requestDataCard = ({ requestData }: { requestData: RequestCardType }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "APPROVED":
        return "bg-green-100 text-green-800 border-green-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
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
        <div className="flex flex-col gap-4">
          <div className="relative w-full h-[200px]">
            <Image
              src={requestData.storeImage || ""}
              alt={requestData.storeName}
              fill
              style={{ objectFit: "cover" }}
              quality={100}
            />
          </div>
          <h3 className="text-xl font-semibold flex items-center">
            <Store className="inline mr-1 text-primary" />
            {requestData.storeName}
          </h3>
          <p className="break-words">{requestData.bio}</p>
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
      </CardContent>
      {/* admin response */}
      {requestData.responseBy ? (
        <CardFooter className="flex flex-col items-start gap-4 w-full border  border-primary/80 bg-primary/10 rounded-lg p-4">
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
