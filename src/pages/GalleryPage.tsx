import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";



import g1 from "@/assets/gallery-sezona-2025/g1.jpg.asset.json";
import g2 from "@/assets/gallery-sezona-2025/g2.jpg.asset.json";
import g3 from "@/assets/gallery-sezona-2025/g3.jpg.asset.json";
import g4 from "@/assets/gallery-sezona-2025/g4.jpg.asset.json";
import g5 from "@/assets/gallery-sezona-2025/g5.jpg.asset.json";
import g6 from "@/assets/gallery-sezona-2025/g6.jpg.asset.json";
import g7 from "@/assets/gallery-sezona-2025/g7.jpg.asset.json";
import g8 from "@/assets/gallery-sezona-2025/g8.jpg.asset.json";
import g9 from "@/assets/gallery-sezona-2025/g9.jpg.asset.json";
import g10 from "@/assets/gallery-sezona-2025/g10.jpg.asset.json";
import g11 from "@/assets/gallery-sezona-2025/g11.jpg.asset.json";
import g12 from "@/assets/gallery-sezona-2025/g12.jpg.asset.json";
import g13 from "@/assets/gallery-sezona-2025/g13.jpg.asset.json";
import g14 from "@/assets/gallery-sezona-2025/g14.jpg.asset.json";
import g15 from "@/assets/gallery-sezona-2025/g15.jpg.asset.json";
import g16 from "@/assets/gallery-sezona-2025/g16.jpg.asset.json";
import g17 from "@/assets/gallery-sezona-2025/g17.jpg.asset.json";
import g18 from "@/assets/gallery-sezona-2025/g18.jpg.asset.json";
import g19 from "@/assets/gallery-sezona-2025/g19.jpg.asset.json";
import g20 from "@/assets/gallery-sezona-2025/g20.jpg.asset.json";
import g21 from "@/assets/gallery-sezona-2025/g21.jpg.asset.json";
import g22 from "@/assets/gallery-sezona-2025/g22.jpg.asset.json";
import g23 from "@/assets/gallery-sezona-2025/g23.jpg.asset.json";
import g24 from "@/assets/gallery-sezona-2025/g24.jpg.asset.json";
import g25 from "@/assets/gallery-sezona-2025/g25.jpg.asset.json";
import g26 from "@/assets/gallery-sezona-2025/g26.jpg.asset.json";
import g27 from "@/assets/gallery-sezona-2025/g27.jpg.asset.json";
import g28 from "@/assets/gallery-sezona-2025/g28.jpg.asset.json";
import g29 from "@/assets/gallery-sezona-2025/g29.jpg.asset.json";
import g30 from "@/assets/gallery-sezona-2025/g30.jpg.asset.json";

// Image orientation type - vertical or horizontal
type ImageWithOrientation = {
  src: string;
  orientation: "vertical" | "horizontal";
};

export const events: {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  description: string;
  coverImage: string;
  images: string[];
  imagesWithOrientation: ImageWithOrientation[];
}[] = [
  {
    id: "sezona-2025-26",
    homeTeam: "KK Alkar Sinj",
    awayTeam: "",
    date: "Sezona 2025/26",
    description: "Trenuci s utakmica, slavlja i navijača u dvorani u Sinju.",
    coverImage: g2.url,
    images: [g1.url, g2.url, g3.url, g4.url, g5.url, g6.url, g7.url, g8.url, g9.url, g10.url, g11.url, g12.url, g13.url, g14.url, g15.url, g16.url, g17.url, g18.url, g19.url, g20.url, g21.url, g22.url, g23.url, g24.url, g25.url, g26.url, g27.url, g28.url, g29.url, g30.url],
    imagesWithOrientation: [
      { src: g2.url, orientation: "horizontal" },
      { src: g4.url, orientation: "vertical" },
      { src: g5.url, orientation: "horizontal" },
      { src: g22.url, orientation: "horizontal" },
      { src: g12.url, orientation: "vertical" },
      { src: g26.url, orientation: "horizontal" },
      { src: g11.url, orientation: "horizontal" },
      { src: g15.url, orientation: "horizontal" },
      { src: g9.url, orientation: "vertical" },
      { src: g27.url, orientation: "horizontal" },
      { src: g25.url, orientation: "horizontal" },
      { src: g3.url, orientation: "horizontal" },
      { src: g29.url, orientation: "horizontal" },
      { src: g8.url, orientation: "horizontal" },
      { src: g14.url, orientation: "horizontal" },
      { src: g30.url, orientation: "horizontal" },
      { src: g17.url, orientation: "horizontal" },
      { src: g28.url, orientation: "horizontal" },
      { src: g16.url, orientation: "horizontal" },
      { src: g21.url, orientation: "horizontal" },
      { src: g1.url, orientation: "horizontal" },
      { src: g18.url, orientation: "horizontal" },
      { src: g23.url, orientation: "horizontal" },
      { src: g6.url, orientation: "horizontal" },
      { src: g13.url, orientation: "horizontal" },
      { src: g24.url, orientation: "horizontal" },
      { src: g20.url, orientation: "horizontal" },
      { src: g10.url, orientation: "horizontal" },
      { src: g19.url, orientation: "horizontal" },
      { src: g7.url, orientation: "horizontal" },
    ],
  },
];




const EventCard = ({ event, index }: { event: typeof events[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Link to={`/galerija/${event.id}`} className="group block">
        <div className="relative overflow-hidden rounded-lg aspect-[4/3] shadow-[0_0_20px_rgba(234,179,8,0.15)] hover:shadow-[0_0_30px_rgba(234,179,8,0.25)] transition-shadow duration-300">
          <img loading="lazy" decoding="async"
            src={event.coverImage}
            alt={`${event.homeTeam} - ${event.awayTeam}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Hover overlay - covers entire image */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300">
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary-foreground" />
              </div>
              <span className="text-white font-display text-lg tracking-wider uppercase mt-3">
                Otvori album
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
            {event.awayTeam ? `${event.homeTeam} - ${event.awayTeam}` : event.homeTeam}
          </h3>
          <p className="text-primary font-bold mt-1">{event.date}</p>
          <p className="text-muted-foreground text-sm mt-1 hidden md:block">{event.description}</p>
        </div>
      </Link>
    </motion.div>
  );
};

const EventAlbum = ({ event }: { event: typeof events[0] }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Get all images (either from imagesWithOrientation or regular images array)
  const allImages = event.imagesWithOrientation 
    ? event.imagesWithOrientation.map(img => img.src)
    : event.images;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Get span classes based on orientation - compact layout
  const getSpanClasses = (index: number) => {
    if (event.imagesWithOrientation) {
      const img = event.imagesWithOrientation[index];
      // Horizontal images span 2 columns, 1 row
      // Vertical images span 1 column, 2 rows
      return img.orientation === "horizontal" 
        ? "col-span-2 row-span-1" 
        : "col-span-1 row-span-2";
    }
    
    // Fallback
    return "col-span-1 row-span-1";
  };

  return (
    <div className="min-h-screen"><div className="cream-page-scope">
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/galerija"
              className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors mb-8 text-lg"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="font-display tracking-wider text-xl">Nazad na galeriju</span>
            </Link>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-2">
              <span className="text-primary">{event.homeTeam}</span>
              {event.awayTeam && <span className="text-[#0E2A63]"> - {event.awayTeam}</span>}
            </h1>

            <p className="text-primary font-display text-2xl md:text-3xl mt-2">{event.date}</p>
            <p className="text-[#0E2A63]/70 mt-4">{event.description}</p>
          </motion.div>


          {/* Masonry Gallery - clean columns layout */}
          <div className="columns-2 md:columns-3 gap-1.5 max-w-5xl mx-auto">
            {allImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative overflow-hidden cursor-pointer mb-1.5 break-inside-avoid"
                onClick={() => openLightbox(index)}
              >
                <img loading="lazy" decoding="async"
                  src={img}
                  alt={`Slika ${index + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <img loading="lazy" decoding="async"
              src={allImages[currentIndex]}
              alt={`Slika ${currentIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-foreground/70 text-sm">
              {currentIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      </div>
      <Footer />
    </div>
  );
};

const GalleryPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // If eventId is provided, show the album
  if (eventId) {
    const event = events.find((e) => e.id === eventId);
    if (event) {
      return <EventAlbum event={event} />;
    }
  }

  // Otherwise show the events list
  return (
    <div className="min-h-screen"><div className="cream-page-scope">
      <SEO
        title="Galerija — KK Alkar Sinj"
        description="Fotografije s utakmica, priprema i događanja Košarkaškog kluba Posušje."
        path="/galerija"
      />
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => { sessionStorage.setItem("restoreHomeScroll", "true"); navigate("/"); }}
              className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors mb-8 text-lg"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="font-display tracking-wider text-xl">Nazad</span>
            </button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-4">
              <span className="text-[#0E2A63]">FOTO</span>
              <span className="text-primary"> GALERIJA</span>
            </h1>
            <p className="text-[#0E2A63]/70 text-lg max-w-2xl mx-auto">
              Zabilježeni trenuci sa naših utakmica
            </p>
          </motion.div>

          {/* Events Grid */}
          {events.length === 0 ? (
            <p className="text-center text-[#0E2A63]/70 text-lg py-16">
              Trenutno nema dostupnih galerija.
            </p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
              {events.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPage;
