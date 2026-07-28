import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import teamPhoto from "@/assets/team-photo.jpg";
import { useEffect, useState, useRef } from "react";

const TYPEWRITER_TEXT = "Najveći mali klub na svitu";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const typewriterStarted = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (typewriterStarted.current) return;
    typewriterStarted.current = true;
    
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayedText(TYPEWRITER_TEXT.slice(0, i));
      if (i >= TYPEWRITER_TEXT.length) {
        clearInterval(timer);
        setTimeout(() => setShowCursor(false), 1500);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="pocetna"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "calc(100vh / 0.85)" }}
    >
      {/* Parallax Background Image - Full Width & Centered */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full will-change-transform"
        style={{ 
          backgroundImage: `url(${teamPhoto})`,
          backgroundPosition: 'center center',
          backgroundSize: isMobile ? 'cover' : '140%',
          backgroundRepeat: 'no-repeat',
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/[0.56] via-background/[0.40] to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center -mt-20 md:mt-0">
        <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display tracking-wider mb-4 mt-16 md:mt-0 animate-fade-in-up">
            <span className="text-foreground">KK </span>
            <span className="text-foreground">ALKAR SINJ</span>
          </h1>
          
          <p className="text-[1.85rem] sm:text-[2.15rem] md:text-[2.65rem] text-muted-foreground italic mb-6 sm:mb-8 animate-fade-in-up delay-200" style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic" }}>
            {displayedText}
            {showCursor && <span className="inline-block w-[2px] h-[1em] bg-primary ml-1 animate-pulse align-middle" />}
          </p>

          <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-transparent border-2 border-primary text-primary hover:text-primary-foreground font-display uppercase tracking-widest px-5 py-5 sm:py-7 text-base sm:text-lg transition-all duration-500 w-full sm:w-auto whitespace-nowrap"
              asChild
            >
              <a href="#rezultati">
                <span className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10">Raspored utakmica</span>
              </a>
            </Button>
            <Button
              size="lg"
              className="group relative overflow-hidden bg-transparent border-2 border-primary text-primary hover:text-primary-foreground font-display uppercase tracking-widest px-5 py-5 sm:py-7 text-base sm:text-lg transition-all duration-500 w-full sm:w-auto whitespace-nowrap"
              asChild
            >
              <a href="#kontakt">
                <span className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10">Postani član</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <a
          href="#rezultati"
          className="text-primary animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
