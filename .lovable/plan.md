## Preboj stranice Statistika u bijelo-krem paletu

Trenutna stranica koristi tamno plavu (`bg-background` = navy) s poluprozirnim `bg-secondary/30` karticama. Pretvaram cijelu stranicu u svijetlu paletu, uz zadržavanje strukture, layouta, tabsa i funkcionalnosti.

### Paleta
- Pozadina stranice: bijela `#ffffff`
- Kartice (Nedavna forma, Utakmice, Poredak, Igrači, Tim, sub-kartice): krem `#faf3e0`, zlatni obrub `1.5px #d4a017`, mekana zlatna sjena `0 4px 16px rgba(212,160,23,0.12)`
- Header stranice (sticky top bar): ostaje plavi (kao Navbar) — nepromijenjen
- Tekst: primarni tamno plavi `#0E2A63`, prigušeni `rgba(14,42,99,0.65)`
- Zlatni akcenti: brojevi, aktivni tabovi, ikone, hover borders `#d4a017` / `#b8860b`
- Zeleno/crveno za W/L rezultate i pobjede: ostaje (jače kontrastirano na svijetloj podlozi — koristim `bg-green-500/20 text-green-700` i `bg-red-500/20 text-red-700`)

### Komponente
1. **Root wrapper** — `bg-background` → `bg-white`
2. **Sticky header** — ostavlja se plavi (već je uskladen s Navbarom)
3. **Sidebar "Nedavna forma"** — krem kartica, zlatni obrub, tamno plavi naslov, W/L badge-ovi zadržavaju zeleno/crveno
4. **Sidebar "Utakmice"** — krem kartica, tamno plavi tekst, redovi utakmica sa suptilnim krem hoverom (`hover:bg-[#fff8e6]`), datumi i badges u tamno plavoj
5. **TabsList (POREDAK / IGRAČI / TIM)** — krem pozadina, aktivni tab: zlatna pozadina `#d4a017` s bijelim tekstom; neaktivni: tamno plavi tekst na krem
6. **Poredak tablica**
   - Kartica: krem, zlatni obrub
   - Header liga (SuperSport Premijer Liga badge, 25/26, Seniori): bijele pill oznake sa zlatnim obrubom, plavi tekst
   - Zaglavlje tablice: tamno plava, prigušena
   - Redovi: tamno plavi tekst; hover `bg-[#fff8e6]`; separator linije `#e8d99a`
   - Alkar row highlight: `bg-[#faf3e0]` sa zlatnim lijevim rubom
   - Zadnjih 5 badge-ovi: zeleno/crveno kao sad, kontrast prilagođen svijetloj podlozi
   - "Doigravanje za ostanak" / "Ispadanje" separator: zadržavaju narančastu/crvenu točku
7. **Igrači tab**
   - Vanjska kartica: krem, zlatni obrub
   - Sub-tabs (Top igrači / Roster): zlatni active, plavi text
   - 6 kategorija (Poeni, Skokovi, Asistencije, itd.): manje krem kartice `#fff8e6` sa zlatnim obrubom, plavi naslov, zlatni broj
   - Redovi igrača: plavi tekst, hover suptilni krem
8. **Tim tab (Pregled)**
   - Vanjska kartica: krem, zlatni obrub
   - 4 stat boxa (POENI, SKOKOVI, ASISTENCIJE, AST/TO): bijeli sa zlatnim obrubom, veliki plavi broj, mali zlatni label
   - Šut / Skokovi / Ostalo kolone: plavi label, zlatna postotna pill oznaka
   - EFG% / TS% pill: zlatna pozadina, tamno plavi tekst
9. **"Preuzmi datoteku" widget (donji desni)** — ostaje krem sa zlatnim obrubom, plavi tekst i naslov, checkmark ikone u zlatnoj
10. **Paginacija** — okrugli gumbi: bijeli sa zlatnim obrubom, plavi tekst, hover zlatna pozadina

### Ograničenja
- Samo `src/pages/Statistics.tsx` se dira
- Ne mijenja se funkcionalnost, layout, spacing, veličine, animacije
- Ne mijenjaju se komponente `Navbar`, `Footer`, `Results`
- Ne mijenja se `index.css` niti globalni tokeni — sve promjene preko Tailwind arbitrary klasa i inline `style` (isti pristup kao za kartice postignuća/sponzora)
