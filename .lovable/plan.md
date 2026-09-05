# Listanje kartica igrača u odjeljku "Naš tim"

## Problem

Na računalu se u traci s igračima uz rubove vide prepolovljene kartice, a klik na strelicu ne pomakne traku točno za jednu karticu, pa raspored izgleda neuredno.

## Cilj

U vidljivom dijelu uvijek stoji cijeli broj kartica (5 na širokom ekranu, manje na užem), bez odsječenih kartica uz rubove. Klik na strelicu pomiče traku točno za jednu karticu, uz glatku animaciju, a i ručno povlačenje se zaustavlja poravnato s početkom kartice.

## Što se mijenja

1. Traka s karticama prikazuje samo cijele kartice — susjedne kartice više ne "vire" uz rub.
2. Strelice lijevo/desno pomiču točno jednu karticu i onemogućene su na prvoj odnosno zadnjoj mogućoj poziciji.
3. Poravnanje pri povlačenju prstom/mišem vrijedi i na računalu, ne samo na mobitelu.
4. Na mobitelu ostaje jedna kartica po ekranu, kao i sada.
5. Izgled kartica (boje, sjene, hover, veličine slika) ostaje nepromijenjen.

## Tehnički detalji

Sve u `src/components/Team.tsx`:

- Kontejner s karticama dobiva `overflow-hidden` na vanjskom omotaču i `snap-x snap-mandatory` i na desktopu (uklanja se `md:snap-none`); `scroll-padding-inline-start` usklađen s razmakom.
- Širina kartice se računa iz broja vidljivih kartica i razmaka: `width: calc((100% - (n-1) * gap) / n)`, bez `min-w-[220px]` koji trenutno razbija izračun na užim širinama; broj vidljivih kartica (`n`) određuje se iz širine prozora (1 ispod 768px, 2 do 1024px, 3 do 1280px, 5 iznad).
- `scrollToIndex` koristi `offsetLeft` ciljane kartice umanjen za lijevi padding kontejnera, tako da se kartica poravna točno uz rub.
- `maxIndex` u `scroll()` i `disabled` uvjeti strelica računaju se iz istog `n` (`players.length - n`) umjesto tvrdo upisane petice.
- Detekcija aktivne kartice pri ručnom skrolanju uspoređuje `offsetLeft - container.scrollLeft` uz istu korekciju paddinga.
