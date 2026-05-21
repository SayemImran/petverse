"use client";
import React from "react";
import { Heart, Sparkles, Home } from "lucide-react";

export default function WhyAdopt() {
  const cards = [
    {
      icon: <Heart className="w-6 h-6 text-pink-400" />,
      title: "Save a Life",
      desc: "Provide a loving home to an animal in need and give them a beautiful second chance at life.",
      accent: "group-hover:border-pink-500/30 group-hover:shadow-[0_0_30px_rgba(244,114,182,0.1)]"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
      title: "Companionship",
      desc: "Pets bring pure joy, healthy routines, and unconditional love straight into your daily household.",
      accent: "group-hover:border-cyan-500/30 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]"
    },
    {
      icon: <Home className="w-6 h-6 text-emerald-400" />,
      title: "Support Shelters",
      desc: "Free up vital space, workload, and resources for local welfare operations to rescue more animals.",
      accent: "group-hover:border-emerald-500/30 group-hover:shadow-[0_0_30px_rgba(52,211,153,0.1)]"
    }
  ];

  return (
    <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
      {/* Ambient BG Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full">
              Make a Difference
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mt-3 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Why Adopt Pets?
            </h2>
          </div>
          <p className="text-slate-400 max-w-xl text-lg leading-relaxed border-l-2 border-white/10 pl-6">
            Adopting gives an animal a true family and fills your home with irreplaceable memories. 
            Shelters care for beautiful souls of all backgrounds waiting for you.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className={`group p-8 rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.07] to-transparent backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${card.accent}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 transition-transform duration-300 group-hover:scale-110">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold mt-6 text-white group-hover:text-cyan-300 transition-colors">
                {card.title}
              </h3>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}