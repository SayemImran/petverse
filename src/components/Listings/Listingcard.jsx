import React, { useState } from "react";
import RequestModal from "../modals/RequestModal";
import Image from "next/image";
import { Button } from "@heroui/react";

const statusStyles = {
  pending: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  approved: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  rejected: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
};

const ListingCard = ({ req }) => {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl p-5 hover:border-white/20 transition-all duration-300">
      {/* Pet Image Container */}
      <div className="relative w-full h-48 overflow-hidden rounded-xl bg-black/20 mb-4">
        <Image
          src={req.petImage || "/assets/petverse_logo.svg"}
          alt={`Image of ${req.petName}`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-white tracking-wide">{req.petName}</h3>
            <p className="text-sm font-medium text-gray-300 mt-0.5">${req.price}</p>
          </div>
          
          {/* Status Badge */}
          <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              statusStyles[req.status] || statusStyles.pending
            }`}
          >
            {req.status}
          </span>
        </div>

        {/* Modal / Details Row */}
        <div className="p-3 rounded-lg bg-black/10 border border-white/5">
          <RequestModal
            requester={req.userName}
            reqEmail={req.userEmail}
            pickupDate={req.pickupDate}
            message={req.message}
          />
        </div>

        {/* Action Buttons - Clean Grid Layout */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <Button 
            variant="primary" 
            className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            View
          </Button>
          <Button 
            variant="secondary"
            className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/20 backdrop-blur-sm text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            Edit
          </Button>
          <Button 
            variant="danger"
            className="w-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/20 backdrop-blur-sm text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;