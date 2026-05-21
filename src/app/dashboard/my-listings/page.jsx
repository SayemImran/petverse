"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/app/lib/auth-client";
import EmptyListings from "@/components/Listings/Emptylistings";
import ListingCard from "@/components/Listings/Listingcard";

const MyListings = () => {
  const { data: sessionData } = useSession();
  const userInfo = sessionData?.user;

  const [pets, setPets] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal  States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPetRequests, setSelectedPetRequests] = useState([]);
  const [activePetName, setActivePetName] = useState("");

  const fetchDashboardData = async () => {
    if (!userInfo?.id) return;
    try {
      const [petsRes, requestsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pets/owner/${userInfo.id}`),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/adoptionrequests/owner/${userInfo.id}`)
      ]);

      if (!petsRes.ok || !requestsRes.ok) throw new Error("Could not pull clean listings data.");

      const petsData = await petsRes.json();
      const requestsData = await requestsRes.json();

      setPets(petsData);
      setAllRequests(requestsData);
    } catch (err) {
      setError("Failed to synchronize active dashboard profile listings.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo?.id) {
      fetchDashboardData();
    }
  }, [userInfo?.id]);

  // Handle opening the modal and filtering requests for a specific pet
  const openRequestsModal = (petId, petName) => {
    const matched = allRequests.filter(req => req.petId === petId);
    setSelectedPetRequests(matched);
    setActivePetName(petName);
    setIsModalOpen(true);
  };



  //  request Approval or Rejection status directly from Modal UI
  const handleRequestAction = async (requestId, actionStatus) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/adoptionrequests/${requestId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: actionStatus })
      });

      if (!res.ok) throw new Error("Could not modify state.");
      
      // Close modal and refresh all data
      setIsModalOpen(false);
      await fetchDashboardData();
    } catch (err) {
      alert("Error handling request status configuration change.");
    }
  };



  // count Stats counters dynamically
  const totalListings = pets.length;
  const availableCount = pets.filter(p => p.status === "Available" || !p.status).length;
  const adoptedCount = pets.filter(p => p.status === "Adopted").length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p className="animate-pulse tracking-widest text-cyan-400">LOADING DATA ENGINE...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-rose-400">
        <p>{error}</p>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-slate-950/95 text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        
        {/* Header Title Section */}
        <div className="mb-10">
          <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded text-xs font-mono tracking-widest uppercase">
            Internal Portal
          </span>
          <h1 className="text-4xl font-extrabold mt-3 tracking-tight">My Listings Dashboard</h1>
        </div>

        {/*  STATS PANEL BLOCK */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-xl">
            <h3 className="text-sm text-slate-400 uppercase tracking-wider">Total Listings</h3>
            <p className="text-3xl font-black text-white mt-1">{totalListings}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-xl">
            <h3 className="text-sm text-emerald-400 uppercase tracking-wider">Available</h3>
            <p className="text-3xl font-black text-emerald-400 mt-1">{availableCount}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-xl">
            <h3 className="text-sm text-amber-500 uppercase tracking-wider">Adopted</h3>
            <p className="text-3xl font-black text-amber-500 mt-1">{adoptedCount}</p>
          </div>
        </div>




        {/* CARDS LISTING VIEW GRID */}
        {pets.length === 0 ? (
          <EmptyListings />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <ListingCard
                key={pet._id}
                pet={pet}
                onOpenRequests={() => openRequestsModal(pet._id, pet.petName)}
                onRefresh={fetchDashboardData}
              />
            ))}
          </div>
        )}





        {/*  ADOPTION REQUESTS MODAL  */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 relative max-h-[85vh] overflow-y-auto shadow-2xl">
              
              <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white">Adoption Submissions</h2>
                  <p className="text-xs text-slate-400 mt-1">Reviewing submissions for: <span className="text-cyan-400 font-semibold">{activePetName}</span></p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white font-bold text-sm bg-slate-800 px-3 py-1.5 rounded-lg transition"
                >
                  ✕ Close
                </button>
              </div>

              {selectedPetRequests.length === 0 ? (
                <p className="text-center py-10 text-slate-500 text-sm">No requests filed for this listing yet.</p>
              ) : (
                <div className="space-y-4">
                  {selectedPetRequests.map((req) => (
                    <div key={req._id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      
                      {/* Submissions Info Detail Block */}
                      <div className="space-y-1">
                        <h4 className="font-semibold text-white text-base">{req.userName}</h4>
                        <p className="text-xs text-slate-400">{req.userEmail}</p>
                        <p className="text-xs text-cyan-400/90 pt-1">
                          🗓 Target Pickup: <span className="font-mono">{req.pickupDate}</span>
                        </p>
                        {req.message && (
                          <p className="text-xs bg-slate-900 text-slate-300 p-2 rounded mt-2 border border-slate-800/60 italic">
                            "{req.message}"
                          </p>
                        )}
                        <div className="pt-2">
                          <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            req.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            req.status === 'rejected' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                            'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            Status: {req.status}
                          </span>
                        </div>
                      </div>



                      {/*  Show Approve/Reject ONLY if status remains pending */}
                      {req.status === "pending" && (
                        <div className="flex sm:flex-col gap-2 shrink-0">
                          <button
                            onClick={() => handleRequestAction(req._id, "approved")}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-lg shadow transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRequestAction(req._id, "rejected")}
                            className="bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 text-slate-300 border border-slate-700 font-bold text-xs px-4 py-2 rounded-lg transition"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyListings;