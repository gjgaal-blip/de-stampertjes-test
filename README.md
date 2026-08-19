# De Stampertjes v2.4.4.3 — Browser-tested menu fix

Root cause:
game.js immediately calls introCanvas.getContext("2d") during startup.
The static startscreen builds had removed introCanvas. JavaScript therefore
stopped before the menu button handlers were attached.

Fix:
- hidden compatibility introCanvas restored;
- six real JPG startscreens remain unchanged;
- static start screen remains;
- gameplay and level code unchanged.

Runtime test:
The final HTML/CSS/config/game code was loaded in Chromium at an iPhone-sized
viewport. SPELEN was visible and clicking SPELEN made the game canvas visible.
