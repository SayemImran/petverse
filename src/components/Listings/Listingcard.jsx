"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

const ListingCard = ({ pet, onOpenRequests, onRefresh }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Guard clause to catch empty items
  if (!pet) return null;

  // Align variables directly with backend 
  const petId = pet._id;
  const petName = pet.petName || "Unnamed Pet";
  const petImageSrc = pet.imageUrl || pet.petImage; 
  const displayPrice = pet.adoptionFee || pet.price; 
  const displayLocation = pet.location || pet.petLocation || "Not specified";
  const activeStatus = pet.status || "Available";

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    setIsDeleting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pets/${petId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete record");

      toast.success("Pet profile successfully deleted.");
      if (onRefresh) onRefresh(); // Fires fetchDashboardData() on parent component
    } catch (err) {
      console.error(err);
      toast.error("Error removing pet. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="rounded-xl border border-white/10 bg-slate-900/60 shadow-xl overflow-hidden flex flex-col h-full group hover:border-white/20 transition-all duration-300">
      
      {/* Visual Image Header */}
      <div className="relative h-48 w-full bg-slate-950 overflow-hidden border-b border-white/5">
        {petImageSrc ? (
          <Image
            src={petImageSrc}
            alt={petName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 bg-slate-950 text-sm">
            No image available
          </div>
        )}

        <div className="absolute top-3 right-3">
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md border ${
              activeStatus === "approved" || activeStatus === "Adopted"
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

      {/* Profile Descriptions Section */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white capitalize tracking-wide truncate max-w-[70%]">
              {petName}
            </h3>
            {displayPrice && (
              <span className="text-cyan-400 font-semibold text-sm bg-cyan-400/10 px-2 py-0.5 rounded-md border border-cyan-400/10">
                ${displayPrice}
              </span>
            )}
          </div>

          <div className="space-y-1 text-sm text-white/60 pt-1">
            <p className="truncate">
              <span className="text-white/40 font-medium">Location:</span>{" "}
              {displayLocation}
            </p>
          </div>
        </div>

        {/* Dashboard CRUD Button Grid Options */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
          <Link
            href={`/all-pets/${petId}`}
            className="text-center rounded-lg py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors border border-white/5"
          >
            View
          </Link>

          <Link
            href={`/dashboard/edit-pets/${petId}`}
            className="text-center rounded-lg py-2 text-xs font-medium text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors border border-cyan-500/10"
          >
            Edit
          </Link>

          <button
            disabled={isDeleting}
            onClick={handleDelete}
            type="button"
            className="rounded-lg py-2 text-xs font-medium text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 transition-colors border border-rose-500/10 disabled:opacity-40"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>

        {/* Action button targeting parent state modal container layout */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-end">
          <button
            onClick={onOpenRequests}
            type="button"
            className="w-full text-center rounded-lg py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-white/10 transition-all shadow-sm"
          >
            Requests
          </button>
        </div>

      </div>
    </div>
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-2xl">
            <div className="space-y-4 text-center">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Confirm Delete</p>
              <h2 className="text-2xl font-semibold text-white">Delete this pet listing?</h2>
              <p className="text-sm text-white/70">
                This action cannot be undone. The pet profile will be permanently removed from your dashboard.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-900 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-400 transition disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Pet"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListingCard;