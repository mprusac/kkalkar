# Uklanjanje praznog razmaka ispod zlatne crte u pregledu dokumenta

## Što se mijenja

- U prozoru za pregled uklanja se sivi/prazni pojas između zlatne crte i samog dokumenta.
- Zlatna crta ostaje kao jedina granica: odmah ispod nje počinje prikaz PDF-a.

## Tehnički detalji

- U `src/pages/ProjectPage.tsx` na `DialogContent` dodati `gap-0` (shadcn Dialog koristi `grid gap-4`, što stvara razmak) i postaviti neutralnu bijelu pozadinu iframe spremnika umjesto `bg-[#f5f5f5]`.
