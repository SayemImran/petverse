import React from "react";
import { Quote } from "lucide-react";

export default function SuccessStories() {
  const stories = [
    {
      name: "Milo & The Martins",
      story: "Milo was intensely shy at first. Now, he greets every single house guest with a fiercely wagging tail and boundless energy.",
      tag: "Dog Adoption"
    },
    {
      name: "Luna's Second Chance",
      story: "After spending months bouncing through foster systems, Luna found her forever home and completely rules the local parks.",
      tag: "Cat Adoption"
    },
    {
      name: "Buddy & Sam",
      story: "Buddy stepped in during a quiet phase of life, helping Sam rediscover outdoor hobbies, deep confidence, and a companion.",
      tag: "Puppy Adoption"
    }
  ];

  return (
    <section className="relative py-24 bg-slate-900 text-white border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold">
            <Quote className="w-3 h-3" /> Real Happy Endings
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Success Stories
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Heartwarming journeys from families who discovered their perfect missing puzzles directly through Petverse.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {stories.map((item, idx) => (
            <article 
              key={idx} 
              className="relative p-8 rounded-3xl border border-white/5 bg-slate-950/40 hover:bg-slate-950/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/[0.03] group-hover:text-cyan-500/[0.05] transition-colors duration-300" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded">
                  {item.tag}
                </span>
                <h3 className="text-xl font-bold mt-4 text-slate-100 group-hover:text-white transition-colors">
                  {item.name}
                </h3>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed italic">
                  "{item.story}"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-500 font-medium">Verified Match</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}