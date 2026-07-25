## Redizajn kartica sponzorskih paketa

Promjena se odnosi samo na 4 tier kartice (ZLATNI, SREBRENI, BRONČANI, itd.) u `src/components/Sponsors.tsx`. Kartica s podacima za plaćanje ostaje ista.

### Nova pozadina i obrub
- Pozadina: gradient od bijele na vrhu (`#ffffff`) prema krem-zlatnoj pri dnu (`#faf3e0`) — `linear-gradient(180deg, #ffffff 0%, #fff8e6 60%, #faf3e0 100%)`
- Obrub: 1.5px zlatni `#d4a017` (deblji, topliji od trenutnog `border-border/40`)
- Sjena u mirovanju: mekana zlatna `0 4px 16px rgba(212,160,23,0.12)`
- Border radius ostaje `rounded-xl`

### Hover
- Zadržava se postojeći tier glow (žuti/srebrni/brončani/crveni) — postaje intenzivniji
- Dodatni suptilni zlatni obrub glow uz tier glow
- `scale-[1.03]` ostaje

### Tipografija (nepromijenjena)
- Ime tiera, ikona, cijena i benefiti ostaju u trenutnim bojama i veličinama
- Zadržavaju se `tier.color` klase za naslov i ikonu

### Tehnički detalji
- Uređuje se samo jedan `<div>` unutar `sponsorTiers.map(...)` (linije ~172-192 u `src/components/Sponsors.tsx`)
- Bijeli `bg-white` zamjenjuje se inline `style={{ background: '...' }}` gradijentom
- `border border-border/40` zamjenjuje se zlatnim inline stilom
- Inline `boxShadow` u mirovanju; tier-specifični hover shadow ostaje kroz Tailwind arbitrary klasu
- Nema izmjena u `index.css` ni u drugim komponentama
