# De Stampertjes v2.4.4.2 — Button Fix

Gebouwd op v2.4.4.1.

Oorzaak van niet-werkende knoppen:
- game.js verwachtte updateOverlay en closeUpdateBtn;
- deze waren uit index.html verwijderd;
- JavaScript stopte daardoor voordat menu-events actief werden.

Fix:
- benodigde DOM-elementen hersteld maar permanent verborgen;
- update-popup uitgeschakeld;
- oude bewegende attract-mode uitgeschakeld;
- zes echte JPG-startschermen blijven behouden;
- gameplay en levels niet gewijzigd.
