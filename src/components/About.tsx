import { useCountUp } from "@/hooks/useCountUp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Trophy, Medal, Users, Star } from "lucide-react";
import bihFlag from "@/assets/flags/bih-flag.png";
import croFlag from "@/assets/flags/cro-flag.png";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 1955, label: "GODINA OSNUTKA" },
  { value: 120, suffix: "+", label: "REGISTRIRANIH IGRAČA" },
  { value: 5, label: "UZRASNE KATEGORIJE" },
  { value: 71, label: "GODINA POSTOJANJA" },
];

const maleCategories = [
  "Predkadeti",
  "Kadeti",
  "Juniori",
  "Seniori",
];

const femaleCategories = [
  "Škola košarke",
  "Mlađe kadetkinje",
];


const achievements = [
  {
    title: "FINALIST KUPA JUGOSLAVIJE",
    subtitle: "Sezona 1983./84. — najuspješnija u povijesti kluba",
    description: "Poraz od Bosne u finalu, uz prethodne pobjede protiv Borca, Šibenke i Zadra",
    icon: Trophy,
    emoji: "🏆",
  },
  {
    title: "VIŠEGODIŠNJI SUDIONIK NAJVIŠEG RANGA HRVATSKE KOŠARKE",
    subtitle: "Redoviti član HT/SuperSport Premijer lige",
    description: "Dokazana kvaliteta među najboljim hrvatskim klubovima",
    icon: Trophy,
    emoji: "🏀",
  },
  {
    title: "POVIJESNA POBJEDA PROTIV CIBONE",
    subtitle: "4. ožujka 1995. — pobjeda 81:77 na domaćem terenu",
    description: "Jedna od najpamtljivijih utakmica u klupskoj povijesti",
    icon: Star,
    emoji: "⭐",
  },
  {
    title: "FINALIST KUPA KREŠIMIRA ĆOSIĆA",
    subtitle: "Sezona 2024./25. — poraz od Splita u finalu",
    description: "Potvrda da klub i danas igra na najvišem nivou",
    icon: Medal,
    emoji: "🥈",
  },
  {
    title: "ULAZAK U LIGU ZA PRVAKA HRVATSKE",
    subtitle: "Ostvareno 2011. i ponovno 2013. godine",
    description: "Dokaz kontinuiteta i stabilnosti kluba kroz različite generacije",
    icon: Medal,
    emoji: "🎖️",
  },
  {
    title: "DRES UMIROVLJEN U ČAST LEGENDE KLUBA",
    subtitle: "Broj 5 umirovljen 2020. u čast Mladena Pavića „Kembe\"",
    description: "Igrač, kapetan, trener i sportski direktor kluba",
    icon: Users,
    emoji: "👥",
  },
  {
    title: "VIŠE OD 70 GODINA TRADICIJE",
    subtitle: "Klub osnovan 1955. godine, djeluje neprekidno do danas",
    description: "Ime nosi po Sinjskoj alci, simbolu grada Sinja",
    icon: Trophy,
    emoji: "🏛️",
  },
  {
    title: "ŠKOLA KOŠARKE I RAD S MLAĐIM KATEGORIJAMA",
    subtitle: "Oko 120 registriranih igrača kroz sve uzrasne kategorije",
    description: "Kontinuirano ulaganje u mlade naraštaje i budućnost kluba",
    icon: Users,
    emoji: "🧒",
  },
];

const StatCounter = ({ stat, index }: { stat: StatItem; index: number }) => {
  const { count, elementRef } = useCountUp({ end: stat.value });

  return (
    <div
      ref={elementRef}
      className="text-center group animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="stat-number text-3xl md:text-5xl group-hover:text-primary/80 transition-colors duration-300">
        {count}
        {stat.suffix}
      </div>
      <div className="stat-label text-xs md:text-sm">{stat.label}</div>
    </div>
  );
};

const About = () => {
  const { elementRef: aboutRef, isVisible: aboutVisible } = useScrollReveal();
  const { elementRef: catRef, isVisible: catVisible } = useScrollReveal();
  const { elementRef: achRef, isVisible: achVisible } = useScrollReveal();
  const { elementRef: visRef, isVisible: visVisible } = useScrollReveal();

  return (
    <section id="o-klubu" className="py-20 overflow-hidden">
      {/* Stats */}
      <div className="container mx-auto px-4 mb-12 md:mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <StatCounter key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>

      {/* About Content */}
      <div className="container mx-auto px-4">
        <div 
          ref={aboutRef}
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            aboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="section-title mb-8 md:mb-12 text-center">
            <span className="section-title-white">O </span>
            <span className="section-title-gold">NAMA</span>
          </h2>

          <div className="gold-border-left mb-10 md:mb-16 text-left mx-auto pl-4 md:pl-6 pr-2 md:pr-0" style={{ maxWidth: "800px" }}>
            <p className="text-sm md:text-xl text-[hsl(38,75%,38%)] mb-2 md:mb-3 leading-relaxed">
              <span className="text-primary font-bold">KK Alkar Sinj</span> je hrvatski košarkaški klub iz grada Sinja, osnovan{" "}
              <span className="text-primary font-semibold">1955. godine</span>.
            </p>
            <p className="text-sm md:text-xl text-[hsl(38,75%,38%)] mb-2 md:mb-3 leading-relaxed">
              Klub nosi ime po <span className="text-primary font-semibold">Sinjskoj alci</span> i njeguje <span className="text-primary font-semibold">sedam desetljeća tradicije</span> u najvišem rangu hrvatske košarke.
            </p>
            <p className="text-sm md:text-xl text-[hsl(38,75%,38%)] leading-relaxed">
              Kroz sustavan rad s mlađim kategorijama i predan trenerski rad razvijamo temelje za seniorski tim. Vjernom potporom navijača <span className="text-primary font-semibold">„Maligana"</span> gradimo <span className="text-primary font-semibold">zajedništvo, ponos i pripadnost</span> kroz svaku utakmicu. Zajedno nastavljamo pisati priču o klubu koji je srcem uvijek ostao vezan uz grad Sinj.
            </p>
          </div>

        </div>

        {/* Categories */}
        <div 
          ref={catRef}
          className={`mb-20 max-w-4xl mx-auto transition-all duration-700 ${
            catVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-3xl md:text-4xl font-display text-foreground mb-8 uppercase tracking-wider text-center">
            Selekcije
          </h3>
          
          {/* Muške selekcije */}
          <div className="mb-8">
            <h4 className="text-lg md:text-xl font-semibold text-primary uppercase tracking-widest text-center mb-4 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-primary/50"></span>
              Muške
              <span className="w-8 h-px bg-primary/50"></span>
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {maleCategories.map((category, index) => (
                <div
                  key={category}
                  className="group card-surface-interactive px-4 py-3 text-center font-medium text-foreground hover:bg-primary/20 cursor-default"
                  style={{ 
                    opacity: catVisible ? 1 : 0,
                    transform: catVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.5s ease ${index * 0.1}s`
                  }}
                >
                  <span className="group-hover:text-[hsl(38,75%,38%)] transition-colors duration-300 text-sm md:text-base">
                    {category}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Ženske selekcije */}
          <div>
            <h4 className="text-lg md:text-xl font-semibold text-primary uppercase tracking-widest text-center mb-4 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-primary/50"></span>
              Ženske
              <span className="w-8 h-px bg-primary/50"></span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {femaleCategories.map((category, index) => (
                <div
                  key={category}
                  className={`group card-surface-interactive px-4 py-3 text-center font-medium text-foreground hover:bg-primary/20 cursor-default ${index === 0 ? "md:col-start-2" : ""}`}
                  style={{ 
                    opacity: catVisible ? 1 : 0,
                    transform: catVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.5s ease ${(index + 4) * 0.1}s`
                  }}
                >
                  <span className="group-hover:text-[hsl(38,75%,38%)] transition-colors duration-300 text-sm md:text-base">
                    {category}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Achievements - Vertical Timeline Style */}
        <div 
          ref={achRef}
          className={`mb-12 md:mb-20 w-full flex flex-col items-center transition-all duration-700 ${
            achVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-display mb-6 md:mb-8 uppercase tracking-wider text-center" style={{ color: "#b8860b" }}>
            Postignuća
          </h3>
          <div className="space-y-3 md:space-y-4 max-w-2xl w-full">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={achievement.title}
                  className="group relative flex items-start gap-3 md:gap-4 p-3 md:p-5 rounded-xl md:rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{ 
                    opacity: achVisible ? 1 : 0,
                    transform: achVisible ? "translateX(0)" : "translateX(-30px)",
                    transition: `all 0.5s ease ${index * 0.1}s`,
                    backgroundColor: "#faf3e0",
                    border: "1.5px solid #d4a017",
                    boxShadow: "0 4px 20px rgba(212,160,23,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#fff8e1";
                    e.currentTarget.style.boxShadow = "0 0 24px rgba(212,160,23,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#faf3e0";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,160,23,0.15)";
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                    style={{ backgroundColor: "#f0d78a", border: "1.5px solid #0E2A63" }}
                  >
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6" style={{ color: "#0E2A63" }} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-display text-base md:text-xl tracking-wide leading-tight" style={{ color: "#0E2A63" }}>
                        {achievement.title}
                      </h4>
                      {achievement.emoji === "flags" ? (
                        <span className="flex items-center gap-1">
                          <img src={bihFlag} alt="BiH" className="h-[18px] w-[18px] object-contain rounded-full" />
                          <img src={croFlag} alt="Hrvatska" className="w-5 h-5 object-contain" />
                        </span>
                      ) : (
                        <span className="text-base md:text-lg">{achievement.emoji}</span>
                      )}
                    </div>
                    <p className="font-medium text-xs md:text-sm mb-1" style={{ color: "#0E2A63" }}>
                      {achievement.subtitle}
                    </p>
                    <p className="text-xs md:text-sm" style={{ color: "rgba(14,42,99,0.75)" }}>
                      {achievement.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Vision */}
        <div 
          ref={visRef}
          className={`max-w-4xl mx-auto transition-all duration-700 ${

            visVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div 
            className="relative group p-6 md:p-10 rounded-2xl md:rounded-3xl transition-all duration-300 text-center overflow-hidden border-2 border-primary shadow-lg shadow-primary/30"
            style={{
              background:
                'linear-gradient(160deg, hsl(220 79% 18%) 0%, hsl(217 68% 34%) 55%, hsl(220 79% 14%) 100%)',
            }}
          >
            {/* Golden glow accent */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.25) 0%, transparent 70%)' }} />
            <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(240,215,138,0.18) 0%, transparent 70%)' }} />

            
            <h3 className="text-2xl md:text-4xl font-display mb-4 md:mb-6 tracking-wide relative z-10">
              <span className="text-foreground">NAŠA </span>
              <span className="text-primary">VIZIJA</span>
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed text-sm md:text-lg relative z-10">
              Naša vizija temelji se na <span className="text-primary font-bold">očuvanju tradicije</span> uz kontinuiran razvoj mladih igrača kroz sustavan i kvalitetan rad. Naglašavamo vrijednosti kao što su <span className="text-primary font-bold">upornost, zajedništvo i vjernost klubu</span> u svakom aspektu klupskih aktivnosti. Cilj nam je stvoriti okruženje u kojem svaki mladi igrač može napredovati u vrhunskog sportaša i ponosnog nositelja dresa Alkara. Kroz ulaganje u stručni trenerski kadar, infrastrukturu i suradnju s lokalnom zajednicom, nastojimo učvrstiti <span className="text-primary font-bold">KK Alkar kao ponos grada Sinja</span> i simbol sportskih uspjeha i vjernosti navijača kroz generacije.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
