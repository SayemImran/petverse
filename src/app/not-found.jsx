import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-4 text-center text-white">
      <div className="max-w-xl rounded-3xl border border-white/10 bg-slate-900/90 p-10 shadow-2xl shadow-black/25">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">404</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-slate-300">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Return to the homepage and continue exploring pets for adoption.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
