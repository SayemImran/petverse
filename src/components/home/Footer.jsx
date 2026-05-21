"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../../../public/assets/petverse_logo.svg";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const subscribe = (e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setEmail("");
            toast.success("Subscribed — check your inbox for updates");
        }, 800);
    };

    return (
        <footer className="mt-12 border-t border-white/10 bg-slate-950 text-slate-200">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12">
                                <Image src={logo} alt="Petverse" width={48} height={48} />
                            </div>
                            <span className="text-lg font-semibold text-white">Petverse</span>
                        </div>
                        <p className="text-sm text-slate-300 max-w-sm">
                            Connecting pets with loving homes. Browse listings, request adoptions,
                            and join a community of animal lovers.
                        </p>
                        <div className="flex gap-3 mt-2">
                            <Link href="#" className="text-slate-300 hover:text-white">
                                <FaFacebookF />
                            </Link>
                            <Link href="#" className="text-slate-300 hover:text-white">
                                <FaTwitter />
                            </Link>
                            <Link href="#" className="text-slate-300 hover:text-white">
                                <FaInstagram />
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 md:col-span-1">
                        <div>
                            <h4 className="font-semibold text-white">Explore</h4>
                            <ul className="mt-3 space-y-2 text-sm">
                                <li>
                                    <Link href="/all-pets" className="hover:underline">
                                        All Pets
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard/add-pets" className="hover:underline">
                                        Add a Pet
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="hover:underline">
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white">Support</h4>
                            <ul className="mt-3 space-y-2 text-sm">
                                <li>
                                    <Link href="/contact" className="hover:underline">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/faq" className="hover:underline">
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="hover:underline">
                                        Terms
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white">Join Our Newsletter</h4>
                        <p className="mt-2 text-sm text-slate-300">Get adoption stories and pet care tips delivered weekly.</p>
                        <form onSubmit={subscribe} className="mt-4 flex gap-2">
                            <input
                                aria-label="Email address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="flex-1 rounded-full px-4 py-2 bg-white/5 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                            <button
                                type="submit"
                                className="rounded-full bg-cyan-500 px-4 py-2 text-slate-950 font-semibold hover:bg-cyan-400 transition"
                                disabled={loading}
                            >
                                {loading ? "..." : "Subscribe"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 border-t border-white/5 pt-6 text-sm text-slate-400 flex flex-col md:flex-row items-center justify-between gap-3">
                    <div>© {new Date().getFullYear()} Petverse — All rights reserved.</div>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:underline">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:underline">
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
