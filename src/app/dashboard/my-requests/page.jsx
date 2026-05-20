"use client";
import { useSession } from "@/app/lib/auth-client";
import { useEffect, useState } from "react";

const MyRequestPage = () => {
  const { data: sessionData } = useSession();
  const userInfo = sessionData?.user;
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!userInfo?.id) return;

    const fetchMyRequests = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/adoptionrequests/user/${userInfo.id}`,
        );
        if (!res.ok) throw new Error("Failed to fetch requests");
        const data = await res.json();
        setMyRequests(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load adoption requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyRequests();
  }, [userInfo?.id]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-white/60 animate-pulse">Loading your listings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-rose-400">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {myRequests.length === 0 ? (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
          <p className="text-white/60">
            You have not submitted any adoption requests yet.
          </p>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col gap-4 p-4 bg-slate-950">
          {myRequests.map((request) => (
            <div key={request._id} className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-800 rounded-lg">
              <h3 className="text-lg font-bold text-white">
                {request.petName}
              </h3>
              <p className="text-gray-400">
                Created: {new Date(request.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-400">
                Pickup Date: {new Date(request.pickupDate).toLocaleDateString()}
              </p>
              <p className="text-gray-400">Status: {request.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequestPage;
