# De Stampertjes v2.3.3 — Level 2 Viewport Fix

Fix gebaseerd op de screenshots van level 1 en level 2.

Oorzaak:
- chooseLayoutForLevel zette level 2 wel naar 600x840;
- spawnLevel had daarna alleen hard guards voor Entreehal en Troonzaal;
- Wapenzaal kreeg daardoor niet dezelfde volledige portrait handhaving.

Fix:
- spawnLevel bevat nu ook een Wapenzaal hard guard.
- Level 2 krijgt exact dezelfde 600x840 geometry als level 1.
- Extra CSS zorgt dat alle portrait rooms exact dezelfde canvas-wrapper gebruiken.

Geen wijzigingen aan level 1, collisions, smooth-fall of gameplay.
