# Naslov kartice uvijek "KK Alkar Sinj"

Trenutno svaka stranica postavlja svoj naslov u browser kartici (npr. "Statistika i tablica lige — KK Alkar Sinj", "Galerija — KK Alkar Sinj", "KK Alkar Sinj — Službena stranica košarkaškog kluba"). Cilj: na svakoj stranici u kartici piše samo "KK Alkar Sinj".

## Što se mijenja

- SEO komponenta uvijek ispisuje `KK Alkar Sinj` kao `<title>`, bez obzira na stranicu.
- Za dijeljenje na društvenim mrežama (og:title / twitter:title) ostaje opisni naslov po stranici, pa SEO vidljivost ostaje netaknuta.
- `index.html` već ima `KK Alkar Sinj` — ostaje kako jest.

## Tehnički detalji

U `src/components/SEO.tsx`: `<title>` postaje fiksni string `KK Alkar Sinj`; postojeći `title` prop i dalje se koristi samo za `og:title` i `twitter:title`. Stranice (`Index`, `Statistics`, `GalleryPage`, `NewsPage`) ostaju nepromijenjene.
