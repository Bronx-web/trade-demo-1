# Supabase Prep Notes

Structure prep only in this phase. No implementation, no live connection yet.

## Known data entry points (from current site)
1. **Instant Quote Calculator**
   - Service type (dropdown)
   - Area size (m²)
   - Site complexity (dropdown)
   - Include materials (checkbox)
   - Special instructions (text)
   - Output: calculated quote (needs pricing logic reviewed separately)

2. **Quote & Booking page**
   - Service area selection (chips: Christchurch City, Selwyn District, Waimakariri, Rolleston, Rangiora, Kaiapoi, Lincoln, Brighton)
   - Likely a booking/contact form below the map (confirm once full page reviewed)

## Questions to resolve before implementation
- Does the quote calculator need to store submitted quotes, or just calculate and display?
- Should booking submissions trigger a notification (email, SMS via Vapi AI, etc.)?
- Multi-tenant structure needed if this template gets reused per client (one Supabase project per client, or shared project with client_id column)?

## Suggested table shape (draft, not final)
- `quotes`: id, client_id, service_type, area_size, complexity, materials_included, notes, calculated_price, created_at
- `bookings`: id, client_id, name, contact, service_area, preferred_date, status, created_at

Revisit this file once the refactor is done and actual form field names are confirmed.
