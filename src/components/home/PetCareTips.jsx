import React from "react";
import { Apple, Activity, ShieldCheck } from "lucide-react";

export default function PetCareTips() {
  const tips = [
    {
      icon: <Apple className="w-5 h-5 text-amber-400" />,
      title: "Premium Nutrition",
      desc: "Always select highly age-appropriate raw or balanced food formulas and stick tightly to clean feeding intervals."
    },
    {
      icon: <Activity className="w-5 h-5 text-cyan-400" />,
      title: "Consistent Exercise",
      desc: "Structured daily walks and interactive play modules keep weights low, spirits high, and minds actively tracking."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: "Proactive Vet Care",
      desc: "Keep comprehensive dynamic vaccination schedules, health histories, and basic baseline checkups fully up to date."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Resource Library
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight mt-2">
            Essential Pet Care Tips
          </h2>
          <p className="mt-4 text-slate-400 text-base">
            Practical lifestyle systems to help your newly integrated companion settle smoothly into house parameters.
          </p>
        </div>

        <ul className="grid gap-6 grid-cols-1 md:grid-cols-3 list-none p-0 m-0">
          {tips.map((tip, idx) => (
            <li 
              key={idx} 
              className="p-6 rounded-2xl border border-white/5 bg-gradient-to-r from-white/[0.03] to-white/[0.01] flex gap-4 items-start hover:border-white/10 transition-colors duration-200"
            >
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0">
                {tip.icon}
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-200">{tip.title}</h3>
                <p className="mt-2 text-slate-400 text-sm leading-relaxed">{tip.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}