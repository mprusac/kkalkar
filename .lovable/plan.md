# Igrači: SofaScore, nacionalnost, visina, datum rođenja i statistika iz admin panela

## Što se dobiva

- U admin panelu, u obrascu za igrača, dodaju se nova polja: SofaScore link, nacionalnost (padajući izbornik s puno država i pripadajućim zastavama), visina, datum rođenja (dob se sama izračunava i prikazuje).
- U obrascu za igrača dodaje se i tablica sezonske statistike s točno onim kategorijama koje postoje u odjeljku "Top igrači", pa se taj odjeljak automatski osvježava kad admin promijeni brojke.
- Uz polje "Opis" piše "preporučljivo 85–95 znakova", a ispod polja je živi brojač znakova: zelen do 90, žut od 90 do 95, crven preko 95.
- U odjeljku "Roster" na stranici Statistika, između broja igrača i njegove slike, stoji strelica u krugu koja vodi na SofaScore profil tog igrača (kad je link unesen).

## Kako će raditi

Roster i Top igrači trenutno su tvrdo upisani u kodu. Prebacuju se na podatke iz baze, pa admin panel postaje jedini izvor istine:

- Roster se popunjava iz baze i grupira po poziciji (bekovi, krila, centri), redoslijedom koji je zadan u admin panelu. Slike igrača ostaju kakve jesu (postojeća slika iz baze, a ako je nema, dosadašnja slika po imenu).
- Za svaku od 12 kategorija u "Top igrači" uzimaju se tri najbolja igrača prema unesenoj vrijednosti. Igrači bez unesene vrijednosti se preskaču; ako kategorija nema nijednu vrijednost, prikazuje se poruka da nema podataka.
- Dob se ne sprema u bazu nego se uvijek računa iz datuma rođenja, i u admin panelu i na stranici.

Postojeći slobodni popis "Statistika" u obrascu igrača (koji se koristi na kartici igrača u sekciji "Naš tim") ostaje netaknut; nova sezonska statistika je zasebna sekcija.

## Tehnički detalji

Migracija tablice `players`:
- `sofascore_link text`, `nationality text` (ISO-3 kod), `height_cm integer`, `birth_date date`
- `season_stats jsonb not null default '{}'` s ključevima: `points`, `rebounds`, `assists`, `steals`, `blocks`, `minutes` (format mm:ss), `fg2_pct`, `fg3_pct`, `threes`, `def_rebounds`, `off_rebounds`, `double_doubles`

Kod:
- `supabase/functions/admin-players/index.ts` — proširiti `sanitize` novim poljima i deployati funkciju.
- Novi `src/lib/nationalities.ts` — popis ~45 država (naziv na hrvatskom, ISO-3, ISO-2). Zastave: postojeće lokalne slike za HRV/BIH/USA/GER, za ostale `https://flagcdn.com/w40/<iso2>.png`.
- `src/pages/AdminPanel.tsx` (`PlayerForm`) — nova polja, `Select` za nacionalnost sa zastavicom, `type="date"` za rođenje uz izračunatu dob pored polja, grid od 12 inputa za sezonsku statistiku, brojač znakova ispod opisa (zeleno/žuto/crveno preko `text-*` tokena, bez tvrdih boja).
- Novi `src/lib/adminPlayers.ts` — javni dohvat igrača (`supabase.from("players")`, `resolveAssetUrl`, React Query `staleTime`) i pomoćne funkcije `calcAge`, `buildTopCategories`.
- `src/pages/Statistics.tsx` — `players` i 12 `top*` nizova zamjenjuju se izvedenim podacima iz baze; postojeći JSX rostera (uključujući već pripremljenu ćeliju sa strelicom za `sofascoreLink`) i kartice Top igrača ostaju dizajnerski nepromijenjeni.

Bez promjena izgleda i rasporeda; mijenja se samo izvor podataka i sadržaj admin obrasca.
