import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, FileText, Download, Loader2, Eye, ExternalLink } from "lucide-react";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  fetchProjectDocuments,
  formatDocDate,
  type ProjectDocument,
} from "@/lib/adminDocuments";

const PROJECT_CODE = "SF.3.4.08.07.0102";

const DocCard = ({
  doc,
  index,
  onPreview,
}: {
  doc: ProjectDocument;
  index: number;
  onPreview: (doc: ProjectDocument) => void;
}) => (
  <motion.a
    href={doc.file_url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
    className="group flex items-start gap-4 rounded-xl border border-[#c9a24c]/60 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(201,162,76,0.35)]"
  >
    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0E2A63] text-white transition-colors duration-300 group-hover:bg-[#c9a24c]">
      <FileText className="h-5 w-5" />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block font-semibold text-[#0E2A63] leading-snug">{doc.title}</span>
      <span className="mt-1 block text-sm text-[#0E2A63]/70">{formatDocDate(doc.doc_date)}</span>
      {doc.description && (
        <span className="mt-1 block text-sm text-[#0E2A63]/60">{doc.description}</span>
      )}
    </span>
    <span className="mt-1 flex shrink-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onPreview(doc);
        }}
        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#0E2A63]/40 px-3 py-1.5 text-xs font-semibold text-[#0E2A63] transition-colors duration-300 hover:bg-[#0E2A63] hover:text-white"
      >
        <Eye className="h-3.5 w-3.5" />
        Pregled
      </button>
      <span className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#c9a24c] px-3 py-1.5 text-xs font-semibold text-[#0E2A63] transition-colors duration-300 group-hover:bg-[#c9a24c] group-hover:text-white">
        <Download className="h-3.5 w-3.5" />
        PDF
      </span>
    </span>
  </motion.a>
);

const ProjectPage = () => {
  const [previewDoc, setPreviewDoc] = useState<ProjectDocument | null>(null);
  const { data: documents = [], isLoading } = useQuery({
    queryKey: ["project-documents"],
    queryFn: fetchProjectDocuments,
    staleTime: 5 * 60 * 1000,
  });

  const pozivi = documents.filter((d) => d.category === "poziv");
  const radionice = documents.filter((d) => d.category !== "poziv");

  return (
    <div className="min-h-screen"><div className="cream-page-scope bg-background">
      <SEO
        title="KK Alkar za djecu Sinja | KK Alkar Sinj"
        description="Projekt KK Alkar za djecu Sinja — javni poziv, prijavni obrazac i najave edukativnih radionica o važnosti sporta i zdravih životnih navika."
        path="/projekt"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Project",
          name: "KK Alkar za djecu Sinja",
          identifier: PROJECT_CODE,
          location: "Sinj, Hrvatska",
        }}
      />

      <div className="container mx-auto px-4 py-12">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-3 text-[#c9a24c] transition-colors hover:text-[#0E2A63]"
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="font-display text-xl tracking-wider">Nazad na početnu</span>
        </Link>

        <header className="mx-auto mb-12 max-w-3xl text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl">
            <span className="text-[#0E2A63]">KK ALKAR </span>
            <span className="text-[#c9a24c]">ZA DJECU SINJA</span>
          </h1>
          <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-[#c9a24c]">
            Šifra projekta: {PROJECT_CODE}
          </p>
          <p className="mt-4 text-[#0E2A63]/75">
            Uključivanje djece i mladih u riziku od socijalne isključenosti u sport. Ovdje možete
            preuzeti sve službene dokumente projekta — javni poziv, prijavni obrazac i najave
            edukativnih radionica o važnosti sporta i zdravih životnih navika.
          </p>
        </header>

        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-16 text-[#0E2A63]/70">
            <Loader2 className="h-5 w-5 animate-spin" /> Učitavanje dokumenata...
          </div>
        )}

        {!isLoading && documents.length === 0 && (
          <p className="py-16 text-center text-[#0E2A63]/70">Dokumenti će uskoro biti objavljeni.</p>
        )}

        <div className="mx-auto max-w-4xl space-y-12">
          {pozivi.length > 0 && (
            <section>
              <h2 className="mb-5 text-center font-display text-2xl uppercase tracking-wider text-[#0E2A63]">
                Javni poziv i prijava
              </h2>
              <div className="space-y-3">
                {pozivi.map((doc, i) => (
                  <DocCard key={doc.id} doc={doc} index={i} onPreview={setPreviewDoc} />
                ))}
              </div>
            </section>
          )}

          {radionice.length > 0 && (
            <section>
              <h2 className="mb-5 text-center font-display text-2xl uppercase tracking-wider text-[#0E2A63]">
                Najave radionica
              </h2>
              <div className="space-y-3">
                {radionice.map((doc, i) => (
                  <DocCard key={doc.id} doc={doc} index={i} onPreview={setPreviewDoc} />
                ))}
              </div>
            </section>
          )}
        </div>

        <p className="mx-auto mt-14 max-w-4xl text-center text-xs text-[#0E2A63]/60">
          Sadržaj dokumenata isključiva je odgovornost KK Alkar.
        </p>
      </div>

      <Dialog open={!!previewDoc} onOpenChange={(open) => !open && setPreviewDoc(null)}>
        <DialogContent className="max-w-5xl border-[#c9a24c] bg-white p-0">
          <DialogHeader className="border-b border-[#c9a24c]/40 px-10 py-4 text-center sm:text-center">
            <DialogTitle className="text-center text-[1.2rem] text-[#0E2A63]">
              {previewDoc?.title}
            </DialogTitle>
            {previewDoc && (
              <a
                href={previewDoc.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto mt-1 inline-flex w-fit items-center justify-center gap-1.5 text-xs font-semibold text-[#c9a24c] hover:text-[#0E2A63]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Otvori u novoj kartici
              </a>
            )}
          </DialogHeader>
          {previewDoc && (
            <iframe
              src={previewDoc.file_url}
              title={previewDoc.title}
              className="h-[75vh] w-full rounded-b-lg bg-[#f5f5f5]"
            />
          )}
        </DialogContent>
      </Dialog>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectPage;
