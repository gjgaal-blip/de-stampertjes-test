# De Stampertjes – Changelog

## v2.12.6 – Admin Delete Fix
- Beheercode wordt nu eerst echt door Supabase gevalideerd.
- Verkeerde code activeert de beheermodus niet meer.
- Verwijderen van andermans Café-bericht controleert nu de boolean response van Supabase.
- Developer Console controleert of de beheersessie nog geldig is.
- Nieuwe RPC `verify_stampertjes_admin` toegevoegd.
