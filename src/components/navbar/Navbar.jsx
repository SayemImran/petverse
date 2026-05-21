"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navlink from "../Navlink";
import logo from "../../../public/assets/petverse_logo.svg";
import ProfileDropDown from "./ProfileDropDown";
import { useSession } from "@/app/lib/auth-client";

const Navbar = () => {
  const { data: sessionData, isPending } = useSession();
  const user = sessionData?.user;
  const [isOpen, setIsOpen] = useState(false);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="flex justify-between items-center px-4 sm:px-6 bg-slate-950 backdrop-blur-md border-b border-white/20 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-[60px] h-[60px] sm:w-[90px] sm:h-[90px]">
            <Link href="/">
              <Image src={logo} alt="Logo" width={90} height={90} />
            </Link>
          </div>
          <div className="text-xl sm:text-3xl font-semibold text-white truncate">Petverse</div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block text-white">
          <ul className="flex items-center gap-6">
            <li>
              <Navlink href="/">Home</Navlink>
            </li>
            <li>
              <Navlink href="/all-pets">All pets</Navlink>
            </li>
            <li>
              <Navlink href="/dashboard/my-requests">My requests</Navlink>
            </li>
            <li>
              <Navlink href="/dashboard/add-pets">Add pet</Navlink>
            </li>
            <li>
              <Navlink href="/dashboard/my-listings">My Listings</Navlink>
            </li>
          </ul>
        </div>

        {/* Desktop Auth Buttons & Mobile Hamburger */}
        <div className="flex items-center gap-4">
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!mounted || isPending ? (
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
            ) : user ? (
              <div className="text-white">
                <ProfileDropDown user={user} />
              </div>
            ) : (
              <div className="text-white flex gap-3 items-center">
                <Link href="/login">
                  <button className="px-6 py-2 font-semibold rounded-full bg-white/10 border border-white/20 text-slate-100 hover:bg-white/20 hover:border-cyan-300/50 backdrop-blur-md transition">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-6 py-2 font-semibold rounded-full bg-gradient-to-r from-cyan-400/90 to-blue-500/90 text-slate-950 hover:from-cyan-300 hover:to-blue-400 backdrop-blur-md transition shadow-lg">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col gap-1.5 text-white"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-all ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/20">
          <ul className="flex flex-col gap-4 px-4 py-6 text-white">
            <li>
              <Navlink href="/" onClick={closeMenu}>
                Home
              </Navlink>
            </li>
            <li>
              <Navlink href="/all-pets" onClick={closeMenu}>
                All pets
              </Navlink>
            </li>
            <li>
              <Navlink href="/dashboard/my-requests" onClick={closeMenu}>
                My requests
              </Navlink>
            </li>
            <li>
              <Navlink href="/dashboard/add-pets" onClick={closeMenu}>
                Add pet
              </Navlink>
            </li>
            <li>
              <Navlink href="/dashboard/my-listings" onClick={closeMenu}>
                My Listings
              </Navlink>
            </li>
          </ul>

          {/* Mobile Auth Section */}
          <div className="border-t border-white/20 px-4 py-4">
            {!mounted || isPending ? (
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
            ) : user ? (
              <div className="text-white">
                <ProfileDropDown user={user} />
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/login" className="w-full" onClick={closeMenu}>
                  <button className="w-full px-6 py-2 font-semibold rounded-full bg-white/10 border border-white/20 text-slate-100 hover:bg-white/20 hover:border-cyan-300/50 backdrop-blur-md transition">
                    Login
                  </button>
                </Link>
                <Link href="/register" className="w-full" onClick={closeMenu}>
                  <button className="w-full px-6 py-2 font-semibold rounded-full bg-gradient-to-r from-cyan-400/90 to-blue-500/90 text-slate-950 hover:from-cyan-300 hover:to-blue-400 backdrop-blur-md transition shadow-lg">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;