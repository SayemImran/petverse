export default function GetInvolved() {
  return (
    <section className="py-16 bg-gradient-to-b from-cyan-700/10 to-transparent text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold">Get Involved</h2>
        <p className="mt-4 text-slate-300 max-w-2xl">
          Help local rescues by volunteering, fostering, or donating supplies.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <div className="p-6 rounded-2xl bg-white/5 flex-1">
            <h3 className="font-semibold">Volunteer</h3>
            <p className="mt-2 text-slate-300 text-sm">Spend time at shelters walking and socializing animals.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 flex-1">
            <h3 className="font-semibold">Foster</h3>
            <p className="mt-2 text-slate-300 text-sm">Open your home temporarily to help a pet transition to adoption.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
