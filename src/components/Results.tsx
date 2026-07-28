import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import supersportLogo from "@/assets/logos/supersport-premijer.png.asset.json";
import enblLogo from "@/assets/logos/enbl.png.asset.json";
import kkcupLogo from "@/assets/logos/kresimir_cosic_cup.png.asset.json";
import youtubeIcon from "@/assets/youtube.png.asset.json";
import sofascoreIcon from "@/assets/sofascore.png.asset.json";

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
    const n = teamName.toLowerCase();
    if (n.includes("alkar")) return "scale-[1.32]";
    if (n.includes("dinamo") || n.includes("dubrava")) return "scale-[0.9]";
    if (n.includes("split")) return "scale-[1.1] -translate-y-[6px]";
    if (n.includes("dubrovnik") || n.includes("šibenka") || n.includes("sibenka") || n.includes("cibona") || n.includes("cedevita")) return "scale-[0.85]";
    return "";
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
                  className={`group flex-shrink-0 card-surface px-4 pt-4 pb-[0.85rem] md:px-6 md:pt-6 md:pb-[1.275rem] border-2 border-primary cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:[box-shadow:0_0_25px_6px_hsl(var(--primary)/0.45)] snap-start ${
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
                    transition: `all 0.5s ease ${index * 0.1}s`,
                    background: 'linear-gradient(135deg, hsl(220 79% 15%) 0%, hsl(217 68% 30%) 50%, hsl(220 79% 12%) 100%)'
                  }}
                >
                  {/* Header with date and link */}
                  <div className="relative z-[60] isolate grid grid-cols-3 items-center gap-3 md:gap-5 mb-3 md:mb-4">
                    <div className="relative z-[60] flex justify-center items-center -translate-x-[15%]">
                      {match.youtubeLink ? (
                        <a
                          href={match.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="relative z-[60] transition-transform hover:scale-110"
                          title="YouTube"
                        >
                          <img loading="lazy" decoding="async" src={youtubeIcon.url} alt="YouTube" className="relative z-[60] h-[1.4375rem] md:h-[1.725rem] w-auto object-contain" />
                        </a>
                      ) : (
                        <img loading="lazy" decoding="async" src={youtubeIcon.url} alt="YouTube" className="relative z-[60] h-[1.4375rem] md:h-[1.725rem] w-auto object-contain opacity-30" />
                      )}
                    </div>
                    <div className="relative z-[60] flex justify-center">
                      <span className="text-[10px] md:text-xs font-medium text-muted-foreground bg-background/50 px-3 py-1 rounded-full whitespace-nowrap">
                        {match.date}
                      </span>
                    </div>
                    <div className="relative z-[60] flex justify-center items-center translate-x-[15%]">
                      <span title="SofaScore" className="relative z-[60] transition-transform group-hover:scale-110 inline-flex">
                        <img loading="lazy" decoding="async" src={sofascoreIcon.url} alt="SofaScore" className="relative z-[60] h-5 md:h-6 w-5 md:w-6 object-contain rounded" />
                      </span>
                    </div>
                  </div>

                  {/* Match content - Teams with logos */}
                  <div>
                    {/* Logos + score, vertically aligned */}
                    <div className="grid grid-cols-3 items-center gap-3 md:gap-5">
                      {/* Home Team logo */}
                      <div className="flex justify-center items-center h-12 md:h-16 -translate-x-[15%]">
                        {homeLogo ? (
                          <img loading="lazy" decoding="async"
                            src={homeLogo}
                            alt={match.homeTeam}
                            className={`object-contain flex-shrink-0 h-12 w-12 md:h-16 md:w-16 ${getLogoScale(match.homeTeam)}`}
                          />
                        ) : (
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-[10px] md:text-xs font-bold text-muted-foreground">
                              {match.homeTeam.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>


                      {/* Score */}
                      <div className="justify-self-center flex items-center gap-1.5 md:gap-3 bg-background/40 px-2 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl border border-border/30 h-10 md:h-14">
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

                      {/* Away Team logo */}
                      <div className="flex justify-center items-center h-12 md:h-16 translate-x-[15%]">
                        {awayLogo ? (
                          <img loading="lazy" decoding="async"
                            src={awayLogo}
                            alt={match.awayTeam}
                            className={`object-contain flex-shrink-0 h-12 w-12 md:h-16 md:w-16 ${getLogoScale(match.awayTeam)}`}
                          />
                        ) : (
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-[10px] md:text-xs font-bold text-muted-foreground">
                              {match.awayTeam.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Team names row */}
                    <div className="grid grid-cols-3 items-start gap-3 md:gap-5 mt-1 md:mt-1">
                      <span
                        className={`text-[10px] md:text-xs font-semibold text-center leading-tight -translate-x-[15%] ${
                          match.isHome ? "text-primary" : "text-foreground"
                        } ${match.homeTeam.toLowerCase().includes("alkar") ? "[text-shadow:0_0_10px_hsl(var(--primary)/0.9),0_0_18px_hsl(var(--primary)/0.6)]" : ""}`}
                      >
                        {displayTeamName(match.homeTeam)}
                      </span>
                      <span />
                      <span
                        className={`text-[10px] md:text-xs font-semibold text-center leading-tight translate-x-[15%] ${
                          !match.isHome ? "text-primary" : "text-foreground"
                        } ${match.awayTeam.toLowerCase().includes("alkar") ? "[text-shadow:0_0_10px_hsl(var(--primary)/0.9),0_0_18px_hsl(var(--primary)/0.6)]" : ""}`}
                      >
                        {displayTeamName(match.awayTeam)}
                      </span>
                    </div>


                    {/* Competition label below teams/score */}
                    {match.competition && (
                      <div className="flex justify-center mt-1">
                        {match.competition === "SuperSport PL" ? (
                          <img loading="lazy" decoding="async"
                            src={supersportLogo.url}
                            alt="SuperSport Premijer Liga"
                            className="h-6 md:h-8 object-contain"
                          />
                        ) : match.competition === "ENBL" ? (
                          <img loading="lazy" decoding="async"
                            src={enblLogo.url}
                            alt="European North Basketball League"
                            className="h-6 md:h-8 object-contain"
                          />
                        ) : match.competition === "Krešimir Ćosić Cup" ? (
                          <img loading="lazy" decoding="async"
                            src={kkcupLogo.url}
                            alt="Krešimir Ćosić Cup"
                            className="h-9 md:h-12 object-contain"
                          />

                        ) : (
                          <span className="text-sm md:text-base font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
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
