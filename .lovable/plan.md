# Pregled PDF-a izravno na stranici Projekt

## Što se mijenja

- Svaka kartica dokumenta dobiva dva gumba:
  - **Pregled** — otvara dokument u prozoru preko stranice, bez preuzimanja.
  - **PDF** — kao i dosad, otvara/preuzima datoteku.
- Prozor za pregled prikazuje naslov dokumenta, veliki prikaz PDF-a, gumb za zatvaranje i poveznicu "Otvori u novoj kartici" (koristi se i kao rezerva na mobitelima gdje preglednik ne prikazuje PDF ugrađeno).
- Zatvaranje klikom izvan prozora ili tipkom Esc.
- Stil ostaje u plavo-zlatnoj shemi stranice.

## Tehnički detalji

- U `src/pages/ProjectPage.tsx` dodati stanje `previewDoc` i shadcn `Dialog` (`@/components/ui/dialog`) s `<iframe src={doc.file_url} />` unutar visokog spremnika (`h-[80vh]`).
- Klik na karticu i dalje vodi na PDF; gumbi unutar kartice koriste `e.preventDefault()`/`stopPropagation()` za otvaranje pregleda.
- Potpisani URL-ovi iz `admin-documents/list-public` rade u `iframe`-u, pa nije potrebna promjena na backendu.
