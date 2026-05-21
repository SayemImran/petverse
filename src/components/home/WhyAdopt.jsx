export default function WhyAdopt() {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold">Why Adopt Pets</h2>
        <p className="mt-4 text-slate-300 max-w-2xl">
          Adopting a pet gives an animal a second chance at life and fills your
          home with love. Shelters and rescues care for animals of all ages
          and backgrounds — adopting helps reduce overpopulation and supports
          local animal welfare efforts.
        </p>

        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-3">
          <div className="p-6 rounded-2xl bg-white/5">
            <h3 className="font-semibold">Save a Life</h3>
            <p className="mt-2 text-slate-300 text-sm">Provide a home to an animal in need.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5">
            <h3 className="font-semibold">Companionship</h3>
            <p className="mt-2 text-slate-300 text-sm">Pets bring joy, routine, and unconditional love.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5">
            <h3 className="font-semibold">Support Shelters</h3>
            <p className="mt-2 text-slate-300 text-sm">Free up space and resources for other animals.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
