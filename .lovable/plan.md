# Poravnanje dna tablica na stranici Statistika

Cilj: dno tablice "Utakmice" (lijevo) uvijek završava točno u ravnini s dnom desne tablice — bilo da je otvoren Poredak, Tim ili Roster.

## Što se mijenja

1. **Deterministično računanje visine**
   Trenutna logika mjeri razliku i dodaje je na postojeću visinu (inkrementalno), pa se pri promjeni taba ne stigne stabilizirati i lijeva kutija ostane niža ili viša od desne (vidljivo na priloženim slikama).
   Zamjenjuje se izravnim izračunom: visina kutije s utakmicama = (dno desne kolone) − (vrh kutije s utakmicama). Bez akumulacije, bez ovisnosti o prethodnoj vrijednosti.

2. **Ponovno mjerenje na svaku promjenu**
   Mjerenje se pokreće pri promjeni taba (Poredak / Tim / Roster / Top igrači), promjeni stranice utakmica, resizeu prozora te preko ResizeObservera nad desnom kolonom i lijevom kutijom forme. Dodaje se i mjerenje nakon učitavanja slika/fontova da se izbjegne pogrešna prva vrijednost.

3. **Sadržaj se prilagođava visini**
   Redovi utakmica ostaju `flex-1` unutar fiksne visine s `overflow-hidden`, pa se blago skraćuju/produžuju umjesto da probijaju okvir. Za slučaj Poredak: broj prikazanih utakmica se blago smanjuje, a redovi tablice poretka dobivaju nešto veći vertikalni padding, tako da se dna poklope bez praznog prostora.

4. **Mobilna verzija ostaje nepromijenjena** — poravnavanje se primjenjuje samo od `lg` breakpointa naviše.

## Tehnički detalji

- Datoteka: `src/pages/Statistics.tsx`
- `useLayoutEffect` s funkcijom `measure()` koja postavlja `gamesBoxHeight = rightColRect.bottom - gamesBoxRect.top`, uz minimum (npr. 200px).
- Uklanja se `gamesBoxHeight` iz liste ovisnosti efekta (uzrok petlje/zaustavljanja).
- Prilagodba `matchesPerPage` i paddinga redova tablice poretka radi finog poklapanja.

## Provjera

Kroz preglednik se mjere pozicije dna obiju tablica za sva tri stanja (Poredak, Tim, Roster) i potvrđuje razlika < 1px.
