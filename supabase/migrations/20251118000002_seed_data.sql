-- Seed initial event data
INSERT INTO events (title, description, start_date, end_date, location, status, max_attendees)
VALUES (
  'ABC Summit 2025',
  'Annual conference for Action Behavior Centers',
  '2026-02-27 09:00:00+00',
  '2026-02-28 17:00:00+00',
  'Gaylord Texan, Grapevine, TX',
  'published',
  2400
)
ON CONFLICT DO NOTHING;

