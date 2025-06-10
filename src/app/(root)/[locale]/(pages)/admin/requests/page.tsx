"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import RequestCard from "@/components/RequestCard";

const RequestsPage = () => {
  const storeRequests = useQuery(api.storeRequest.getStoreRequests);

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Store Requests</h1>
      <p className="text-gray-600 mb-6">
        Here you can view and manage all store requests.
      </p>
      <div className="grid grid-cols-1 ">
        {storeRequests?.map((storeRequest) => (
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
      </div>
    </div>
  );
};

export default RequestsPage;
