# Projekt: dodavanje javnog poziva i prijavnog obrasca + novi izgled stranice

## Što se mijenja

1. **Dva nova dokumenta** — Javni poziv za iskaz interesa i Prijavni obrazac, oba s datumom 12.2.2026., dodaju se u skupinu "Javni poziv i prijava".
2. **Redoslijed** — svi dokumenti na stranici se poredaju od najnovijeg datuma prema najstarijem (npr. 17.7.2026. na vrhu, 12.2.2026. na dnu).
3. **Pozadina stranice** — ista svijetla zlatna (krem) nijansa kao na stranicama Vijesti i Galerija.

## Tehnički detalji

- Upload obje PDF datoteke u bucket `project-documents`, pa dva zapisa u `project_documents` (`category: 'poziv'`, `doc_date: 2026-02-12`).
- `supabase/functions/admin-documents/index.ts`: sortiranje `doc_date` na `ascending: false`; ponovni deploy.
- `src/pages/ProjectPage.tsx`: omotati sadržaj u `cream-page-scope` (kao `GalleryPage.tsx`) i koristiti `bg-background` umjesto `bg-white`; kartice ostaju bijele.
