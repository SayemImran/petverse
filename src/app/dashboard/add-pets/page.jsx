"use client";
import { useSession } from "@/app/lib/auth-client";
import { FloppyDisk } from "@gravity-ui/icons";
import React, { useState, useEffect } from "react";

const AddPetsPage = () => {
  const { data: sessionData } = useSession();
  const userInfo = sessionData?.user;

  const [form, setForm] = useState({
    petName: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    imageUrl: "",
    healthStatus: "",
    vaccinationStatus: "",
    location: "",
    adoptionFee: "",
    description: "",
    ownerID: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (userInfo?.id) {
      setForm((prev) => ({ ...prev, ownerID: userInfo.id }));
    }
  }, [userInfo?.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { ...form, ownerID: userInfo?.id || "" };
    console.log("Submitting pet data: ", data);

    try {
      const response = await fetch("http://localhost:3001/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add pet");
      }

      const result = await response.json();
      console.log("Pet added successfully: ", result);
      setSuccessMessage("Pet added successfully!");

      setForm({
        petName: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
        imageUrl: "",
        healthStatus: "",
        vaccinationStatus: "",
        location: "",
        adoptionFee: "",
        description: "",
        ownerID: userInfo?.id || "",
      });
    } catch (err) {
      console.error("Error adding pet: ", err);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-12 px-4">
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-3xl">
          <div className="mb-8 space-y-2 text-center">
            <h1 className="text-3xl font-semibold text-white">Add New Pet</h1>
            <p className="text-slate-300">Fill in the pet details below</p>
          </div>

          {successMessage && (
            <div className="mb-6 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-emerald-200">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-4 lg:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-200">
                  Pet Name
                </span>
                <input
                  type="text"
                  name="petName"
                  value={form.petName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-200">
                  Species
                </span>
                <select
                  name="species"
                  value={form.species}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                >
                  <option value="">Select species</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Reptile">Reptile</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-200">
                  Breed
                </span>
                <input
                  type="text"
                  name="breed"
                  value={form.breed}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-200">Age</span>
                <input
                  type="number"
                  name="age"
                  min="0"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </label>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-200">
                  Gender
                </span>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-200">
                  Image URL
                </span>
                <input
                  type="url"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </label>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-200">
                  Health Status
                </span>
                <input
                  type="text"
                  name="healthStatus"
                  value={form.healthStatus}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-200">
                  Vaccination Status
                </span>
                <select
                  name="vaccinationStatus"
                  value={form.vaccinationStatus}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                >
                  <option value="">Select status</option>
                  <option value="Up to date">Up to date</option>
                  <option value="Partial">Partial</option>
                  <option value="Not vaccinated">Not vaccinated</option>
                </select>
              </label>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-200">
                  Location
                </span>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-200">
                  Adoption Fee
                </span>
                <input
                  type="number"
                  name="adoptionFee"
                  min="0"
                  step="any"
                  value={form.adoptionFee}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </label>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-200">
                  Description
                </span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-200">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={userInfo?.email ?? ""}
                  readOnly
                  className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2 text-slate-100 outline-none cursor-not-allowed opacity-75"
                />
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 font-semibold text-white transition hover:from-cyan-400 hover:to-blue-500"
              >
                <FloppyDisk className="mr-2 inline-block" />
                Save Pet
              </button>
              <button
                type="reset"
                className="flex-1 rounded-lg border border-white/10 bg-slate-800/50 px-6 py-2 font-semibold text-slate-200 transition hover:bg-slate-800"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPetsPage;
