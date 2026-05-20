import React from 'react';
import Image from 'next/image';

const loading = () => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-28 h-28 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-md">
                    <Image src="/assets/petverse_logo.svg" alt="logo" width={64} height={64} className="animate-spin-slow" priority />
                </div>

                <div className="text-center">
                    <p className="text-white text-lg font-medium">Loading pets...</p>
                </div>
            </div>
        </div>
    );
};

export default loading;