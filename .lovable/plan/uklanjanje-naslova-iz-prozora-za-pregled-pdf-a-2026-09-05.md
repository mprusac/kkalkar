# Uklanjanje naslova iz prozora za pregled PDF-a

## Što se mijenja

- Naslov dokumenta u zaglavlju prozora za pregled se uklanja.
- Ostaje samo centrirana poveznica „Otvori u novoj kartici", a odmah ispod prikaz PDF-a.
- Kartice dokumenata na stranici ostaju nepromijenjene.

## Tehnički detalji

- U `src/pages/ProjectPage.tsx` ukloniti vidljivi `DialogTitle` tekst; zadržati skriveni naslov (`sr-only`) radi pristupačnosti Dialoga, uz kraći razmak u zaglavlju.
