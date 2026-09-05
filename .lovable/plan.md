# KK Alkar za djecu Sinja — nova stranica s dokumentima

Nova stavka u izborniku i zasebna stranica posvećena projektu "KK Alkar za djecu Sinja" (šifra SF.3.4.08.07.0102), s popisom svih službenih dokumenata za preuzimanje.

## Kako će izgledati

- Nova stavka u izborniku (i u podnožju): **Projekt** → stranica `/projekt`.
- Na vrhu kratko zaglavlje: naziv projekta, šifra projekta i rečenica o cilju (uključivanje djece i mladih u riziku od socijalne isključenosti u sport), u istom plavo-zlatnom stilu kao ostatak stranice.
- Ispod dvije skupine dokumenata:
  1. **Javni poziv i prijava** — Javni poziv i prijavni obrazac, oboje s datumom 12.2.2026.
  2. **Najave radionica** — kartice poredane po datumu održavanja (3.4.2026, 7.4.2026, 13.4.2026, 17.4.2026, 21.4.2026, 27.4.2026, 28.5.2026, 29.5.2026, 17.6.2026, 17.7.2026), svaka s nazivom radionice iz dokumenta, datumom i gumbom "Preuzmi PDF" (otvara se u novoj kartici).
- Na dnu napomena: "Sadržaj je isključiva odgovornost KK Alkar."

## Upravljanje iz admin panela

Nova sekcija **Dokumenti** u admin panelu s punim dodavanjem, uređivanjem i brisanjem: naslov, datum, skupina (javni poziv / najava radionice), kratki opis i učitavanje PDF-a. Tako predsjednik ili klub mogu sami dodati preostale dokumente i sve buduće najave bez mojeg uključivanja.

## Podaci koje trebam od tebe

- Preostale 2 datoteke (javni poziv i prijavni obrazac) — pošalji ih u sljedećoj poruci pa ih odmah dodam s datumom 12.2.2026.
- Ako želiš drugi naziv stavke u izborniku od "Projekt", javi (npr. "Za djecu Sinja").

## Tehnički detalji

- Nova tablica `project_documents` (naslov, datum, kategorija, opis, url datoteke, redoslijed) s javnim čitanjem i pisanjem samo preko admin edge funkcije, po uzoru na `galleries`/`players`.
- Novi privatni-javni storage bucket `project-documents` za PDF-ove; upload iz admin panela istom logikom kao postojeći upload slika.
- Nova edge funkcija `admin-documents` (list/list-public/create/update/delete) po uzoru na `admin-galleries`.
- Nova stranica `src/pages/ProjectPage.tsx` (lazy ruta `/projekt` u `App.tsx`), dohvat React Queryjem sa `staleTime`, `SEO` komponenta s naslovom i opisom projekta.
- Stavka u `Navbar.tsx` (`isRoute: true`) i u brzim linkovima u `Footer.tsx`.
- Postojećih 10 PDF-ova učitavam u bucket i upisujem u tablicu s ispravnim datumima i naslovima izvučenima iz samih dokumenata.
