export default function SuccessStories() {
  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold">Success Stories</h2>
        <p className="mt-4 text-slate-300 max-w-2xl">
          Heartwarming stories from families who found their perfect companions
          through Petverse.
        </p>

        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-3">
          <article className="p-6 rounded-2xl bg-white/5">
            <h3 className="font-semibold">Milo & The Martins</h3>
            <p className="mt-2 text-slate-300 text-sm">Milo was shy at first, now he greets everyone with a wagging tail.</p>
          </article>
          <article className="p-6 rounded-2xl bg-white/5">
            <h3 className="font-semibold">Luna's Second Chance</h3>
            <p className="mt-2 text-slate-300 text-sm">After months in foster care, Luna found a forever home and loves the park.</p>
          </article>
          <article className="p-6 rounded-2xl bg-white/5">
            <h3 className="font-semibold">Buddy & Sam</h3>
            <p className="mt-2 text-slate-300 text-sm">Buddy helped Sam find confidence and a new best friend.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
