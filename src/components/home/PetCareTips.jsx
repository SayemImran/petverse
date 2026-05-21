export default function PetCareTips() {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50/2 to-transparent text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white">Pet Care Tips</h2>
        <p className="mt-4 text-slate-300 max-w-2xl">
          Practical tips to help your new pet settle in and stay healthy.
        </p>

        <ul className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-3 text-slate-300">
          <li className="p-4 rounded-2xl bg-white/5">
            <strong>Nutrition:</strong> Choose age-appropriate food and follow feeding guidelines.
          </li>
          <li className="p-4 rounded-2xl bg-white/5">
            <strong>Exercise:</strong> Daily walks and playtime keep pets happy and fit.
          </li>
          <li className="p-4 rounded-2xl bg-white/5">
            <strong>Vet Care:</strong> Keep vaccinations and checkups up to date.
          </li>
        </ul>
      </div>
    </section>
  );
}
