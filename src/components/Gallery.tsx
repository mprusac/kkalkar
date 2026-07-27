import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import g1 from "@/assets/gallery/g1.asset.json";
import g2 from "@/assets/gallery/g2.asset.json";
import g3 from "@/assets/gallery/g3.asset.json";
import g4 from "@/assets/gallery/g4.asset.json";
import g5 from "@/assets/gallery/g5.asset.json";
import g6 from "@/assets/gallery/g6.asset.json";

const images = [
  { id: 1, src: g4.url, title: "Zajedništvo", objectPosition: "center top" },
  { id: 2, src: g3.url, title: "Trener Mate Baković", objectPosition: "center" },
  { id: 3, src: g5.url, title: "Zakucavanje", objectPosition: "center top" },
  { id: 4, src: g1.url, title: "Prodor", objectPosition: "center" },
  { id: 5, src: g2.url, title: "Šut za tri", objectPosition: "center top" },
  { id: 6, src: g6.url, title: "Maligani", objectPosition: "center" },
];

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const GalleryItem = ({ index, className, style, objectPosition }: { index: number; className: string; style?: React.CSSProperties; objectPosition?: string }) => (
    <div 
      className={`group relative overflow-hidden rounded-lg cursor-pointer animate-fade-in-up hover-lift ${className}`}
      style={style}
      onClick={() => openLightbox(index)}
    >
      <img loading="lazy" decoding="async"
        src={images[index].src}
        alt={images[index].title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ objectPosition: objectPosition || images[index].objectPosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <span className="text-primary font-bold text-xs md:text-sm uppercase tracking-wider drop-shadow-lg">{images[index].title}</span>
      </div>
    </div>
  );

  return (
    <section id="galerija" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-12">
          <span className="section-title-white">NA </span>
          <span className="section-title-gold">PARKETU</span>
        </h2>

        {/* Mobile: Compact Grid Layout */}
        {isMobile ? (
          <div className="grid grid-cols-2 gap-1 max-w-4xl mx-auto rounded-lg overflow-hidden">
            {images.map((_, index) => (
              <GalleryItem key={index} index={index} className="aspect-square rounded-none" style={{ animationDelay: `${index * 50}ms` }} />
            ))}
          </div>
        ) : (
          /* Desktop: Original Bento Grid Layout */
          <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto" style={{ gridAutoRows: "84px" }}>
            <GalleryItem index={0} className="row-span-3" objectPosition="center center" />
            <GalleryItem index={1} className="row-span-3" style={{ animationDelay: "50ms" }} />
            <GalleryItem index={2} className="row-span-3" style={{ animationDelay: "100ms" }} />
            <GalleryItem index={3} className="row-span-3" style={{ animationDelay: "150ms" }} />
            <GalleryItem index={4} className="row-span-3" style={{ animationDelay: "200ms" }} objectPosition="center top" />
            <GalleryItem index={5} className="row-span-3" style={{ animationDelay: "250ms" }} />
          </div>
        )}

        <div id="home-return-gallery-btn" className="flex justify-center mt-10">
          <Link 
            to="/galerija"
            onClick={() => {
              sessionStorage.setItem("homeScrollY", String(window.scrollY));
              sessionStorage.setItem("homeReturnTarget", "home-return-gallery-btn");
            }}
            className="btn-gold-outline"
          >
            Sva galerija
          </Link>
        </div>
      </div>

      {/* Animated Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </motion.button>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={currentIndex}
                src={images[currentIndex].src}
                alt={images[currentIndex].title}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </motion.button>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-foreground/70 text-sm"
            >
              {currentIndex + 1} / {images.length}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;