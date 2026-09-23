# v2.5 HD bèta — validatie

28 lokale regressietests geslaagd: bossfases tot en met overwinning, val van exact één verdieping, blijvende versuffing, cooldown, schade/invulnerability, pauze, verlies, routes tussen verdiepingen, omkeren op ladders, alle tien HD-kamers, oefenscheiding, doorgang 10 → boss → 11, veilige scoreweergave, opslaguitval en simulatiesnelheid op 30/60/120/144 Hz.

De browser-suite bevat 7 scenario’s × 4 profielen (Chromium desktop/mobiel, Firefox desktop, WebKit iPhone). De actuele GitHub Actions-run is leidend voor de browserstatus. Screenshots worden als artifact bewaard. Alle externe verzoeken zijn gemockt; echte Supabase-persistentie en fysieke telefoons zijn niet geverifieerd. Geluid is niet op gehoor beoordeeld.

De eerste browserrondes vonden een te strikte pixelvergelijking in de routetest, te weinig voorbereidingstijd in de bossopening en afwijkende WebKit-canvasweergave. De rendering gebruikt nu één vaste logische resolutie (600×840); tikcoördinaten houden rekening met de canvasrand. Bedieningsknoppen staan onder het speelveld. De definitieve run moet deze correcties bevestigen.
