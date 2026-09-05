# Uže polje za datum rođenja

Polje za unos datuma rođenja u obrascu igrača trenutno se rasteže preko cijele širine stupca, pa desno od upisanog datuma ostaje puno praznog prostora.

## Promjena

- Suziti polje za datum na širinu koja je taman dovoljna za datum i ikonu kalendara, poravnato ulijevo.
- Ostala polja (nacionalnost, visina) i oznaka s dobi ostaju nepromijenjeni.
- Na mobitelu polje ostaje dovoljno široko za lako biranje datuma.

## Tehnički detalj

U `src/pages/AdminPanel.tsx` polju `type="date"` dodati klasu za ograničenu širinu (npr. `w-full sm:w-[190px]`).
