export default function FAQSection() {
  return (
    <section className="py-16 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <div className="mt-6 grid gap-4">
          <details className="p-4 rounded-lg bg-white/5">
            <summary className="font-medium">How do I adopt a pet?</summary>
            <p className="mt-2 text-slate-300">Visit the pet's listing, click "Request to Adopt", and follow the form instructions.</p>
          </details>
          <details className="p-4 rounded-lg bg-white/5">
            <summary className="font-medium">Are there adoption fees?</summary>
            <p className="mt-2 text-slate-300">Fees vary by shelter and help cover vaccinations and care.</p>
          </details>
        </div>
      </div>
    </section>
  );
}
