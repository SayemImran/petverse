"use client";
import React, { useState } from "react";
import Link from "next/link";
import RequestModal from "../modals/RequestModal";
import Image from "next/image";

const ListingCard = ({ req, onStatusUpdate }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${req.petName}? This action cannot be undone.`,
    );

    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const petId = req.petId || req._id;

      const response = await fetch(`http://localhost:3001/pets/${petId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete record");

      alert("Pet profile successfully deleted.");
      if (onStatusUpdate) onStatusUpdate(); // Reload list
    } catch (err) {
      console.error(err);
      alert("Error removing pet. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/60 shadow-xl overflow-hidden flex flex-col h-full group hover:border-white/20 transition-all duration-300">
      {/* Image Block */}
      <div className="relative h-48 w-full bg-slate-950 overflow-hidden border-b border-white/5">
        {req.petImage ? (
          <Image
            src={req.petImage}
            alt={req.petName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            width={400}
            height={300}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 bg-slate-950 text-sm">
            No image available
          </div>
        )}

        <div className="absolute top-3 right-3">
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md border ${
              req.status === "approved"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : req.status === "rejected"
                  ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/20"
            }`}
          >
            {req.status || "pending"}
          </span>
        </div>
      </div>

      {/* Description Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-white capitalize tracking-wide">
              {req.petName}
            </h3>
            {req.price && (
              <span className="text-cyan-400 font-semibold text-sm bg-cyan-400/10 px-2 py-0.5 rounded-md border border-cyan-400/10">
                ${req.price}
              </span>
            )}
          </div>

          <div className="space-y-1 text-sm text-white/60 pt-1">
            <p>
              <span className="text-white/40 font-medium">Applicant:</span>{" "}
              {req.userName}
            </p>
            <p className="truncate">
              <span className="text-white/40 font-medium">Location:</span>{" "}
              {req.petLocation || "Not specified"}
            </p>
          </div>
        </div>

        {/* NEW CRUD OPERATIONS BUTTON PANEL */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
          {/* View Details Navigation */}
          <Link
            href={`/all-pets/${req.petId || req._id}`}
            className="text-center rounded-lg py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors border border-white/5"
          >
            View
          </Link>

          {/* Edit Routing Trigger */}
          <Link
            href={`/dashboard/edit-pet/${req.petId || req._id}`}
            className="text-center rounded-lg py-2 text-xs font-medium text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors border border-cyan-500/10"
          >
            Edit
          </Link>

          {/* Delete Action Trigger */}
          <button
            disabled={isDeleting}
            onClick={handleDelete}
            type="button"
            className="rounded-lg py-2 text-xs font-medium text-rose-400 bg-rose-500/5 hover:bg-rose-500/10 transition-colors border border-rose-500/10 disabled:opacity-40"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>

        {/* Original Adoption Requests Drawer Trigger */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
          <span className="text-xs text-white/40 font-mono">
            {req.pickupDate
              ? `Pickup: ${new Date(req.pickupDate).toLocaleDateString()}`
              : "No pickup date"}
          </span>

          <RequestModal
            requestId={req._id}
            requester={req.userName}
            reqEmail={req.userEmail}
            pickupDate={req.pickupDate}
            message={req.message}
            onStatusUpdate={onStatusUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
