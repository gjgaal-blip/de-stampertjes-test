# De Stampertjes v2.26-beta.3.6.4 — Entreehal + Mascot + Ladder Collision

## Level 1 — Entreehal
- Nieuwe schone HD Entreehal als achtergrond.
- Geen ladders, speelvloeren, Appelieten of speler ingebakken in de achtergrond.
- 600×840 logische portrait-gamewereld, tot 1800×2520 Retina.
- Vier echte engine-vloeren met eigen ladderlayout.

## Speler
- Nieuwe blauw/gouden mascotte met kroon in level 1 en level 5.
- Visueel groter, maar gameplay-hitbox blijft 24×28.

## Ladder collision
- Nieuwe `checkAllEnemyCollisions()` draait na alle vijandbeweging.
- Botsing is uitsluitend gebaseerd op wereldpositie-overlap.
- Floor-state en `onLadder` bepalen niet meer of een botsing telt.
- Daardoor kan een Appeliet de speler ook midden op een ladder raken.

Level 5 Troonzaal en smooth-fall blijven behouden.
