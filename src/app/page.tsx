import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import LatestDropHero from "@/components/Homepage/latestDropHero/LatestDropHero";
import ShopByCategory from "@/components/Homepage/ShopByCategories/ShopByCategory";

export default function Home() {
  return (
    <div>
      <h1 className="text-sm font-bold font-mono">
        <HeroSection />
        <LatestDropHero />
        <ShopByCategory/>
        <LatestDropHero />

      </h1>
    </div>
  );
}
