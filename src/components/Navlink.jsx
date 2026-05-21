"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = ({ href, children, onClick }) => {
  const pathname = usePathname();
  const isActive = href === pathname;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${isActive ? "px-3 py-2 font-semibold rounded-full bg-white/10 border border-white/20 text-slate-100 hover:bg-white/20 hover:border-cyan-300/50 backdrop-blur-md transition" : ""}`}
    >
      {children}
    </Link>
  );
};

export default Navlink;
