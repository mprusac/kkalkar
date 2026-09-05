# Podnožje na stranici Projekt vraćeno u plavu boju

## Što se mijenja

- Podnožje (footer) stranice Projekt bit će tamno plavo, isto kao na svim ostalim stranicama.
- Svijetla zlatna pozadina ostaje samo na sadržaju iznad podnožja.

## Tehnički detalji

- U `src/pages/ProjectPage.tsx` premjestiti `cream-page-scope` s korijenskog `div`-a na unutarnji omotač sadržaja, tako da `<Footer />` ostane izvan tog opsega — ista struktura kao u `GalleryPage.tsx`.
