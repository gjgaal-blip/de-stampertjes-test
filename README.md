# De Stampertjes v2.20 RC2

Gebaseerd op RC1.

Nieuw in RC2:
- Developer Portal > Recente activiteit toont nu de spelersnaam in plaats van de korte device-code.
- De koppeling gebeurt lokaal op basis van `device_id` uit de bestaande dashboard-spelerslijst.
- Alleen voor oude/orphaned events zonder bijbehorend spelerprofiel wordt nog teruggevallen op `#device-id`.
- Geen databasewijziging en geen nieuwe SQL nodig.

Alle RC1-functies, score sharing, Teddy tracking en player cleanup blijven behouden.
