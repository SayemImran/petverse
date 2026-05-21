import React from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      q: "How do I adopt a pet?",
      a: "Navigate to your desired pet profile list item, click 'Request to Adopt' button to check parameters, fill out the verified multi-stage intake form questionnaire, and wait for coordinates from management."
    },
    {
      q: "Are there adoption fees involved?",
      a: "Yes, fees vary across variable shelter operations. 100% of standard processing fee metrics feed directly back into covering microchipping treatments, dynamic field vaccines, and general habitat care."
    }
  ];

  return (
    <section className="py-24 bg-slate-950 text-white border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-2">
          <HelpCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <h2 className="text-3xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm">
            Everything you need to navigate the Petverse deployment platform mechanics.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details 
              key={idx} 
              className="group p-5 rounded-2xl bg-slate-900 border border-white/5 [&_summary::-webkit-details-marker]:hidden open:border-cyan-500/20 transition-all duration-300"
            >
              <summary className="flex items-center justify-between font-semibold text-base text-slate-200 cursor-pointer list-none select-none group-hover:text-white">
                <span>{faq.q}</span>
                <span className="p-1 rounded-lg bg-white/5 border border-white/10 text-slate-400 group-open:rotate-180 group-hover:text-cyan-400 transition-all duration-200">
                  <ChevronDown className="w-4 h-4" />
                </span>
              </summary>
              <p className="mt-4 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}