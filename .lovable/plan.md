## Nova paleta admin panela

Primjena isključivo u `src/pages/AdminPanel.tsx` (login + panel view). Ne dira ostatak stranice.

**Boje:**
- Pozadina stranice: `#faf3e0` (topla kremasto-zlatna)
- Kartice/panel: `#ffffff` s tankim zlatnim obrubom `#c9a24c`
- Inputi: bijeli s obrubom `#f0e4c2`, plavi tekst `#0E2A63`
- Naslovi i labeli: plavi `#0E2A63`
- Gumb Prijava: zlatni `#c9a24c` s bijelim tekstom (hover: tamnija zlatna)
- Gumb Natrag (gore lijevo): bijeli s plavim tekstom, hover zlatni s bijelim (već postoji stil)

## Promjene

1. **Login ekran** — pozadina `#faf3e0` umjesto trenutne plave; kartica ostaje bijela sa suptilnim zlatnim obrubom i sjenom; inputi bijeli (ne kremasti kao sad) s plavim tekstom.
2. **Admin panel view** (nakon logina) — ista `#faf3e0` pozadina, kartice sekcija (Vijesti/Galerije/Utakmice/Igrači) bijele sa zlatnim obrubom; naslovi sekcija plavi.
3. **Gumb Natrag** — ostaje u gornjem lijevom kutu, nepromijenjen.

Nema promjena na bazi, funkcionalnosti ni ostalim stranicama.