"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Add Pet", href: "/dashboard/add-pets" },
  { label: "My Requests", href: "/dashboard/my-requests" },
  { label: "My Listings", href: "/dashboard/my-listings" },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-3xl">
          <div className="mb-8 rounded-[1.5rem] border border-white/10 bg-slate-900/50 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
              Petverse
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Dashboard
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Manage pets, track adoption requests, and stay in control of your
              listings.
            </p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-cyan-500/15 text-cyan-200 ring-1 ring-cyan-400/20"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
            <p className="font-semibold text-slate-100">Quick tips</p>
            <p className="mt-3 leading-6 text-slate-400">
              Add new pets with complete info and keep your request list
              organized for faster matches.
            </p>
          </div>
        </aside>

        <main className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-3xl">
          {children}
        </main>
      </div>
    </div>
  );
}
