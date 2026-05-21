"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/app/lib/auth-client";
import Link from "next/link";
import { toast } from "sonner";

const MyRequestPage = () => {
  const { data: sessionData } = useSession();
  const userInfo = sessionData?.user;

  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelingId, setCancelingId] = useState(null);

  const fetchMyRequests = async () => {
    if (!userInfo?.id) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/adoptionrequests/user/${userInfo.id}`,
      );
      if (!res.ok) throw new Error("Failed to fetch requests");
      const data = await res.json();
      setMyRequests(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load adoption requests.");
      toast.error("Failed to load adoption requests. Please refresh.");
    } finally {
      setLoading(false);
    }
  };






  useEffect(() => {
    if (userInfo?.id) {
      fetchMyRequests();
    }
  }, [userInfo?.id]);

  // Handler rule to delete / cancel the active submission safely
  const handleCancelRequest = async (requestId, petName) => {
   

    setCancelingId(requestId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/adoptionrequests/${requestId}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) throw new Error("Failed to delete request resource");

      // Optimistic local state filter update for zero delay reactivity
      setMyRequests((prevRequests) =>
        prevRequests.filter((req) => req._id !== requestId),
      );
      toast.success("Adoption request retracted successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Error canceling request. Please try again later.");
    } finally {
      setCancelingId(null);
    }
  };




  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p className="animate-pulse tracking-widest text-cyan-400 font-mono">
          LOADING REQUEST DATA...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-rose-400">
        <div className="text-center p-6 border border-rose-500/20 rounded-xl bg-rose-500/5">
          <p className="font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950/95 text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header Title Section */}
        <div className="mb-10">
          <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded text-xs font-mono tracking-widest uppercase">
            User Portal
          </span>
          <h1 className="text-4xl font-extrabold mt-3 tracking-tight">
            My Adoption Requests
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Track status changes, manage arrival timelines, or cancel open
            submissions.
          </p>
        </div>

        {myRequests.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-slate-900/20">
            <p className="text-white/40 text-lg">
              You have not submitted any adoption requests yet.
            </p>
            <Link
              href="/all-pets"
              className="mt-4 inline-block text-xs font-semibold px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition"
            >
              Browse Available Pets
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {myRequests.map((request) => {
              const activeStatus = request.status || "pending";

              return (
                <div
                  key={request._id}
                  className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-5 bg-slate-900/60 border border-white/10 rounded-xl hover:border-white/20 transition duration-300 shadow-lg"
                >
                  {/* Info: Pet Name & Status Badge */}
                  <div className="space-y-2 min-w-[200px]">
                    <h3 className="text-xl font-bold text-white capitalize tracking-wide truncate">
                      {request.petName || "Unnamed Pet"}
                    </h3>
                    <div>
                      <span
                        className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider border ${
                          activeStatus === "approved"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : activeStatus === "rejected"
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {activeStatus}
                      </span>
                    </div>
                  </div>

                  {/* Timestamps Section */}
                  <div className="grid grid-cols-2 gap-6 text-sm text-white/70 bg-slate-950/40 p-3 rounded-lg border border-white/5 flex-1 w-full lg:max-w-md">
                    <div>
                      <span className="block text-xs text-white/40 font-medium mb-0.5">
                        Filed On
                      </span>
                      <p className="font-mono text-slate-200">
                        {request.createdAt
                          ? new Date(request.createdAt).toLocaleDateString()
                          : "Recent"}
                      </p>
                    </div>
                    <div>
                      <span className="block text-xs text-white/40 font-medium mb-0.5">
                        Target Pickup
                      </span>
                      <p className="font-mono text-cyan-400 font-semibold">
                        {request.pickupDate
                          ? new Date(request.pickupDate).toLocaleDateString()
                          : "Not specified"}
                      </p>
                    </div>
                  </div>

                  {/* Actions Button Row Control */}
                  <div className="flex items-center gap-2 w-full lg:w-auto shrink-0 justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-white/5">
                    <Link
                      href={`/all-pets/${request.petId}`}
                      className="flex-1 lg:flex-none text-center rounded-lg px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors border border-white/5 whitespace-nowrap"
                    >
                      View Pet
                    </Link>

                    <button
                      disabled={cancelingId === request._id}
                      onClick={() =>
                        handleCancelRequest(request._id, request.petName)
                      }
                      type="button"
                      className="flex-1 lg:flex-none rounded-lg px-4 py-2 text-xs font-semibold text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 disabled:opacity-40 transition-colors whitespace-nowrap"
                    >
                      {cancelingId === request._id
                        ? "Canceling..."
                        : "Cancel Request"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequestPage;
