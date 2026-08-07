# De Stampertjes – Changelog

## v2.12.4 – Café Moderation
- Spelers kunnen hun eigen Café-berichten verwijderen.
- Spelers kunnen hun eigen Café-berichten bewerken.
- Eigenaarschap wordt gekoppeld aan een lokaal apparaat-ID.
- Verborgen GJ Studios-beheermodus toegevoegd: 5× tikken op `A GJ STUDIOS GAME`.
- Admin kan elk Café-bericht verwijderen na invoeren van de geheime beheercode.
- Admincode staat niet in de spelcode maar wordt als hash in Supabase opgeslagen.
- Directe publieke insert/update/delete op de Café-tabel vervangen door gecontroleerde RPC-functies.
