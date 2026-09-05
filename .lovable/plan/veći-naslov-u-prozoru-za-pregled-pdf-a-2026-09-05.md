# Veći naslov u prozoru za pregled PDF-a

## Što se mijenja

- Naslov dokumenta u prozoru za pregled povećava se za oko 20% (s 16px na 19px), i dalje centriran.
- Sve ostalo (poveznica, prikaz PDF-a, kartice na stranici) ostaje nepromijenjeno.

## Tehnički detalji

- U `src/pages/ProjectPage.tsx`, `DialogTitle`: `text-base` → `text-[1.2rem]` (19.2px).
