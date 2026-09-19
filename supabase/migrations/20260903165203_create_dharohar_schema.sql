/*
# Dharohar — Cultural Heritage Platform Schema

## Overview
Creates the core database tables for Dharohar, a platform to discover, preserve, and share India's cultural heritage. The app is a public discovery platform with a community contribution flow.

## New Tables

1. **traditions** — Catalogued Indian cultural traditions (Phad Painting, Chhau Dance, etc.)
   - id, name, state, district, category, language, description, history (jsonb), location (text), cover_image, gallery (jsonb array), created_at

2. **artisans** — Profiles of craftspeople preserving traditions
   - id, name, craft, state, district, bio, image, years_experience, tradition_id (nullable FK)

3. **stories** — Cultural stories linked to traditions
   - id, title, tradition_id (nullable FK), content, author, language, image, reading_time, state, category, created_at

4. **contributions** — Community-submitted heritage entries pending verification
   - id, title, state, district, category, language, description, story, contributor_name, contributor_contact, status (default 'pending'), created_at

5. **categories** — Reference list of heritage categories (Folk Art, Handicrafts, etc.)
   - id, name, slug, description, icon, entry_count

## Security
- RLS enabled on all tables.
- traditions, artisans, stories, categories: publicly readable (anon + authenticated SELECT).
- contributions: publicly insertable (anyone can submit), publicly readable (to show in admin/feed).
- No user_id columns — this is a public catalog with community submissions, not per-user data.
- Admin actions (update/delete) are open to anon+authenticated for the MVP since auth is mocked per spec.
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  entry_count integer DEFAULT 0
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

-- Traditions table
CREATE TABLE IF NOT EXISTS traditions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  state text NOT NULL,
  district text,
  category text NOT NULL,
  language text,
  description text,
  history jsonb,
  location text,
  cover_image text,
  gallery jsonb DEFAULT '[]'::jsonb,
  how_its_made jsonb DEFAULT '[]'::jsonb,
  artisan_name text,
  artisan_bio text,
  artisan_image text,
  artisan_location text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE traditions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_traditions" ON traditions;
CREATE POLICY "public_read_traditions" ON traditions FOR SELECT
  TO anon, authenticated USING (true);

-- Artisans table
CREATE TABLE IF NOT EXISTS artisans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  craft text NOT NULL,
  state text NOT NULL,
  district text,
  bio text,
  image text,
  years_experience integer DEFAULT 0,
  tradition_id uuid REFERENCES traditions(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE artisans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_artisans" ON artisans;
CREATE POLICY "public_read_artisans" ON artisans FOR SELECT
  TO anon, authenticated USING (true);

-- Stories table
CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  tradition_id uuid REFERENCES traditions(id) ON DELETE SET NULL,
  content text,
  author text,
  language text,
  image text,
  reading_time text,
  state text,
  category text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_stories" ON stories;
CREATE POLICY "public_read_stories" ON stories FOR SELECT
  TO anon, authenticated USING (true);

-- Contributions table
CREATE TABLE IF NOT EXISTS contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  state text NOT NULL,
  district text,
  category text NOT NULL,
  language text,
  description text,
  story text,
  contributor_name text NOT NULL,
  contributor_contact text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_contributions" ON contributions;
CREATE POLICY "public_read_contributions" ON contributions FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_insert_contributions" ON contributions;
CREATE POLICY "public_insert_contributions" ON contributions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_update_contributions" ON contributions;
CREATE POLICY "public_update_contributions" ON contributions FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "public_delete_contributions" ON contributions;
CREATE POLICY "public_delete_contributions" ON contributions FOR DELETE
  TO anon, authenticated USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_traditions_state ON traditions(state);
CREATE INDEX IF NOT EXISTS idx_traditions_category ON traditions(category);
CREATE INDEX IF NOT EXISTS idx_artisans_state ON artisans(state);
CREATE INDEX IF NOT EXISTS idx_stories_state ON stories(state);
CREATE INDEX IF NOT EXISTS idx_contributions_status ON contributions(status);
