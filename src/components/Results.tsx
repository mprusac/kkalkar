import { ChevronLeft, ChevronRight, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import supersportLogo from "@/assets/logos/supersport-premijer.png.asset.json";
import sofascoreLogo from "@/assets/logos/sofascore.png.asset.json";
import { fetchMatches, getTeamLogoFor, type DisplayMatch } from "@/lib/adminMatches";

const displayTeamName = (name: string) =>
  name === "KK Alkar Sinj" ? "KK Alkar" : name;

const Results = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { elementRef, isVisible } = useScrollReveal();
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [results, setResults] = useState<DisplayMatch[]>([]);

  useEffect(() => {
    fetchMatches()
      .then((all) => setResults(all.filter((m) => !m.isUpcoming)))
      .catch(() => setResults([]));
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToIndex = (index: number) => {
    const boundedIndex = Math.max(0, Math.min(index, results.length - 1));
    const targetCard = cardRefs.current[boundedIndex];
    const container = scrollRef.current;

    if (targetCard && container) {
      container.scrollTo({
        left: targetCard.offsetLeft,
        behavior: "smooth",
      });
    }

    setActiveIndex(boundedIndex);
  };

  const scroll = (direction: "left" | "right") => {
    if (direction === "left") {
      scrollToIndex(activeIndex - 1);
      return;
    }

    scrollToIndex(activeIndex + 1);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentLeft = container.scrollLeft;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const distance = Math.abs(card.offsetLeft - currentLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const getTeamLogo = (teamName: string, match: DisplayMatch) => {
    return getTeamLogoFor(match, teamName);
  };

  const getLogoScale = (teamName: string) => {
    if (teamName.includes("Alkar")) return "w-14 h-14 md:w-20 md:h-20 scale-[1.3]";
    if (teamName.includes("Posušje")) return "w-10 h-10 md:w-14 md:h-14 scale-[0.85] translate-y-[2px]";
    if (teamName.includes("Široki")) return "w-10 h-10 md:w-14 md:h-14 scale-[1.3]";
    if (teamName.includes("Ljubuš")) return "w-10 h-10 md:w-14 md:h-14 scale-[1.1]";
    if (teamName.includes("Mostar")) return "w-10 h-10 md:w-14 md:h-14 scale-[0.95] translate-y-[2px]";
    if (teamName.includes("Rama")) return "w-10 h-10 md:w-14 md:h-14 scale-[1.3]";
    if (teamName.includes("Grude")) return "w-10 h-10 md:w-14 md:h-14 scale-[1.3]";
    if (teamName.includes("Tomislav")) return "w-10 h-10 md:w-14 md:h-14 scale-[0.95]";
    if (teamName.includes("Čapljina")) return "w-10 h-10 md:w-14 md:h-14 scale-[0.85]";
    return "w-7 h-7 md:w-10 md:h-10";
  };

  return (
    <section id="rezultati" className="py-20">
      <div 
        ref={elementRef}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="section-title text-center mb-4">
          <span className="section-title-white">ZADNJE </span>
          <span className="section-title-gold">UTAKMICE</span>
        </h2>
        <p className="text-[hsl(38,75%,45%)] text-sm md:text-base text-center mb-12 md:mb-16">
          Pregled posljednjih susreta našeg tima
        </p>

        <div className="relative max-w-[1200px] mx-auto px-12 md:px-20">
          {/* Scroll Buttons - Visible on all devices */}
          <button
            onClick={() => scroll("left")}
            disabled={activeIndex === 0}
            className={`flex absolute -left-2 md:left-0 top-[35%] -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary items-center justify-center text-primary-foreground transition-all duration-300 shadow-lg ${
              activeIndex === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-primary/90 hover:scale-110"
            }`}
          >
            <ChevronLeft size={18} className="md:hidden" />
            <ChevronLeft size={24} className="hidden md:block" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={activeIndex === results.length - 1}
            className={`flex absolute -right-2 md:right-0 top-[35%] -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary items-center justify-center text-primary-foreground transition-all duration-300 shadow-lg ${
              activeIndex === results.length - 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-primary/90 hover:scale-110"
            }`}
          >
            <ChevronRight size={18} className="md:hidden" />
            <ChevronRight size={24} className="hidden md:block" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-0 md:gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory md:justify-start"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {results.map((match, index) => {
              const isWin = (match.isHome && match.homeScore > match.awayScore) ||
                (!match.isHome && match.awayScore > match.homeScore);
              const homeLogo = getTeamLogo(match.homeTeam, match);
              const awayLogo = getTeamLogo(match.awayTeam, match);
              
              return (
                <a
                  key={match.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  href={match.sofascoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex-shrink-0 card-surface p-4 md:p-6 border-2 border-primary cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:[box-shadow:0_0_25px_6px_hsl(var(--primary)/0.45)] snap-start ${
                    isWin
                      ? "hover:border-primary"
                      : "hover:border-primary"
                  }`}
                  style={{ 
                    width: isMobile ? '100%' : 'calc((100% - 2.5rem) / 3)',
                    minWidth: isMobile ? '100%' : '260px',
                    maxWidth: isMobile ? '100%' : 'none',
                    flexShrink: 0,
                    animationDelay: `${index * 100}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(30px)",
                    transition: `all 0.5s ease ${index * 0.1}s`
                  }}
                >
                  {/* Header with date and link */}
                  <div className="flex items-center justify-between mb-3 md:mb-5">
                    <div className="flex-1 flex justify-center items-center -translate-x-1 md:-translate-x-2">
                      {match.youtubeLink ? (
                        <a
                          href={match.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-red-600 hover:text-red-500 transition-colors"
                          title="YouTube"
                        >
                          <Youtube size={16} className="md:hidden" />
                          <Youtube size={18} className="hidden md:block" />
                        </a>
                      ) : (
                        <span className="text-red-600/40">
                          <Youtube size={16} className="md:hidden" />
                          <Youtube size={18} className="hidden md:block" />
                        </span>
                      )}
                    </div>
                    <div className="flex-shrink-0 px-2 md:px-4">
                      <span className="text-[10px] md:text-xs font-medium text-muted-foreground bg-background/50 px-2 md:px-3 py-1 rounded-full">
                        {match.date}
                      </span>
                    </div>
                    <div className="flex-1 flex justify-center items-center translate-x-1 md:translate-x-2">
                      <span title="SofaScore" className="opacity-90 group-hover:opacity-100 transition-opacity">
                        <img
                          src={sofascoreLogo.url}
                          alt="SofaScore"
                          className="w-4 h-4 md:w-5 md:h-5 object-contain"
                        />
                      </span>
                    </div>
                  </div>

                  {/* Match content - Teams with logos */}
                  <div>
                    <div className="flex items-center justify-between gap-2 md:gap-4">
                      {/* Home Team */}
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center overflow-hidden">
                          {homeLogo ? (
                            <img 
                              src={homeLogo} 
                              alt={match.homeTeam}
                              className={`object-contain flex-shrink-0 ${getLogoScale(match.homeTeam)}`}
                            />
                          ) : (
                            <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                              <span className="text-[10px] md:text-xs font-bold text-muted-foreground">
                                {match.homeTeam.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <span
                          className={`text-[10px] md:text-xs font-semibold text-center leading-tight mt-1.5 md:mt-2 ${
                            match.isHome ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {displayTeamName(match.homeTeam)}
                        </span>
                      </div>

                      {/* Score */}
                      <div className="flex items-center gap-1.5 md:gap-3 bg-background/40 px-2 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl border border-border/30 h-10 md:h-14">
                        <span
                          className={`text-xl md:text-3xl font-display font-bold ${
                            match.homeScore > match.awayScore
                              ? "text-primary"
                              : "text-white"
                          }`}
                        >
                          {match.homeScore}
                        </span>
                        <span className="text-muted-foreground text-base md:text-xl font-light">:</span>
                        <span
                          className={`text-xl md:text-3xl font-display font-bold ${
                            match.awayScore > match.homeScore
                              ? "text-primary"
                              : "text-white"
                          }`}
                        >
                          {match.awayScore}
                        </span>
                      </div>

                      {/* Away Team */}
                      <div className="flex-1 flex flex-col items-center">
                        <div className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center overflow-hidden">
                          {awayLogo ? (
                            <img 
                              src={awayLogo} 
                              alt={match.awayTeam}
                              className={`object-contain flex-shrink-0 ${getLogoScale(match.awayTeam)}`}
                            />
                          ) : (
                            <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                              <span className="text-[10px] md:text-xs font-bold text-muted-foreground">
                                {match.awayTeam.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <span
                          className={`text-[10px] md:text-xs font-semibold text-center leading-tight mt-1.5 md:mt-2 ${
                            !match.isHome ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {displayTeamName(match.awayTeam)}
                        </span>
                      </div>
                    </div>

                    {/* Competition label below teams/score */}
                    {match.competition && (
                      <div className="flex justify-center mt-2">
                        {match.competition === "SuperSport PL" ? (
                          <img
                            src={supersportLogo.url}
                            alt="SuperSport Premijer Liga"
                            className="h-6 md:h-8 object-contain"
                          />
                        ) : (
                          <span className="text-[8px] md:text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            {match.competition}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>

          {/* Detaljnije button */}
          <div id="home-return-statistics-btn" className="flex justify-center mt-8">
            <Link 
              to="/statistika"
              onClick={() => {
                sessionStorage.setItem("homeScrollY", String(window.scrollY));
                sessionStorage.setItem("homeReturnTarget", "home-return-statistics-btn");
              }}
              className="btn-gold-outline"
            >
              Detaljnije
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
