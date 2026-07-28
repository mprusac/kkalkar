import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import News from "@/components/News";
import Results from "@/components/Results";
import Team from "@/components/Team";
import Gallery from "@/components/Gallery";
import Sponsors from "@/components/Sponsors";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import SEO from "@/components/SEO";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Save scroll position continuously on homepage
    const handleScroll = () => {
      sessionStorage.setItem("homeScrollY", String(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Cross-route quick-link target
    const scrollToSection = sessionStorage.getItem("scrollToSection");
    if (scrollToSection) {
      sessionStorage.removeItem("scrollToSection");
      const attempts = [80, 200, 400, 700];
      const timers = attempts.map((d) =>
        setTimeout(() => {
          const el = document.getElementById(scrollToSection);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, d)
      );
      return () => timers.forEach(clearTimeout);
    }

    // Restore scroll position if coming back from a sub-page
    const restoreScroll = sessionStorage.getItem("restoreHomeScroll");
    const savedY = sessionStorage.getItem("homeScrollY");
    const returnTarget = sessionStorage.getItem("homeReturnTarget");

    if (restoreScroll === "true") {
      sessionStorage.removeItem("restoreHomeScroll");
      const attempts = [80, 200, 350, 550, 800];

      const restoreToTarget = () => {
        if (returnTarget) {
          const targetEl = document.getElementById(returnTarget);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "auto", block: "center" });
            return;
          }
        }

        if (savedY) {
          window.scrollTo(0, parseInt(savedY, 10));
        }
      };

      const timers = attempts.map((delay) => setTimeout(restoreToTarget, delay));
      sessionStorage.removeItem("homeReturnTarget");
      return () => timers.forEach((timer) => clearTimeout(timer));
    }

    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Košarkaški klub Alkar Sinj — Službena web stranica"
        description="Službena stranica KK Alkar Sinj. Vijesti, raspored utakmica, rezultati, tablica lige, momčad i škola košarke u Sinju."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Košarkaški klub Alkar Sinj",
          url: "https://kkalkar.hr/",
        }}
      />
      <ScrollProgressBar />
      <Navbar />
      <main style={{ zoom: 0.85 }}>
        <Hero />
        <Results />
        <News />
        <Team />
        <Gallery />
        <About />
        <Sponsors />
        <Contact />
      </main>
      <Footer />

      {/* Fixed social icons - bottom right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="https://www.instagram.com/kk.alkar.official/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="w-11 h-11 rounded-full bg-white border border-[hsl(43,68%,67%)] flex items-center justify-center text-[hsl(38,75%,38%)] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30"

        >
          <Instagram size={20} />
        </a>
        <a
          href="https://www.facebook.com/kk.alkar.official"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="w-11 h-11 rounded-full bg-white border border-[hsl(43,68%,67%)] flex items-center justify-center text-[hsl(38,75%,38%)] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30"
        >
          <Facebook size={20} />
        </a>
      </div>

    </div>
  );
};

export default Index;
