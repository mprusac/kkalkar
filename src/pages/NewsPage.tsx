import { useState, useEffect, useMemo } from "react";
import { fetchAdminNews, parseDate, type AdminNewsItem } from "@/lib/adminNews";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Trophy, Users, Megaphone, Newspaper, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import newsLaguna from "@/assets/news-laguna.jpg";
import newsLagunaCard from "@/assets/news-laguna-card.jpg";
import newsMostarCard from "@/assets/news-mostar-card.jpg";
import newsMostarAction from "@/assets/news-mostar-action.png";
import tomislavCard from "@/assets/tomislav/tomislav-7.png";
import tomislavDetail from "@/assets/tomislav/tomislav-detail.jpg";
import newsWeltplastCard from "@/assets/news-weltplast-card.jpg";
import najavaTomislav from "@/assets/news-najava-tomislav.jpg";
import najavaKupSiroki from "@/assets/news-najava-kup-siroki.jpg";
import najavaLjubuskiGameday from "@/assets/news-najava-ljubuski-gameday.jpg";
import cardNajavaLjubuskiGameday from "@/assets/card-najava-ljubuski-gameday.png";
import najavaLjubuski from "@/assets/news-najava-ljubuski.jpg";
import najavaMostar from "@/assets/news-najava-mostar.jpg";
import sponzorKtmBrina from "@/assets/news-sponzor-ktm-brina.jpg";
import junioriSarajevo from "@/assets/news-juniori-sarajevo.jpg";
import sponzorVokel from "@/assets/news-sponzor-vokel.jpg";
import sponzorMrvelji from "@/assets/news-sponzor-mrvelji.jpg";
import cardNajavaMostar from "@/assets/card-najava-mostar.png";
import cardNajavaTomislav from "@/assets/card-najava-tomislav.png";
import cardNajavaKupSiroki from "@/assets/card-najava-kup-siroki.png";
import cardJunioriSarajevo from "@/assets/card-juniori-sarajevo.png";
import cardNajavaLjubuski from "@/assets/card-najava-ljubuski.png";
import newsPorazLjubuski from "@/assets/news-poraz-ljubuski.png";
import newsPorazLjubuskiCard from "@/assets/news-poraz-ljubuski-card.jpg";
import xmas1 from "@/assets/xmas/xmas-1.jpg";
import xmas2 from "@/assets/xmas/xmas-2.jpg";
import xmas3 from "@/assets/xmas/xmas-3.jpg";
import xmas4 from "@/assets/xmas/xmas-4.jpg";
import xmas5 from "@/assets/xmas/xmas-5.jpg";
import xmas6 from "@/assets/xmas/xmas-6.jpg";
import xmas7 from "@/assets/xmas/xmas-7.jpg";
import xmas8 from "@/assets/xmas/xmas-8.jpg";
import xmasCard from "@/assets/xmas/xmas-card.png";
import xmasHero from "@/assets/xmas/xmas-hero.png";
import sponzorMiviko from "@/assets/news-sponzor-miviko.jpg";
import sponzorPlanet from "@/assets/news-sponzor-planet.jpg";
import najavasirokiAway from "@/assets/news-najava-siroki-away.jpg";
import porazSirokiAway from "@/assets/news-poraz-siroki-away.jpg";
import porazSirokiCard from "@/assets/news-poraz-siroki-card.jpg";
import berlinCardNew from "@/assets/berlin/berlin-card-new.jpg";
import berlin1 from "@/assets/berlin/berlin-1.jpg";
import berlin2 from "@/assets/berlin/berlin-2.jpg";
import berlin3 from "@/assets/berlin/berlin-3.jpg";
import berlin4 from "@/assets/berlin/berlin-4.jpg";
import berlin5 from "@/assets/berlin/berlin-5.jpg";
import berlin6 from "@/assets/berlin/berlin-6.jpg";
import berlin7 from "@/assets/berlin/berlin-7.jpg";
import berlin8 from "@/assets/berlin/berlin-8.jpg";
import berlin9 from "@/assets/berlin/berlin-9.jpg";
import deFlag from "@/assets/flags/de-flag.png";
import croFlag from "@/assets/flags/cro-flag.png";
import pobjeda_RamaCard from "@/assets/news-pobjeda-rama-card.jpg";
import priznanjeCard from "@/assets/news-priznanje-card.jpg";
import priznanjeProtrka from "@/assets/priznanje-protrka.jpg";
import priznanjeKadeti from "@/assets/priznanje-kadeti.jpg";
import najavaGrude from "@/assets/news-najava-grude.jpg";
import najavaGrudeGameday from "@/assets/news-najava-grude-gameday.jpg";
import pobjeda_GrudeCard from "@/assets/news-pobjeda-grude-card.jpg";
import sponzorCalipso from "@/assets/news-sponzor-calipso.jpg";
import najavaCapljina from "@/assets/news-najava-capljina-gameday.jpg";
import pobjedaCapljina from "@/assets/news/capljina-result-march2026.jpg";
import pobjedaLjubuski from "@/assets/news/ljubuski-result-march2026.jpg";
import josipMamicHks from "@/assets/news/josip-mamic-hks.jpg";
import sponzorCroatiaOsiguranje from "@/assets/news-sponzor-croatia-osiguranje.jpg";
import pavkovicIgokeaCard from "@/assets/news/pavkovic-igokea-card.jpg";
import pavkovicIgokea1 from "@/assets/news/pavkovic-igokea-1.jpg";
import pavkovicIgokea2 from "@/assets/news/pavkovic-igokea-2.jpg";
import pavkovicIgokea3 from "@/assets/news/pavkovic-igokea-3.jpg";
import cestitkeSiroki from "@/assets/news/cestitke-siroki.jpg";
import skolaKosarkeZadar from "@/assets/news/skola-kosarke-zadar.jpg";
import kadetiCapljinaTurnir from "@/assets/news/kadeti-capljina-turnir.jpg";
import srebroKadetiCapljina from "@/assets/news/srebro-kadeti-capljina.jpg";
import pozivPredkadetiCard from "@/assets/news/poziv-predkadeti-card.jpg";
import pozivPredkadetiKondza from "@/assets/news/poziv-predkadeti-kondza.jpg";
import pozivPredkadetiBisko from "@/assets/news/poziv-predkadeti-bisko.jpg";
import summerBasketMostarCard from "@/assets/news/summer-basket-mostar-card.jpg";
import summerBasketMostar1 from "@/assets/news/summer-basket-mostar-1.jpg";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: "utakmica" | "najava" | "klub";
  image: string;
  cardImage?: string;
  cardImagePosition?: string;
  galleryImages?: string[];
  flagImage?: string;
}

export const allNews: NewsItem[] = [];


const categories = [
  { id: "sve", label: "Sve", icon: Newspaper },
  { id: "utakmica", label: "Utakmice", icon: Trophy },
  { id: "najava", label: "Najave", icon: Megaphone },
  { id: "klub", label: "Klub", icon: Newspaper },
] as const;

const getCategoryLabel = (cat: string) => {
  const found = categories.find(c => c.id === cat);
  return found?.label || cat;
};

const ArticleDetail = ({ article }: { article: NewsItem }) => {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = article.galleryImages || [];

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  const goToNext = () => setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div className="min-h-screen">
      <div className="cream-page-scope" style={{ zoom: 0.85 }}>
      <SEO
        title={`${article.title} — KK Alkar Sinj`}
        description={(article.content || article.title).replace(/\n+/g, ' ').slice(0, 155)}
        path={`/vijesti/${article.id}`}
        image={typeof article.image === 'string' ? article.image : undefined}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.title,
          datePublished: article.date,
          image: typeof article.image === 'string' ? article.image : undefined,
          author: { "@type": "Organization", name: "KK Posušje" },
          publisher: {
            "@type": "Organization",
            name: "KK Posušje",
            logo: { "@type": "ImageObject", url: "https://kkposusje.ba/favicon.png" },
          },
          mainEntityOfPage: `https://kkposusje.ba/vijesti/${article.id}`,
        }}
      />
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <button onClick={() => navigate("/vijesti")} className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors mb-8 text-lg">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-display tracking-wider text-xl">Nazad na vijesti</span>
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm rounded mb-4">{getCategoryLabel(article.category)}</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#0E2A63] mb-4">{article.title}{article.flagImage && <img src={article.flagImage} alt="flag" className="inline-block w-8 h-5 md:w-10 md:h-6 ml-2 align-middle" />}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-8">
              <Calendar size={16} />
              <span>{article.date}</span>
              <span className="mx-2">•</span>
              <span>{getCategoryLabel(article.category)}</span>
            </div>
            
            <div className="relative overflow-hidden rounded-lg mb-8 shadow-lg ring-1 ring-[#c9a24c]/40">
              <img src={article.image} alt={article.title} className="w-full rounded-lg" />
            </div>

            <div className="bg-white rounded-lg p-6 md:p-8 shadow-md ring-1 ring-[#c9a24c]/30">
              <div className="prose max-w-none">
                {article.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-[#0E2A63]/90 text-lg leading-relaxed mb-4">
                    {paragraph.split('\n').map((line, j, arr) => (
                      <span key={j}>{line}{i === 0 && j === 0 && article.flagImage && <img src={article.flagImage} alt="flag" className="inline-block w-6 h-4 ml-1.5 align-middle" />}{j < arr.length - 1 && <br />}</span>
                    ))}
                  </p>
                ))}
              </div>
            </div>

            {galleryImages.length > 0 && (
              <div className="mt-8 columns-2 md:columns-3 gap-3">
                {galleryImages.map((img, i) => (
                  <img key={i} src={img} alt={`${article.title} - slika ${i + 1}`} className="w-full rounded-lg mb-3 break-inside-avoid cursor-pointer hover:opacity-90 transition-opacity shadow-md ring-1 ring-[#c9a24c]/30" onClick={() => openLightbox(i)} />
                ))}
              </div>
            )}
          </motion.div>
      </div>
      </div>
      </div>
      <Footer />




      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && galleryImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} onClick={closeLightbox} className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10">
              <X className="w-6 h-6" />
            </motion.button>
            <button onClick={(e) => { e.stopPropagation(); goToPrevious(); }} className="absolute left-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <img src={galleryImages[currentIndex]} alt={`Slika ${currentIndex + 1}`} className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
            <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="absolute right-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10">
              <ChevronRight className="w-8 h-8" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-foreground/70 text-sm">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NewsPage = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("sve");
  const [adminNews, setAdminNews] = useState<AdminNewsItem[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => { fetchAdminNews().then(setAdminNews); }, []);

  const mergedNews = useMemo(() => {
    const adminTitles = new Set((adminNews as any[]).map((n: any) => (n.title || "").trim()));
    const localFiltered = (allNews as any[]).filter((n: any) => !adminTitles.has((n.title || "").trim()));
    return [...(adminNews as any[]), ...localFiltered].sort(
      (a: any, b: any) => parseDate(b.date) - parseDate(a.date)
    );
  }, [adminNews]);

  if (articleId) {
    const article = mergedNews.find((n: any) => String(n.id) === articleId);
    if (article) return <ArticleDetail article={article} />;
  }

  const filteredNews = activeCategory === "sve" ? mergedNews : mergedNews.filter((item: any) => item.category === activeCategory);

  return (
    <div className="min-h-screen">
      <div className="cream-page-scope" style={{ zoom: 0.85 }}>
      <SEO
        title="Vijesti — KK Alkar Sinj"
        description="Najnovije vijesti, najave utakmica, izvještaji i priopćenja Košarkaškog kluba Posušje."
        path="/vijesti"
      />
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <button onClick={() => { sessionStorage.setItem("restoreHomeScroll", "true"); navigate("/"); }} className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors mb-8 text-lg">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-display tracking-wider text-xl">Nazad</span>
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-4">
              <span className="text-[#0E2A63]">NAJNOVIJE </span>
              <span className="text-primary">VIJESTI</span>
            </h1>
            <p className="text-[#0E2A63]/70 text-lg">Ostani u toku sa svim događanjima iz kluba</p>
          </motion.div>

          <div className="flex justify-center gap-1 md:gap-2 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`flex items-center gap-1.5 px-3 md:px-5 py-2 md:py-3 rounded-full text-xs md:text-base font-medium transition-all duration-300 ${activeCategory === category.id ? "bg-primary text-primary-foreground shadow-md" : "bg-white text-[#0E2A63] hover:bg-[#faeecc] ring-1 ring-[#c9a24c]/40"}`}>
                  <IconComponent size={16} />
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 max-w-5xl mx-auto">
            {filteredNews.map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                <Link to={`/vijesti/${item.id}`} className="group flex flex-col h-[340px] md:h-[440px] bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover-lift shadow-md ring-1 ring-[#c9a24c]/40 hover:ring-[#c9a24c]">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.cardImage || item.image} alt={item.title} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${item.cardImagePosition === 'center' ? 'object-center' : item.cardImagePosition === 'upper' ? 'object-[center_5%]' : item.cardImagePosition === 'top' ? 'object-top' : item.cardImagePosition === 'lower' ? 'object-[center_35%]' : item.cardImagePosition === 'bottom' ? 'object-bottom' : 'object-[center_25%]'}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-1 bg-primary/90 text-primary-foreground text-xs rounded flex items-center gap-1 font-bold">
                      {(() => { const cat = item.category; const icons: Record<string, typeof Trophy> = { utakmica: Trophy, najava: Megaphone, klub: Newspaper }; const labels: Record<string, string> = { utakmica: "Utakmice", najava: "Najave", klub: "Klub" }; const Icon = icons[cat]; return <><Icon size={12} strokeWidth={3} />{labels[cat]}</>; })()}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1 bg-white">
                    <div className="flex items-center gap-2 text-[#0E2A63]/60 text-sm mb-3">
                      <Calendar size={14} />
                      {item.date}
                    </div>
                    <h3 className="text-xl font-display text-[#0E2A63] mb-3 line-clamp-2 group-hover:text-primary transition-colors">{item.title}{item.flagImage && <img src={item.flagImage} alt="flag" className="inline-block h-4 md:h-5 ml-1.5 align-middle object-contain" />}</h3>
                    <p className="text-[#0E2A63]/70 text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                    <div className="mt-auto inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                      Pročitaj više <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;

