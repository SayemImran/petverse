import HeroSection from "@/components/hero/HeroSection";
import FeaturedPetsSection from "@/components/pets/FeaturedPetsSection";
import WhyAdopt from "@/components/home/WhyAdopt";
import SuccessStories from "@/components/home/SuccessStories";
import PetCareTips from "@/components/home/PetCareTips";
import FAQSection from "@/components/home/FAQSection";
import GetInvolved from "@/components/home/GetInvolved";
import Image from "next/image";

export default function Home() {
  return (
    <>
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
      <FeaturedPetsSection
        title="Our Top Picks"
        subtitle="Carefully selected pets ready for adoption"
        limit={9}
        showViewAll={true}
        viewAllLink="/all-pets"
        enableAnimation={true}
      />
      <WhyAdopt />
      <SuccessStories />
      <PetCareTips />
      <GetInvolved />
      <FAQSection />
    </>
  );
}
