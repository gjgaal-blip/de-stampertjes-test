# De Stampertjes v2.20 Beta 6.9.5 — Stability Fix

Belangrijkste reparatie:
- Beta 6.9.4 riep `spawnLevel()` al tijdens het laden van JavaScript aan.
- Door de nieuwe Teddy-code gebruikte `spawnLevel()` daarbij `livingCastle` voordat die `const` was geïnitialiseerd.
- Dat veroorzaakte een JavaScript ReferenceError en stopte de verdere initialisatie, waardoor SPELEN niets meer deed.
- De voortijdige `spawnLevel()` is verwijderd. Het level wordt nu alleen gestart vanuit `startGame()` of een echte levelovergang.

Updatevenster:
- Veel korter gemaakt.
- Details verwijzen naar Kasteelkrant/Kronieken.
- Op iPhone scrollt alleen de inhoud van de updatekaart.
- De knop BEKIJK BETA 6.9.5 blijft onderaan zichtbaar.

Teddy Moment, level/zaal-sync, ladder-polish, analytics en Developer Portal blijven behouden.
Geen nieuwe Supabase SQL nodig.
