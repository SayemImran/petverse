"use client";
import { useSession } from "@/app/lib/auth-client";
import EmptyListings from "@/components/Listings/Emptylistings";
import ListingCard from "@/components/Listings/Listingcard";
import React, { useEffect, useState } from "react";

const MyListings = () => {
  const { data: sessionData } = useSession();
  const userInfo = sessionData?.user;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userInfo?.id) return;

    const fetchRequests = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/adoptionrequests/owner/${userInfo.id}`,
        );
        if (!res.ok) throw new Error("Failed to fetch requests");
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load adoption requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
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
    <div className="min-h-screen bg-slate-950/90 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <span className="inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Dashboard
          </span>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            My Listings
          </h1>
          <p className="mt-2 text-white/60">
            Adoption requests received for your pets.
          </p>
        </div>

        {requests.length === 0 ? (
          <EmptyListings />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map((req) => (
              <ListingCard key={req._id} req={req} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
