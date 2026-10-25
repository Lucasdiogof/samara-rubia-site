import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Areas } from "@/components/sections/Areas";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Journey } from "@/components/sections/Journey";
import { Differentials } from "@/components/sections/Differentials";
import { FaqSection } from "@/components/sections/FaqSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Areas />
      <AboutTeaser />
      <Journey compact />
      <Differentials />
      <FaqSection />
      <LocationSection />
      <FinalCta />
    </>
  );
}
