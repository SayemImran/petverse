import React from "react";

const EmptyListings = () => {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center shadow-xl backdrop-blur-3xl">
      <p className="text-4xl mb-4">🐾</p>
      <p className="text-white font-semibold">No requests yet</p>
      <p className="text-sm text-white/60 mt-2">
        When someone requests to adopt your pet, it will appear here.
      </p>
    </div>
  );
};

export default EmptyListings;
