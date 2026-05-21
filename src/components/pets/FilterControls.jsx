"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const FilterControls = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state with whatever values are currently in the URL
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [species, setSpecies] = useState(searchParams.get("species") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  // Debounce search input so it doesn't slam your API on every keystroke
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search) params.set("search", search);
      else params.delete("search");

      router.push(`/all-pets?${params.toString()}`);
    }, 400); // Waits 400ms after user stops typing to update URL

    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Handle dropdown selection changes instantly
  const handleSelectChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key === "species") setSpecies(value);
    if (key === "sort") setSort(value);

    router.push(`/all-pets?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-slate-900/50 p-4 rounded-xl border border-white/10">
      {/* Search Input Box */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition"
        />
      </div>

      {/* Species Filter Selection dropdown */}
      <div className="w-full md:w-48">
        <select
          value={species}
          onChange={(e) => handleSelectChange("species", e.target.value)}
          className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition"
        >
          <option value="">All Species</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Bird">Bird</option>
        </select>
      </div>
    </div>
  );
};

export default FilterControls;
