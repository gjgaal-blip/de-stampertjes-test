# De Stampertjes v2.20 Beta 6.9.1 — Player Cleanup

- Per speler staat in de Developer Portal een knop `🗑️ VERWIJDER SPELER`.
- De bevestiging toont spelersnaam en verkort device-ID.
- `admin_delete_player` vereist de bestaande admincode.
- Spelerprofiel en gekoppelde analytics-events worden verwijderd.
- Highscores en Café-berichten blijven behouden.
- Een verwijderd device kan later opnieuw als speler worden aangemaakt wanneer het weer speelt.

Voer eerst `003_v220_beta691_delete_player.sql` uit in Supabase.
