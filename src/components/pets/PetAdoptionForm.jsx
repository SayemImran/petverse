"use client";
import { useSession } from "@/app/lib/auth-client";
import React, { useState } from "react";

const PetAdoptionForm = ({ petName, ownerID }) => {
  const { data: sessionData } = useSession();
  const userInfo = sessionData?.user;
  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userInfo?.id) {
      setErrorMessage("Please sign in to submit an adoption request.");
      setStatusMessage("");
      return;
    }

    if (!pickupDate) {
      setErrorMessage("Please select a pickup date.");
      setStatusMessage("");
      return;
    }

    const payload = {
      petName,
      userName: userInfo.name || "",
      userEmail: userInfo.email || "",
      pickupDate,
      message,
      request_user: userInfo.id,   // current logged-in user's id
      owner_id: ownerID,           // pet owner's id
    };

    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:3001/adoptionrequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit adoption request.");
      }

      setStatusMessage("Your adoption request has been sent successfully.");
      setErrorMessage("");
      setPickupDate("");
      setMessage("");
    } catch (err) {
      console.error("Adoption request error:", err);
      setErrorMessage("Something went wrong. Please try again.");
      setStatusMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-3xl">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
          Adoption Form
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Request Adoption</h2>
        <p className="text-sm text-white/70">
          Please complete the form and we&apos;ll contact you to finalize pickup.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="text-sm text-white/70">Pet Name</span>
          <input
            type="text"
            value={petName}
            readOnly
            className="mt-2 w-full cursor-not-allowed rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-white/60 outline-none shadow-sm shadow-black/10"
          />
        </label>

        <label className="block">
          <span className="text-sm text-white/70">User Name</span>
          <input
            type="text"
            value={userInfo?.name || ""}
            readOnly
            placeholder="Sign in to populate"
            className="mt-2 w-full cursor-not-allowed rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-white/60 outline-none shadow-sm shadow-black/10"
          />
        </label>

        <label className="block">
          <span className="text-sm text-white/70">User Email</span>
          <input
            type="email"
            value={userInfo?.email || ""}
            readOnly
            placeholder="Sign in to populate"
            className="mt-2 w-full cursor-not-allowed rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-white/60 outline-none shadow-sm shadow-black/10"
          />
        </label>

        <label className="block">
          <span className="text-sm text-white/70">Pickup Date</span>
          <input
            type="date"
            value={pickupDate}
            onChange={(event) => setPickupDate(event.target.value)}
            required
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          />
        </label>

        <label className="block">
          <span className="text-sm text-white/70">Message</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={5}
            placeholder="Tell us why you'd like to adopt this pet..."
            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          />
        </label>

        {errorMessage && <p className="text-sm text-rose-300">{errorMessage}</p>}
        {statusMessage && <p className="text-sm text-emerald-300">{statusMessage}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-white/10 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Adopt"}
        </button>
      </form>
    </div>
  );
};

export default PetAdoptionForm;