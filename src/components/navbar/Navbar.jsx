"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navlink from "../Navlink";
import logo from "../../../public/assets/petverse_logo.svg";
import ProfileDropDown from "./ProfileDropDown";
import { useSession } from "@/app/lib/auth-client";

const Navbar = () => {
  const { data: sessionData, isPending } = useSession();
  const user = sessionData?.user;
  console.log("Current user is : ", user?.name);
  return (
    <>
      <nav className="flex justify-between items-center px-6 bg-slate-950 backdrop-blur-md border-b border-white/20 py-4">
        <div className="flex items-center gap-2">
          <div>
            <Image src={logo} alt="Logo" width={90} height={90} />
          </div>
          <div className="text-3xl font-semibold text-white">Petverse</div>
        </div>
        <div className="text-white">
          <ul className="flex items-center gap-6">
            <li>
              <Navlink href="/">Home</Navlink>
            </li>
            <li>
              <Navlink href="/all-pets">All pets</Navlink>
            </li>
            <li>
              <Navlink href="/#">My requests</Navlink>
            </li>
            <li>
              <Navlink href="#">Add pet</Navlink>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          {isPending ? (
            // loading state
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
      </nav>
    </>
  );
};

export default Navbar;
