import PetCard from '@/components/pets/PetCard';
import FilterControls from '@/components/pets/FilterControls';
import React from 'react';

// This is now a standard, synchronous parameter builder since we unwrap the promise early
const fetchPets = async (unwrappedParams) => {
    // Safely extract values with default fallbacks
    const search = unwrappedParams?.search || "";
    const species = unwrappedParams?.species || "";
    const sort = unwrappedParams?.sort || "";
    
    const query = new URLSearchParams({ search, species, sort }).toString();
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pets?${query}`, { cache: 'no-store' });
        
        if (!res.ok) {
            console.error(`Backend returned status code: ${res.status}`);
            return []; // Return empty array safely instead of breaking your whole page
        }
        return await res.json();
    } catch (error) {
        console.error("Could not reach Express backend. Is your server running on port 3001?", error);
        return []; // Return empty array safely during a connection failure
    }
};

// Next.js 15 Server Page
const AllPets = async ({ searchParams }) => {
    // FIX: You MUST await searchParams before reading its keys in Next.js 15
    const resolvedParams = await searchParams;
    const pets = await fetchPets(resolvedParams);

    return (
        <div className="px-4 py-6 bg-slate-950 min-h-screen text-white">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-semibold text-white mb-6">All Pets</h1>

                {/* Interactive Filtering Row Component */}
                <FilterControls />

                {pets.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-slate-900/20">
                        <p className="text-slate-400">No pets found. Check if your backend server is turned on.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {pets.map((pet) => (
                            <PetCard key={pet._id} pet={pet} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllPets;