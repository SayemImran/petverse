import Image from "next/image";
import Link from "next/link";
import React from "react";

const PetCard = ({ pet }) => {
  const { petName, age, breed, gender, location, adoptionFee, imageUrl } = pet;

  return (
    <div className="max-w-sm w-full">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg overflow-hidden">
        <div className="h-48 w-full bg-gray-100/10 relative">
          <Image
            src={imageUrl || "/assets/petverse_logo.svg"}
            alt={`Image of ${petName}`}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-white">{petName}</h3>
          <p className="text-sm text-white/80">
            {breed} • {age} • {gender}
          </p>
          <p className="text-sm text-white/70 mt-2">{location}</p>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-white/90 font-medium">
              {adoptionFee ? `$${adoptionFee}` : "Free"}
            </div>

            <div className="flex gap-2">
              <Link href={`/all-pets/${pet._id}`}>
                <button
                  className="px-3 py-1 rounded-md text-white text-sm bg-white/6 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-shadow shadow-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                  aria-label={`View details for ${petName}`}
                >
                  View Details
                </button>
              </Link>
              <Link href="#">
                <button
                  className="px-3 py-1 rounded-md text-white text-sm bg-gradient-to-r from-indigo-500/30 to-cyan-400/30 backdrop-blur-md border border-white/10 hover:from-indigo-500/40 hover:to-cyan-400/40 transition shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300/30"
                  aria-label={`Adopt ${petName}`}
                >
                  Adopt Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
