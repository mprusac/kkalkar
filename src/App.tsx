import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index";

const Statistics = lazy(() => import("./pages/Statistics"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const RouteFallback = () => <div className="min-h-screen bg-white" />;

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/statistika" element={<PageTransition><Statistics /></PageTransition>} />
          <Route path="/galerija" element={<PageTransition><GalleryPage /></PageTransition>} />
          <Route path="/galerija/:eventId" element={<PageTransition><GalleryPage /></PageTransition>} />
          <Route path="/vijesti" element={<PageTransition><NewsPage /></PageTransition>} />
          <Route path="/vijesti/:articleId" element={<PageTransition><NewsPage /></PageTransition>} />
          <Route path="/projekt" element={<PageTransition><ProjectPage /></PageTransition>} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
export default App;
