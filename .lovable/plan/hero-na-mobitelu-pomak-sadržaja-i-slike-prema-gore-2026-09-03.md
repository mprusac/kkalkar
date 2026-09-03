# Hero na mobitelu: pomak sadržaja i slike prema gore

Cilj: na mobitelu naslov, podnaslov i gumbi idu više prema vrhu, ali ne toliko da otvoreni mobilni izbornik prelazi preko naslova. Slika tima se pomiče prema gore tako da je momčad vertikalno na sredini ekrana pri otvaranju stranice.

## Što se mijenja (samo mobilni prikaz)

1. Sadržaj hero sekcije (`src/components/Hero.tsx`)
   - Blok sadržaja se pomiče gore: umjesto trenutnog `-mt-20` na mobitelu koristi se veći negativni pomak, uz zadržavanje `md:mt-0` (desktop nepromijenjen).
   - Naslov zadržava sigurnosni razmak od vrha (`mt-*`) izračunat tako da vrh naslova ostane ispod otvorenog mobilnog izbornika (navbar visina 80px + otvoreni izbornik ~6 stavki), pa nijedna stavka izbornika ne prelazi preko naslova.
   - Rezultat: naslov/podnaslov/gumbi vidno više, ali bez preklapanja s izbornikom.

2. Pozadinska slika (`src/components/Hero.tsx`)
   - `backgroundPosition` na mobitelu se mijenja s `center 80%` na približno `center 42%`, čime momčad dolazi u vertikalnu sredinu ekrana pri učitavanju.
   - Desktop vrijednosti (`center center`, `backgroundSize: 140%`) ostaju iste.

## Provjera

Prikaz na mobilnoj širini (393px): provjera da je momčad centrirana i da otvoreni izbornik ne prekriva naslov; provjera da desktop izgled nije promijenjen.
