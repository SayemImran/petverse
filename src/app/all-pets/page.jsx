import PetCard from '@/components/pets/PetCard';
import React from 'react';

const allpets = async ()=>{
    const res = await fetch('http://localhost:3001/pets', {});
    const data = await res.json();
    return data;
}
const AllPets = async () => {
    const pets = await allpets();

    return (
        <div className="px-4 py-6">
            <h1 className="text-2xl font-semibold text-white mb-6">All Pets</h1>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {pets.map((pet) => (
                    <PetCard key={pet._id} pet={pet} />
                ))}
            </div>
        </div>
    );
};

export default AllPets;