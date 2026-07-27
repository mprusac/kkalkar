import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import playerAlkar1 from "@/assets/player-alkar-1.jpg";
import deantoniGordonAsset from "@/assets/deantoni_gordon.png.asset.json";
const playerAlkar2 = deantoniGordonAsset.url;
import playerAlkar3 from "@/assets/player-alkar-3.jpg";
import playerAlkar4 from "@/assets/player-alkar-4.jpg";
import playerAlkar5 from "@/assets/player-alkar-5.png";
import playerDujeBrala from "@/assets/duje_brala.png.asset.json";
import playerTrayHollowell from "@/assets/tray_hollowell.png.asset.json";
import playerTerrellBurden from "@/assets/terrell_burden.png.asset.json";
import playerPavleMarcinkovic from "@/assets/pavle_marcinkovic.png.asset.json";
import playerFabianSisko from "@/assets/fabian_sisko.png.asset.json";
import playerMirkoJukic from "@/assets/mirko_jukic.png.asset.json";
import playerMarioKresic from "@/assets/mario_kresic.png.asset.json";
import playerJarredHyder from "@/assets/jarred_hyder.png.asset.json";
import playerLukaCvitanovic from "@/assets/luka_cvitanovic.png.asset.json";
import playerAntonioKlepo from "@/assets/antonio_klepo.png.asset.json";
import playerMladenTomasevic from "@/assets/mladen_tomasevic.png.asset.json";
import playerMarioSpaleta from "@/assets/mario_spaleta.png.asset.json";
import playerGabrielKaramarko from "@/assets/gabriel_karamarko.png.asset.json";
import playerBornaJurela from "@/assets/borna_jurela.png.asset.json";
import playerMaksimMatulina from "@/assets/maksim_matulina.png.asset.json";
import playerEmanuelDomazet from "@/assets/emanuel_domazet.png.asset.json";
import playerIvanPavela from "@/assets/ivan_pavela.png.asset.json";
import playerMarijanMastelic from "@/assets/marijan_mastelic.png.asset.json";
import playerAnteBrzovic from "@/assets/ante_brzovic.png.asset.json";
import playerQuintonMorton from "@/assets/quinton_morton.png.asset.json";
import playerVlatkoGranic from "@/assets/vlatko_granic.png.asset.json";

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
  { id: 1, name: "Deantoni Gordon", position: "Center", number: "14", image: playerAlkar2, description: "Snažan američki centar i skakač, najbolji strijelac Alkara i pravi nositelj igre pod košem.", stats: { ppg: 11, rpg: 5, bpg: 1 } },
  { id: 2, name: "Duje Brala", position: "Forward", number: "13", image: playerDujeBrala.url, description: "Zadarski krilni igrač i strijelac, prekaljen u Širokom i Šibeniku, svestran na više pozicija.", stats: { ppg: 11, rpg: 5, apg: 2 } },
  { id: 3, name: "Tray Hollowell", position: "Guard", number: "3", image: playerTrayHollowell.url, description: "Iskusni američki bek i strijelac, dokazan u europskim ligama, glavni ofenzivni adut Alkara.", stats: { ppg: 11, rpg: 4, apg: 3 } },
  { id: 4, name: "Terrell Burden", position: "Guard", number: "1", image: playerTerrellBurden.url, description: "Nizak i brz američki razigravač iz Kennesawa, pravi kreator igre i vođa napada cijele momčadi.", stats: { ppg: 10, rpg: 3, apg: 4 } },
  { id: 5, name: "Pavle Marčinković", position: "Forward", number: "17", image: playerPavleMarcinkovic.url, description: "Iskusni veteran i bivši reprezentativac, vođa i dugogodišnji as hrvatske košarke.", stats: { ppg: 9, rpg: 5, apg: 3 } },
  { id: 6, name: "Fabian Šiško", position: "Forward", number: "8", image: playerFabianSisko.url, description: "Svestran krilni igrač iz splitske škole, vrlo dobar u oba smjera i koristan na više pozicija.", stats: { ppg: 8, rpg: 4, apg: 2 } },
  { id: 7, name: "Mirko Jukić", position: "Center", number: "0", image: playerMirkoJukic.url, description: "Kapetan i dijete kluba, svestran krilni igrač i vođa koji Alkar predano vodi već godinama.", stats: { ppg: 8, rpg: 3, apg: 1 } },
  { id: 8, name: "Mario Krešić", position: "Guard", number: "15", image: playerMarioKresic.url, description: "Mladi centar iz Kaštela s reprezentativnim stažem, čvrst u reketu i sve sigurniji pod košem.", stats: { ppg: 7, rpg: 5, apg: 2 } },
  { id: 9, name: "Jarred Hyder", position: "Guard", number: "11", image: playerJarredHyder.url, description: "Američki bek školovan na NCAA razini, kreativan strijelac i playmaker s bogatim iskustvom.", stats: { ppg: 7, rpg: 1, apg: 2 } },
  { id: 10, name: "Luka Cvitanović", position: "Guard", number: "9", image: playerLukaCvitanovic.url, description: "Iskusan vanjski igrač s dobrim šutem, stigao iz Kvarnera kao pouzdan strijelac i kreator igre.", stats: { ppg: 6, rpg: 1, apg: 2 } },
  { id: 11, name: "Antonio Klepo", position: "Guard", number: "06", image: playerAntonioKlepo.url, description: "Bek šuter iz splitske škole, prošao posudbu u Kaštelima, odličan strijelac s vanjske linije.", stats: { ppg: 6, rpg: 1, apg: 1 } },
  { id: 12, name: "Mladen Tomašević", position: "Guard", number: "15", image: playerMladenTomasevic.url, description: "Domaći visoki igrač i klupsko dijete, dugogodišnji član Alkara pouzdan u reketu i skok igri.", stats: { ppg: 5, rpg: 3, apg: 1 } },
  { id: 13, name: "Mario Spaleta", position: "Center", number: "22", image: playerMarioSpaleta.url, description: "Iskusni pokretljivi centar s vrlo bogatim inozemnim stažem, pouzdan pod košem i u skok igri.", stats: { ppg: 5, rpg: 3, bpg: 1 } },
  { id: 14, name: "Gabriel Karamarko", position: "Forward", number: "12", image: playerGabrielKaramarko.url, description: "Razigravač školovan u Zadru s iskustvom iz Širokog, kreator igre i važan kotačić rotacije.", stats: { ppg: 4, rpg: 2, apg: 2 } },
  { id: 15, name: "Borna Jurela", position: "Guard", number: "24", image: playerBornaJurela.url, description: "Sinjanin i klupsko dijete, povratnik iz Puntamik, borben i koristan playmaker.", stats: { ppg: 4, rpg: 2, apg: 2 } },
  { id: 16, name: "Maksim Matulina", position: "Guard", number: "10", image: playerMaksimMatulina.url, description: "Zadarski bek s iskustvom iz Jazina, energičan rotacijski igrač u vrlo mladom sinjskom sastavu.", stats: { ppg: 3, rpg: 2, apg: 1 } },
  { id: 18, name: "Emanuel Domazet", position: "Guard", number: "1", image: playerEmanuelDomazet.url, description: "Najmlađi domaći bek ponikao u Alkarovoj školi, obećavajući šuter i klupska nada budućnosti.", stats: { ppg: 1, rpg: 1, apg: 0 } },
  { id: 19, name: "Ivan Pavela", position: "Guard", number: "7", image: playerIvanPavela.url, description: "Mladi domaći razigravač ponikao u Alkaru, perspektivan igrač u razvoju pod vodstvom seniora.", stats: { ppg: 0, rpg: 0, apg: 1 } },
  { id: 20, name: "Marijan Mastelić", position: "Guard", number: "14", image: playerMarijanMastelic.url, description: "Vrlo mladi krilni igrač iz Alkarove škole, visoki potencijal u ranoj fazi seniorskog razvoja.", stats: {} },
  { id: 21, name: "Ante Brzović", position: "Center", number: "1", image: playerAnteBrzovic.url, description: "Visoki krilni centar školovan na Charlestonu, izražen šut za tricu i igra s visokog posta.", stats: {} },
  { id: 22, name: "Quinton Morton-Robertson", position: "Guard", number: "00", image: playerQuintonMorton.url, description: "Niski američki razigravač velike brzine, snažan strijelac za tricu i kreator sa NCAA staža.", stats: {} },
  { id: 24, name: "Vlatko Granić", position: "Forward", number: "20", image: playerVlatkoGranic.url, description: "Iskusni krilni centar i pravi povratnik u Sinj, provjerena visina i čvrstina u skoku.", stats: {} },
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
    const maxIndex = isMobile ? players.length - 1 : Math.max(0, players.length - 5);
    const newIndex = direction === "left"
      ? Math.max(0, activeIndex - 1)
      : Math.min(maxIndex, activeIndex + 1);
    scrollToIndex(newIndex);
  };

  useEffect(() => {
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
            disabled={activeIndex === 0}
            className={`flex absolute left-0 md:left-0 top-[40%] md:top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary items-center justify-center text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all duration-300 shadow-lg ${activeIndex === 0 ? 'opacity-40' : ''}`}
          >
            <ChevronLeft size={16} className="md:hidden" />
            <ChevronLeft size={24} className="hidden md:block" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={isMobile ? activeIndex === players.length - 1 : activeIndex >= players.length - 5}
            className={`flex absolute right-0 md:right-0 top-[40%] md:top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary items-center justify-center text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all duration-300 shadow-lg ${(isMobile ? activeIndex === players.length - 1 : activeIndex >= players.length - 5) ? 'opacity-40' : ''}`}
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
                      className={`w-full h-full object-cover object-top transition-transform duration-500 ${
                        player.id === 1
                          ? 'scale-[1.13] translate-y-[5%] group-hover:scale-[1.21]'
                          : player.id === 3
                          ? 'scale-[1.24] translate-y-[5%] group-hover:scale-[1.32]'
                          : player.id === 4
                          ? 'scale-[1.24] translate-y-[5%] group-hover:scale-[1.32]'
                          : player.id === 2
                          ? 'scale-[1.13] translate-y-[2%] group-hover:scale-[1.21]'
                          : player.id === 5
                          ? 'scale-[1.32] translate-y-[12%] group-hover:scale-[1.40]'
                          : player.id === 6
                          ? 'scale-[1.32] translate-y-[12%] group-hover:scale-[1.40]'
                          : player.id === 7
                          ? 'scale-[1.25] translate-y-[10%] group-hover:scale-[1.33]'
                          : player.id === 8
                          ? 'scale-[1.25] translate-y-[7%] group-hover:scale-[1.33]'
                          : player.id === 9
                          ? 'scale-[1.25] translate-y-[12%] group-hover:scale-[1.33]'
                          : player.id === 10
                          ? 'scale-[1.25] translate-y-[7%] group-hover:scale-[1.33]'
                          : player.id === 11
                          ? 'scale-[1.31] translate-y-[10%] group-hover:scale-[1.39]'
                          : player.id === 12
                          ? 'scale-[1.16] translate-y-[5%] group-hover:scale-[1.24]'
                          : player.id === 13
                          ? 'scale-[1.25] translate-y-[5%] group-hover:scale-[1.33]'
                          : player.id === 14
                          ? 'scale-[1.25] translate-y-[8%] group-hover:scale-[1.33]'
                          : player.id === 15
                          ? 'scale-[1.25] translate-y-[8%] group-hover:scale-[1.33]'
                          : player.id === 16
                          ? 'scale-[1.25] translate-y-[3%] group-hover:scale-[1.33]'
                          : player.id === 18
                          ? 'scale-[1.21] translate-y-[8%] group-hover:scale-[1.29]'
                          : player.id === 19
                          ? 'scale-[1.25] translate-y-[8%] group-hover:scale-[1.33]'
                          : player.id === 20
                          ? 'scale-[1.25] translate-y-[11%] group-hover:scale-[1.33]'
                          : player.id === 21
                          ? 'scale-[1.25] translate-y-[12%] group-hover:scale-[1.33]'
                          : player.id === 22
                          ? 'scale-[1.22] translate-y-[8%] group-hover:scale-[1.30]'
                          : player.id === 24
                          ? 'scale-[1.25] translate-y-[10%] group-hover:scale-[1.33]'
                          : 'scale-[1.03] group-hover:scale-110'
                      }`}
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
