"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FeaturedPetsSection = ({
  title = "Featured Pets",
  subtitle = "Meet some of our most lovable companions waiting for their forever homes",
  showViewAll = true,
  viewAllLink = "/all-pets",
  enableAnimation = true,
  limit = 6,
}) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/pets?limit=${limit}`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch pets");
        }

        const data = await response.json();
        // Handle both array and paginated responses
        const petsList = Array.isArray(data)
          ? data
          : data.data || data.pets || [];
        setPets(petsList.slice(0, limit));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching pets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [limit]);

  if (error) {
    return (
      <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/50">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-white/60">
            Unable to load featured pets. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-slate-900/50 overflow-hidden">
      {/* Decorative Elements */}
      {enableAnimation && (
        <>
          <div className="absolute top-20 right-10 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 left-10 w-56 h-56 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 ${enableAnimation ? "animate-fade-in-up" : ""}`}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 md:px-4 py-2 border border-cyan-400/20 mb-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Top Picks
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg">
            {subtitle}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-slate-900/50 animate-pulse"
              >
                <div className="aspect-square bg-slate-800" />
                <div className="p-4 md:p-5 space-y-3">
                  <div className="h-6 bg-slate-800 rounded w-3/4" />
                  <div className="h-4 bg-slate-800 rounded w-1/2" />
                  <div className="h-10 bg-slate-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pets Grid */}
        {!loading && pets.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {pets.map((pet, index) => (
              <div
                key={pet._id || index}
                className={`group rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-cyan-400/30 ${
                  enableAnimation ? "animate-fade-in-up" : ""
                }`}
                style={
                  enableAnimation ? { animationDelay: `${index * 100}ms` } : {}
                }
              >
                {/* Pet Image */}
                <div className="relative overflow-hidden aspect-square bg-slate-900">
                  <Image
                    src={pet.imageUrl || "/assets/petverse_logo.svg"}
                    alt={pet.name || "Pet"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Badge */}
                  <div className="absolute top-3 right-3 bg-cyan-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs md:text-sm font-semibold text-white">
                    {pet.gender || "Pet"}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 md:p-5 space-y-4">
                  {/* Pet Info */}
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {pet.petName || "Unknown Pet"}
                    </h3>
                    <p className="text-sm text-white/60">
                      {pet.breed || "Mixed Breed"}
                    </p>
                  </div>

                  {/* Quick Details Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white/5 p-3 border border-white/10">
                      <p className="text-xs text-white/50">Age</p>
                      <p className="text-sm font-semibold text-white mt-1">
                        {pet.age || "N/A"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/5 p-3 border border-white/10">
                      <p className="text-xs text-white/50">Location</p>
                      <p className="text-sm font-semibold text-white mt-1 truncate">
                        {pet.location || "Unknown"}
                      </p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-white/70">
                        {pet.healthStatus ? "Healthy" : "Check Details"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="text-white/70">
                        {pet.vaccinationStatus ? "Vaccinated" : "Check Details"}
                      </span>
                    </div>
                  </div>

                  {/* Adoption Fee */}
                  {pet.adoptionFee && (
                    <div className="flex items-center justify-between text-sm border-t border-white/10 pt-3">
                      <span className="text-white/60">Adoption Fee</span>
                      <span className="font-bold text-cyan-300">
                        ${pet.adoptionFee}
                      </span>
                    </div>
                  )}

                  {/* View Details Button */}
                  <Link
                    href={`/all-pets/${pet._id}`}
                    className="w-full group/btn inline-flex items-center justify-center px-4 py-3 text-sm md:text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 mt-4"
                  >
                    <span className="flex items-center gap-2">
                      View Details
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && pets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">
              No pets available at the moment
            </p>
          </div>
        )}

        {/* View All Button */}
        {showViewAll && pets.length > 0 && (
          <div className="mt-12 md:mt-16 text-center">
            <Link
              href={viewAllLink}
              className="group inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-semibold text-white border-2 border-cyan-400/40 rounded-full hover:bg-cyan-400/10 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                View All Pets
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* Tailwind Animation Styles */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default FeaturedPetsSection;
