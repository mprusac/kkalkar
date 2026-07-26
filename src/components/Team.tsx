import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import playerAlkar1 from "@/assets/player-alkar-1.jpg";
import playerAlkar2 from "@/assets/player-alkar-2.jpg";
import playerAlkar3 from "@/assets/player-alkar-3.jpg";
import playerAlkar4 from "@/assets/player-alkar-4.jpg";
import playerAlkar5 from "@/assets/player-alkar-5.png";

interface Player {
  id: number;
  name: string;
  position: string;
  number: string;
  image: string;
  sofascoreLink?: string;
  description?: string;
  stats: {
    ppg?: number;
    rpg?: number;
    apg?: number;
    spg?: number;
    bpg?: number;
    mpg?: string;
  };
}

const players: Player[] = [
  { id: 1, name: "Mirko Jukić", position: "Center", number: "0", image: playerAlkar1, description: "Iskusni centar i pouzdana figura pod košem koji donosi sigurnost i vodstvo mladom sastavu.", stats: { ppg: 8, rpg: 3, apg: 1 } },
  { id: 2, name: "Emanuel Domazet", position: "Guard", number: "4", image: playerAlkar2, description: "Eksplozivni bek s izraženim šuterskim instinktom i sposobnošću da promijeni tijek utakmice.", stats: { ppg: 1, rpg: 1, apg: 0 } },
  { id: 3, name: "Pavle Marčinković", position: "Forward", number: "17", image: playerAlkar3, description: "Mladi krilni igrač iz vlastite škole košarke, atletski nadaren i pun potencijala za budućnost.", stats: { ppg: 9, rpg: 5, apg: 3 } },
  { id: 4, name: "Deantoni Gordon", position: "Guard", number: "14", image: playerAlkar4, description: "Perspektivni bek šuter koji svojom energijom i borbenošću plijeni pažnju u svakoj utakmici.", stats: { ppg: 11, rpg: 5, bpg: 1 } },
  { id: 5, name: "Fabian Šiško", position: "Forward", number: "8", image: playerAlkar5, description: "Svestrani krilni igrač i vođa u svlačionici, s dugom karijerom u hrvatskoj košarci.", stats: { ppg: 8, rpg: 4, apg: 2 } },
  { id: 6, name: "Gabriel Karamarko", position: "Forward", number: "12", image: "", description: "Svestrani krilni igrač koji donosi energiju i borbenost u svakoj utakmici.", stats: { ppg: 4, rpg: 2, apg: 2 } },
  { id: 7, name: "Maksim Matulina", position: "Guard", number: "10", image: "", description: "Mladi bek šuter i perspektivan talent s pozivom u mlade selekcije.", stats: { ppg: 3, rpg: 2, apg: 1 } },
  { id: 8, name: "Tray Hollowell", position: "Guard", number: "3", image: "", description: "Iskusni američki bek koji donosi brzinu, kreativnost i pouzdan šut s distance.", stats: { ppg: 11, rpg: 4, apg: 3 } },
  { id: 9, name: "Ivan Pavela", position: "Guard", number: "07", image: "", description: "Mladi bek koji marljivo gradi svoju ulogu u ekipi, borben na parketu i sve zapaženiji u rotaciji.", stats: { ppg: 0, rpg: 0, apg: 1 } },
  { id: 10, name: "Borna Jurela", position: "Guard", number: "14", image: "", description: "Vjerni igrač poznat po preciznom šutu izvana i preuzimanju napadačke odgovornosti.", stats: { ppg: 4, rpg: 2, apg: 2 } },
  { id: 11, name: "Jarred Hyder", position: "Guard", number: "11", image: "", description: "Kreativan playmaker s izvrsnim osjećajem za igru i sposobnošću stvaranja prilika za suigrače.", stats: { ppg: 7, rpg: 1, apg: 2 } },
  { id: 12, name: "Luka Cvitanović", position: "Guard", number: "9", image: "", description: "Borben bek koji svojom energijom i obranom podiže ritam ekipe na parketu.", stats: { ppg: 6, rpg: 1, apg: 2 } },
  { id: 13, name: "Antonio Klepo", position: "Guard", number: "06", image: "", description: "Mladi krilni igrač koji stječe seniorsko iskustvo, ističe se trudom i potencijalom za prvi tim.", stats: { ppg: 6, rpg: 1, apg: 1 } },
  { id: 14, name: "Duje Brala", position: "Forward", number: "13", image: "", description: "Atletski krilni igrač s dobrim skokom i završnicom pod košem.", stats: { ppg: 11, rpg: 5, apg: 2 } },
  { id: 15, name: "Marijan Mastelić", position: "Guard", number: "16", image: "", description: "Mladi bek koji sazrijeva u seniorskoj konkurenciji i marljivo radi na svom razvoju.", stats: {} },
  { id: 16, name: "Ante Brzović", position: "Center", number: "18", image: "", description: "Visoki centar koji pruža fizičku prisutnost i sigurnost u reketu.", stats: {} },
  { id: 17, name: "Quinton Morton-Robertson", position: "Guard", number: "2", image: "", description: "Brz i eksplozivan bek s dobrim penetracijama i osjećajem za završnicu napada.", stats: {} },
  { id: 18, name: "Terrell Burden", position: "Guard", number: "1", image: "", description: "Kompletan playmaker koji vodi igru s mirnoćom i pouzdano dijeli asistencije.", stats: { ppg: 10, rpg: 3, apg: 4 } },
  { id: 19, name: "Mario Spaleta", position: "Center", number: "22", image: "", description: "Snažan centar s dobrim smislom za obrambeni skok i blokadu šuta.", stats: { ppg: 5, rpg: 3, bpg: 1 } },
  { id: 20, name: "Mladen Tomašević", position: "Guard", number: "15", image: "", description: "Mladi razigravač koji unosi energiju s klupe te sazrijeva u seniorskoj konkurenciji.", stats: { ppg: 5, rpg: 3, apg: 1 } },
  { id: 21, name: "Mario Krešić", position: "Guard", number: "15", image: "", description: "Iskusno ime u sastavu koje pridonosi znanjem i autoritetom.", stats: { ppg: 7, rpg: 5, apg: 2 } },
  { id: 22, name: "Jonathan Cisse", position: "Forward", number: "05", image: "", description: "Atletski krilni igrač, odlikuje ga velika želja za napretkom i požrtvovnost za tim.", stats: { ppg: 3, rpg: 0, apg: 0 } },
  { id: 23, name: "Šime Jusup", position: "Forward", number: "14", image: "", description: "Brzi krilni igrač koji pokazuje zrelost i snalažljivost na terenu.", stats: {} },
  { id: 24, name: "Vlatko Granić", position: "Forward", number: "20", image: "", description: "Perspektivni krilni igrač s dobrim šutom i borbenošću u obrani.", stats: {} },
];

const Team = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { elementRef, isVisible } = useScrollReveal();
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToIndex = (index: number) => {
    const targetCard = cardRefs.current[index];
    if (targetCard && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: targetCard.offsetLeft,
        behavior: "smooth",
      });
    }
    setActiveIndex(index);
  };

  const scroll = (direction: "left" | "right") => {
    if (isMobile) {
      const newIndex = direction === "left" 
        ? Math.max(0, activeIndex - 1) 
        : Math.min(players.length - 1, activeIndex + 1);
      scrollToIndex(newIndex);
    } else if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!isMobile) return;
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const children = cardRefs.current.filter(Boolean);
      let closest = 0;
      let minDist = Infinity;
      children.forEach((child, i) => {
        if (!child) return;
        const dist = Math.abs(child.offsetLeft - container.scrollLeft);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveIndex(closest);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <section id="tim" className="py-20">
      <div 
        ref={elementRef}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="section-title text-center mb-4">
          <span className="section-title-white">NAŠ </span>
          <span className="section-title-gold">TIM</span>
        </h2>

        <p className="text-[hsl(38,75%,45%)] text-center mb-8">
          Prvotimci koji daju sve za boje KK Alkar Sinj
        </p>

        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 bg-secondary rounded-full text-sm font-medium">
          <span className="text-muted-foreground">TRENER:</span>{" "}
            <span className="text-foreground">DAMIR MILAČIĆ</span>
          </span>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-12 md:px-16">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            disabled={isMobile && activeIndex === 0}
            className={`flex absolute left-0 md:left-0 top-[40%] md:top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary items-center justify-center text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all duration-300 shadow-lg ${isMobile && activeIndex === 0 ? 'opacity-40' : ''}`}
          >
            <ChevronLeft size={16} className="md:hidden" />
            <ChevronLeft size={24} className="hidden md:block" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={isMobile && activeIndex === players.length - 1}
            className={`flex absolute right-0 md:right-0 top-[40%] md:top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary items-center justify-center text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all duration-300 shadow-lg ${isMobile && activeIndex === players.length - 1 ? 'opacity-40' : ''}`}
          >
            <ChevronRight size={16} className="md:hidden" />
            <ChevronRight size={24} className="hidden md:block" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-3 md:gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory md:snap-none md:justify-start"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {players.map((player, index) => (
              <div
                key={player.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`group flex-shrink-0 relative bg-gradient-card rounded-lg overflow-hidden transition-all duration-300 md:hover:scale-[1.03] hover-lift border border-transparent hover:border-primary/30 snap-start ${isMobile ? '' : 'w-[calc((100%-5rem)/5)] min-w-[220px]'}`}
                style={{
                  ...(isMobile ? { width: '100%', minWidth: '100%', maxWidth: '100%' } : {}),
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(30px)",
                  transition: `all 0.5s ease ${index * 0.05}s`,
                }}
              >
              {/* Player Number Watermark - Behind image for players with photos, visible for silhouettes */}
                <span className={`player-number font-display ${player.image ? 'opacity-10 -z-10' : 'opacity-30 z-10'}`}>{player.number}</span>

                {/* SofaScore Link */}
                {player.sofascoreLink && (
                  <a
                    href={player.sofascoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 md:top-3 md:right-3 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/80 hover:scale-110 transition-all duration-300 shadow-lg"
                    title="Pogledaj na SofaScore"
                  >
                    <ExternalLink size={20} className="md:hidden" />
                    <ExternalLink size={24} className="hidden md:block" />
                  </a>
                )}

                {/* Player Image */}
                <div className="relative h-[280px] md:h-64 overflow-hidden">
                  {player.image ? (
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-full h-full object-cover object-top scale-[1.03] transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-secondary/80 to-secondary flex items-center justify-center relative">
                      {/* Silhouette */}
                      <svg 
                        viewBox="0 0 100 120" 
                        className="w-32 h-40 text-muted-foreground/40"
                        fill="currentColor"
                      >
                        {/* Head */}
                        <circle cx="50" cy="25" r="18" />
                        {/* Body */}
                        <ellipse cx="50" cy="75" rx="28" ry="35" />
                        {/* Shoulders */}
                        <ellipse cx="50" cy="50" rx="35" ry="12" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                {/* Player Info */}
                <div className="p-4 md:p-4 relative z-10">
                  <span className="text-sm md:text-xs uppercase tracking-wider text-primary">
                    {player.position}
                  </span>
                  <h3 className="text-2xl md:text-xl font-display text-foreground mt-1">
                    {player.name}
                  </h3>

                  {/* Description */}
                  {player.description && (
                    <p className="mt-2 md:mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-3 md:line-clamp-3">
                      {player.description}
                    </p>
                  )}

                  {/* Stats */}
                  {((player.stats.ppg ?? 0) >= 1 || (player.stats.rpg ?? 0) >= 1 || (player.stats.apg ?? 0) >= 1 || (player.stats.spg ?? 0) >= 1 || (player.stats.bpg ?? 0) >= 1) && (
                    <div className={`flex flex-wrap gap-2 ${player.description ? 'md:mt-2' : 'md:mt-4'} mt-3`}>
                      {(player.stats.ppg ?? 0) >= 1 && (
                        <span className="px-2 py-1 bg-primary/20 text-primary text-sm md:text-xs rounded whitespace-nowrap">
                          {player.stats.ppg} PPG
                        </span>
                      )}
                      {(player.stats.rpg ?? 0) >= 1 && (
                        <span className="px-2 py-1 bg-primary/20 text-primary text-sm md:text-xs rounded whitespace-nowrap">
                          {player.stats.rpg} RPG
                        </span>
                      )}
                      {(player.stats.apg ?? 0) >= 1 && (
                        <span className="px-2 py-1 bg-primary/20 text-primary text-sm md:text-xs rounded whitespace-nowrap">
                          {player.stats.apg} APG
                        </span>
                      )}
                      {(player.stats.spg ?? 0) >= 1 && (
                        <span className="px-2 py-1 bg-primary/20 text-primary text-sm md:text-xs rounded whitespace-nowrap">
                          {player.stats.spg} SPG
                        </span>
                      )}
                      {(player.stats.bpg ?? 0) >= 1 && (
                        <span className="px-2 py-1 bg-primary/20 text-primary text-sm md:text-xs rounded whitespace-nowrap">
                          {player.stats.bpg} BPG
                        </span>
                      )}
                    </div>
                  )}


                  {/* Hover yellow line animation */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
