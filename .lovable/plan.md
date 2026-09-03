# Kontakt forma: novi primatelj i novi podaci u mailovima

## Cilj
- Ispunjena kontakt forma sa stranice ide na **ured.alkar@gmail.com**.
- Korisnik i dalje dobiva mail zahvale ("javit ćemo vam se ubrzo") na adresu koju je sam upisao u formu.
- U oba mail sučelja piše **ured.alkar@gmail.com** umjesto kontakt@kkalkar.hr.
- U oba mail sučelja link stranice je **kkalkar.online** (puni link https://kkalkar.online/), uključujući gumb "Posjetite našu web stranicu".

## Što se mijenja
Sve promjene su u funkciji za slanje kontakt maila (`supabase/functions/send-contact-email/index.ts`):

1. Adresa kluba u podnožju oba maila: `kontakt@kkalkar.hr` → `ured.alkar@gmail.com`.
2. Primatelj ispunjene forme: umjesto dosadašnjeg `mprusac0@gmail.com` sada `ured.alkar@gmail.com`; odgovor (reply-to) i dalje ide na adresu korisnika koji je ispunio formu.
3. Rezervni primatelj koji se koristi kad Resend u test načinu odbije glavnog primatelja ostaje kao sigurnosna mreža (`mprusac23@student.foi.hr`).
4. Link kluba: `https://kkposusje-digital-court.lovable.app` → `https://kkalkar.online/`, a prikazani tekst linka u podnožju `kkalkar.hr` → `kkalkar.online`. Gumb "Posjetite našu web stranicu" koristi isti link.
5. Nakon izmjena funkcija se ponovno objavljuje (deploy) da promjene stupe na snagu.

Sučelje kontakt forme na stranici već prikazuje ured.alkar@gmail.com, pa se tamo ništa ne mijenja.

## Napomena o dostavi
Mailovi se trenutno šalju s adrese `onboarding@resend.dev` (Resend test način). U tom načinu Resend pouzdano dostavlja samo na adresu vlasnika Resend računa — moguće je da mail na ured.alkar@gmail.com ili korisnikovu adresu bude odbijen dok se ne verificira vlastita domena (npr. kkalkar.online) u Resendu. Kod ostaje ispravan, a nakon verifikacije domene sve prolazi bez rezervnog primatelja.
