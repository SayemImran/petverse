'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HeroSection = ({
  title = "Find Your Perfect Pet Companion",
  subtitle = "Discover adorable pets ready for adoption. Give them a loving home today.",
  primaryBtnText = "Browse Pets",
  primaryBtnLink = "/all-pets",
  secondaryBtnText = "Learn More",
  secondaryBtnLink = "/about",
  backgroundImage = "/assets/petverse_logo.jpg",
  showStats = true,
  enableAnimation = true,
}) => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Hero Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/80 to-slate-900/60" />
      </div>

      {/* Animated Background Elements */}
      {enableAnimation && (
        <>
          <div className="absolute top-10 left-5 md:left-10 w-32 md:w-56 h-32 md:h-56 bg-cyan-500/10 rounded-full blur-3xl animate-pulse z-0" />
          <div className="absolute bottom-10 right-5 md:right-10 w-40 md:w-72 h-40 md:h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse z-0" />
        </>
      )}

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-12 md:pb-24 min-h-screen flex flex-col justify-center">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-6 md:space-y-8 ${enableAnimation ? 'animate-fade-in-up' : ''}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 md:px-4 py-2 border border-cyan-400/20 w-fit">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Welcome to Petverse
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {title}
              </h1>
              <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl">
                {subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
              <Link
                href={primaryBtnLink}
                className="group relative inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {primaryBtnText}
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                href={secondaryBtnLink}
                className="group inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold text-cyan-300 border-2 border-cyan-400/30 rounded-full hover:bg-cyan-400/10 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  {secondaryBtnText}
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Stats Section */}
            {showStats && (
              <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-10">
                <div className="space-y-1 md:space-y-2">
                  <p className="text-2xl md:text-3xl font-bold text-cyan-400">1000+</p>
                  <p className="text-xs md:text-sm text-white/60">Pets Available</p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <p className="text-2xl md:text-3xl font-bold text-cyan-400">5000+</p>
                  <p className="text-xs md:text-sm text-white/60">Happy Homes</p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <p className="text-2xl md:text-3xl font-bold text-cyan-400">98%</p>
                  <p className="text-xs md:text-sm text-white/60">Success Rate</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Content - Hero Image */}
          <div className={`relative hidden lg:block ${enableAnimation ? 'animate-fade-in-right' : ''}`}>
            <div className="relative w-full aspect-square">
              {/* Decorative Elements */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-2xl" />
              
              {/* Image Container */}
              <div className="absolute inset-4 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl">
                <Image
                  src="/assets/petverse_logo.svg"
                  alt="Featured Pet"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-4 md:p-6 shadow-xl">
                <p className="text-xs md:text-sm text-white/70">Featured Pet</p>
                <p className="text-lg md:text-xl font-bold text-white mt-1">Ready to Adopt!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Featured Image */}
        <div className="mt-8 md:mt-0 lg:hidden relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10">
          <Image
            src="/assets/petverse_logo.svg"
            alt="Featured Pet"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>
      </div>

      {/* Scroll Indicator */}
      {enableAnimation && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      )}

      {/* Tailwind Animation Styles */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out 0.2s both;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
