import { BenefitsBar } from "@/components/home/BenefitsBar";
import { Hero } from "@/components/home/Hero";
import { HomeCarousel } from "@/components/home/HomeCarousel";
import { BolOdeBanner } from "@/components/home/BolOdeBanner";
import { HomeCategories } from "@/components/home/HomeCategories";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-4">
      <BenefitsBar />
      <Hero />
      <HomeCategories />
      <HomeCarousel />
      <BolOdeBanner />
    </div>
  );
}
