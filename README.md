# De Stampertjes — v2.5 HD bèta

Deze testomgeving bouwt voort op v2.4.4.5: de tien HD-kamers, wisselende startbeelden, Kronieken, Hall of Fame, Café en wallpapers zijn behouden.

Nieuw:
- De Appelbaas na kamer 10, of direct oefenen via het hoofdmenu. Vijf treffers: maak een valvloer met drie stamps, laat de zware baas vallen, daal af via een ladder en stamp dichtbij terwijl hij versuft is. Jij kunt veilig over deze magische valvloeren lopen. Ontwijk de aangekondigde verticale aanvallen. Na winst gaat het gewone avontuur verder in kamer 11; een nederlaag geeft een herkansing.
- Tikbediening: tik een bestemming op het speelveld, ook op een andere verdieping. Een marker toont je doel en het Stampertje volgt ladders. Tik op jezelf of op STAMP om te stampen. De knop TIKBEDIENING/PIJLTJES wisselt van bediening. Op telefoons staat tikken standaard aan. Routes ontwijken geen vijanden of gaten: timing blijft onderdeel van het spel.
- Kameratlas om elk level vrij te oefenen. Oefenen verbruikt geen Teddy-bonus en schrijft geen spelrecords of gameplay-events. Bosskronen worden uitsluitend lokaal bewaard.
- Nieuw menu, leesbare bedieningsknoppen, mobiele en liggende layout, toetsenbordfocus en verminderde animatie.
- Kerkers-startcrash, pauze/Escape, foutloos-statistieken en oefenafsluiting gerepareerd. Het spel draait op een vaste simulatiesnelheid.
- Dezelfde drie HD-afbeeldingen worden als bestaande JPG-bestanden geladen: game.js is teruggebracht van circa 6 MB naar 165 kB.

## Testen

`npm ci`, `npm test`, `npx playwright install --with-deps chromium firefox webkit`, `npm run test:browser`.
De browser-suite onderschept alle externe verzoeken voordat de pagina wordt geopend. Tests schrijven geen productiegegevens. De GitHub Actions-workflow voert de tests uit en bewaart screenshots en een Playwright-rapport.

Lokaal starten: `python3 -m http.server 8765 --bind 127.0.0.1`; open http://127.0.0.1:8765 . Gewoon spelen gebruikt de bestaande Supabase-configuratie. De backend is in deze wijziging niet aangepast. De eerder gemelde beveiligingsactie voor de gedeelde beheercode blijft een afzonderlijke Supabase-taak.
