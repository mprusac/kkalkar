## Redizajn kartica postignuća — svijetlo zlatna paleta

Promjena se odnosi isključivo na kartice u odjeljku "Postignuća" u `src/components/About.tsx`. Ostatak stranice, tipografija, ikone i tekst ostaju nepromijenjeni.

### Nova paleta
- Pozadina kartice: krem-zlatna `#faf3e0`
- Obrub: zlatni `#d4a017` (1.5px)
- Naslov postignuća: tamno plava `#0E2A63` (bold)
- Opis / podtekst: tamnija plava, malo prigušena
- Ikona/emoji: ostaje kao trenutno (emoji), ali u zlatnom kružiću `#f0d78a` s tamno plavim obrubom
- Sjena: mekana zlatna `0 4px 20px rgba(212,160,23,0.15)`

### Hover stanje
- Pozadina blago posvijetli prema `#fff8e1`
- Obrub jači zlatni glow `0 0 24px rgba(212,160,23,0.35)`
- Kartica se lagano podigne (`translate-y-[-2px]`)
- Smooth prijelaz 300ms

### Naslov odjeljka
"Postignuća" naslov ostaje u trenutnoj svijetlo zlatnoj boji — bez promjene.

### Tehnički detalji
- Uređuje se samo blok koji renderira `achievements.map(...)` u `src/components/About.tsx`
- Zamjenjuju se Tailwind klase koje trenutno postavljaju plavu pozadinu (`bg-navy` / slično) s krem-zlatnom
- Tekst klase prebacuju se iz bijele/zlatne u plavu
- Nema izmjena u `index.css` tokenima — koriste se inline arbitrary Tailwind vrijednosti da ne utječe na ostatak stranice
