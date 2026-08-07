# De Stampertjes – Changelog

## v2.13 – Stable Foundation
- Spelcode opgesplitst in losse HTML, CSS en JavaScript-bestanden.
- `index.html` bevat alleen nog de structuur van het spel.
- `admin.html` blijft een aparte Developer Portal.
- Centrale `js/config.js` voor versie en Supabase-configuratie.
- Muziek verplaatst naar `/audio`.
- Eén veilige Supabase-migratie toegevoegd die bestaande data behoudt.
- Geen pgcrypto of hashes meer nodig.
- Alle JavaScript-bestanden afzonderlijk gevalideerd.
