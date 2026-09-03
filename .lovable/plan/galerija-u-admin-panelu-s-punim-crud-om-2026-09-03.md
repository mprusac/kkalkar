# Galerija u admin panelu s punim CRUD-om

## Stanje

Admin panel već ima sekciju "Galerije" s dodavanjem, uređivanjem i brisanjem albuma, ali tablica galerija u bazi je prazna (0 zapisa). Trenutna galerija na stranici (album "Sezona 2025/26" s 38 slika) tvrdo je upisana u kodu (`src/pages/GalleryPage.tsx`), pa se ne vidi u admin panelu i ne može se uređivati.

## Cilj

Postojeći album prebaciti u bazu i javnu galeriju čitati iz baze, tako da se u admin panelu vidi sa svim slikama i da rade dodavanje, uređivanje (naslov, datum, naslovna slika, dodavanje/brisanje pojedinih slika) i brisanje.

## Što se radi

1. Prijenos postojećeg albuma u bazu: jedan zapis "Sezona 2025/26" s naslovnom slikom i svih 38 slika istim redoslijedom kao sada.
2. Javna stranica galerije (`/galerija` i album `/galerija/:id`) učitava albume iz baze umjesto iz koda; masonry raspored, lightbox, skeletoni i dizajn ostaju identični.
3. Sekcija "Na parketu" na naslovnici ostaje kakva jest (6 odabranih slika iz koda) — nije dio albuma.
4. Admin panel: postojeća forma ostaje, ali se popis slika unutar albuma prikazuje s brojem slika i mogućnošću brisanja pojedine slike te promjene naslovne slike.

## Tehnički detalji

- Seed u tablicu `galleries` (naslov, datum, `cover_image`, `images[]`) s apsolutnim Lovable CDN URL-ovima (`https://kkposusje-digital-court.lovable.app/__l5e/assets-v1/...`), isto kao što radi Vite plugin.
- `GalleryPage.tsx`: dohvat preko `admin-galleries/list-public` (React Query, `staleTime`), `id` albuma iz baze; uklanjaju se hardkodirani importi i `events` niz. Orijentacija slika nije potrebna jer aktualni raspored koristi CSS `columns`.
- Slike se provlače kroz `resolveAssetUrl` radi ispravnog prikaza na objavljenoj domeni.
- Bez promjena sheme baze i bez promjena dizajna.
