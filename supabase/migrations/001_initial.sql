-- Maris Stitches and Contour — Supabase Schema
-- Run this in your Supabase project > SQL Editor

-- ─── Profiles (extends auth.users) ───────────────────────────
create table if not exists profiles (
  id   uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'owner'
);

-- ─── Portfolio Items ──────────────────────────────────────────
create table if not exists portfolio_items (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  category    text not null,
  caption     text,
  image_url   text not null,
  blur_hash   text,
  sort_order  integer default 0,
  featured    boolean default false,
  published   boolean default true,
  created_at  timestamptz default now()
);

-- ─── Row Level Security ───────────────────────────────────────
alter table portfolio_items enable row level security;

-- Public: read published items only
create policy "public_read" on portfolio_items
  for select
  using (published = true);

-- Authenticated owner: full access
create policy "owner_all" on portfolio_items
  for all
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ─── Storage Bucket ───────────────────────────────────────────
-- Run in Supabase Dashboard > Storage:
-- 1. Create bucket named "portfolio"
-- 2. Set to public
-- 3. Add policy: authenticated users can upload/delete
