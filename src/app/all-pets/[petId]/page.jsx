import Image from "next/image";
import React from "react";
import PetAdoptionForm from "@/components/pets/PetAdoptionForm";

const PetDetailsPage = async ({ params }) => {
  const { petId } =await params;
  console.log("atrgeted pet id : ",petId);
  const res = await fetch(`http://localhost:3001/pets/${petId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-16">
        <div className="text-center rounded-3xl border border-white/10 bg-white/5 p-10 text-white shadow-xl backdrop-blur-3xl">
          <p className="text-lg font-semibold">Pet not found</p>
          <p className="mt-2 text-sm text-white/70">Please check the link or go back to the pet list.</p>
        </div>
      </div>
    );
  }

  const pet = await res.json();

  return (
    <div className="min-h-screen bg-slate-950/90 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <span className="inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Pet Details
          </span>
          <h1 className="mt-4 text-4xl font-semibold text-white">{pet.name}</h1>
          <p className="max-w-2xl text-white/70 mt-3">{pet.description || `Discover more about ${pet.name} and submit a request to adopt.`}</p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-3xl">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-950/20 aspect-[16/9]">
              <Image
                src={pet.imageUrl || "/assets/petverse_logo.svg"}
                alt={`Image of ${pet.name}`}
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-6 grid gap-6">
              <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/30 p-5">
                <h2 className="text-xl font-semibold text-white">About {pet.name}</h2>
                <p className="text-sm leading-7 text-white/70">{pet.description || "A wonderful companion waiting for a new home."}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-950/30 p-5">
                  <p className="text-sm text-white/60">Breed</p>
                  <p className="mt-2 text-lg font-semibold text-white">{pet.breed || "Unknown"}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/30 p-5">
                  <p className="text-sm text-white/60">Age</p>
                  <p className="mt-2 text-lg font-semibold text-white">{pet.age || "N/A"}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/30 p-5">
                  <p className="text-sm text-white/60">Gender</p>
                  <p className="mt-2 text-lg font-semibold text-white">{pet.gender || "N/A"}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/30 p-5">
                  <p className="text-sm text-white/60">Location</p>
                  <p className="mt-2 text-lg font-semibold text-white">{pet.location || "Unknown"}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/30 p-5">
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>Adoption Fee</span>
                  <span className="font-semibold text-white">{pet.adoptionFee ? `$${pet.adoptionFee}` : "Free"}</span>
                </div>
              </div>
            </div>
          </div>

          <PetAdoptionForm petName={pet.petName || ""} ownerID={pet.ownerID}/>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;