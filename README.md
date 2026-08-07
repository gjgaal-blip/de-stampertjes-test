# De Stampertjes v2.20 Beta 6.4

Gerichte reparatie van de demo.

## Opgelost
- De kleine demo blijft nu inclusief rand netjes binnen het witte menu-frame.
- De fullscreen demo na 12 seconden werkt weer.
- Oorzaak van het zwarte scherm: `introCanvas` zit in `#panel`, terwijl Beta 6.3 het volledige `#panel` verborg.
- In Beta 6.4 blijft het panel bestaan en worden alleen de andere menu-elementen verborgen.
- Tik/swipe/toets keert terug naar het menu.
- De attract mode blijft 60 seconden doorlopen met 6 verschillende scène-offsets per minuut.
- Iedere nieuwe minuut wordt opnieuw gerandomiseerd.

Alle gameplay-, audio-, level- en scrollfixes uit Beta 6.2/6.3 blijven behouden.
Geen Supabase-wijziging nodig.
