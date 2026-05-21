import HeroSection from "@/components/hero/HeroSection";
import Image from "next/image";

export default function Home() {
  return <>
  <HeroSection
        title="Find Your Perfect Pet Companion"
        subtitle="Discover adorable pets ready for adoption. Give them a loving home today."
        primaryBtnText="Browse Pets"
        primaryBtnLink="/all-pets"
        secondaryBtnText="Learn More"
        secondaryBtnLink="/about"
        backgroundImage="/assets/hero-bg.jpg"
        showStats={true}
        enableAnimation={true}
      />
  </>;
}
