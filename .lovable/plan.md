# Centriranje zaglavlja u prozoru za pregled PDF-a

## Što se mijenja

- U prozoru za pregled dokumenta naslov dokumenta bit će centriran vodoravno.
- Poveznica „Otvori u novoj kartici" ispod naslova također se centrira, ravno ispod naslova.
- Ostatak prozora (prikaz PDF-a, zatvaranje) ostaje nepromijenjen.

## Tehnički detalji

- U `src/pages/ProjectPage.tsx`, u `DialogHeader`: `text-left` → `text-center`, naslovu dodati `text-center` i simetričan razmak umjesto `pr-8`, a poveznici zamijeniti `w-fit` s `mx-auto` uz `justify-center`.
