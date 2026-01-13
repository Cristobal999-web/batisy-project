import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import ProductShowcase from "@/components/ProductShowcase";
import HomeDocks from "@/components/HomeDocks";
import PricingCards from "@/components/PricingCards";
import Subscription from "@/components/Subscription";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <ProductShowcase />
      <HomeDocks />
      <PricingCards />
      <Subscription />
      <Footer />
    </main>
  );
}


