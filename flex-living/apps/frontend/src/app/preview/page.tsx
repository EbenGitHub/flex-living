import CorporateHousing from "@/components/CorporateHousing";
import DiscountCards from "@/components/DiscountCard";
import HeroSearch from "./HeroSection";
import NavigationSection from "./NavigationSection";
import ReviewsSection from "./ReviewsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
     <NavigationSection/>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/hero-bedroom.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
              Book
              <br />
              Beautiful Stays
            </h1>
          </div>
          
          <HeroSearch />
        </div>
      </section>

      {/* Discount Cards Section */}
      <DiscountCards />

      {/* Corporate Housing Section */}
      <CorporateHousing />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm opacity-90">
            © 2024 The Flex. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
