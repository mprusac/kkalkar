# Popravak slika koje se ne učitavaju u admin panelu

## Problem

Slike igrača, vijesti, galerija i logotipa protivnika spremljene su u bazi kao **relativne** putanje oblika `/__l5e/assets-v1/<id>/<ime>.png`. Te putanje rade samo na Lovable pregledu; na objavljenoj/vlastitoj domeni (`kkposusje.ba`) preglednik ih traži na krivom hostu i slika pukne (prazan okvir s ikonom, kao na priloženoj slici).

Slike koje dolaze iz koda već se popravljaju Vite pluginom koji im dodaje apsolutnu bazu, ali podaci iz baze kroz taj plugin nikad ne prolaze.

Provjereno: 22 zapisa igrača u bazi imaju upravo takve relativne putanje.

## Rješenje

Uvesti jednu pomoćnu funkciju koja svaku sliku prije prikaza normalizira: ako putanja počinje s `/__l5e/assets-v1/`, dodaje se apsolutna Lovable baza; sve ostale (potpisani storage URL-ovi, vanjski linkovi) ostaju nepromijenjene.

Primijeniti je na svim mjestima gdje se prikazuju slike iz baze:

- Admin panel: popis igrača, popis vijesti, pretpregled slike u formama za vijest, galeriju, igrača i utakmicu
- Javne stranice: kartice igrača (Naš tim), vijesti, galerija, logotipi protivnika u zadnjim utakmicama

Time se slike učitavaju jednako u pregledu, na objavljenoj stranici i na vlastitoj domeni.

## Tehnički detalji

- Nova funkcija `resolveAssetUrl(url)` u `src/lib/utils.ts` (ista baza kao `LOVABLE_ASSET_BASE` u `vite.config.ts`).
- Umotati `src` vrijednosti u `src/pages/AdminPanel.tsx`, `src/lib/adminNews.ts`, `src/lib/adminMatches.ts` te u komponentama koje te podatke prikazuju.
- Bez promjena u bazi i bez promjena dizajna.
