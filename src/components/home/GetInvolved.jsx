import React from "react";
import { Users, Gift } from "lucide-react";

export default function GetInvolved() {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Decorative Blur Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
          
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Community Programs
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3">
              Not Ready to Adopt? <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Get Involved Locally</span>
            </h2>
            <p className="mt-4 text-slate-400 leading-relaxed text-sm sm:text-base">
              You can still alter animal welfare vectors. Help local community rescues build modern support structures by volunteering actions, providing fostering environments, or allocating supplies.
            </p>
          </div>

          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2">
            <div className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white">Become a Volunteer</h3>
              </div>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                Spend premium free hours at shelter facilities handling socialization work, administrative data help, or walking routines.
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400">
                  <Gift className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white">Temporary Foster</h3>
              </div>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                Open up spare residential space temporarily to transition rescue selections from facility blocks safely over to permanent adoptions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}