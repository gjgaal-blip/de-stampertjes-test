# De Stampertjes v2.20 Beta 6.9.4 — Teddy Moment

Teddy is nu een echte zeldzame gameplay-ontmoeting.

- Teddy verschijnt na een langere wachttijd op een veilige, bereikbare vloer.
- Hij blijft ongeveer 8 seconden staan; je moet er met het Stampertje naartoe lopen.
- Teddy spawnt niet bij gaten, ladders, bonusvoorwerpen, vijanden of direct naast de speler.
- Bij fysiek aanraken:
  - stopt de normale achtergrondmuziek volledig;
  - bevriezen vijanden en gameplay 3 seconden;
  - Teddy doet een pixel-dansje;
  - een unieke Teddy-jingle speelt;
  - `TEDDY GEVONDEN! +2000` verschijnt;
  - 2.000 punten worden toegevoegd;
  - Teddy achievement/statistiek en analytics worden geregistreerd.
- Daarna hervat de achtergrondmuziek op dezelfde plek.
- Bij ALLEEN FX klinkt de jingle zonder achtergrondmuziek; bij ALLES UIT blijft het stil.
- Als Teddy niet op tijd wordt bereikt, verdwijnt hij en kan hij later opnieuw verschijnen.

Geen nieuwe Supabase SQL nodig; `teddy_found` bestond al in de analytics-migratie.
