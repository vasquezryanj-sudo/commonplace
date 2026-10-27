-- Commonplace: database setup
-- Paste this whole file into Supabase > SQL Editor > New query, then click Run.

create table if not exists public.sources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  type text not null check (type in ('book', 'article', 'podcast')),
  title text not null,
  authors text not null default '',          -- "Last, First; Last, First"
  details jsonb not null default '{}'::jsonb, -- type-specific fields (publisher, journal, episode, etc.)
  citation_overrides jsonb not null default '{}'::jsonb, -- {bibliography, note, short} when edited by hand
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  source_id uuid not null references public.sources (id) on delete cascade,
  text text not null,
  locator text not null default '',  -- page number or podcast timestamp
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  source_id uuid not null references public.sources (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists quotes_source_idx on public.quotes (source_id);
create index if not exists notes_source_idx on public.notes (source_id);
create index if not exists quotes_tags_idx on public.quotes using gin (tags);

-- Keep updated_at current on edits
create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at = now(); return new; end $$;

drop trigger if exists sources_touch on public.sources;
create trigger sources_touch before update on public.sources for each row execute function public.touch_updated_at();
drop trigger if exists quotes_touch on public.quotes;
create trigger quotes_touch before update on public.quotes for each row execute function public.touch_updated_at();
drop trigger if exists notes_touch on public.notes;
create trigger notes_touch before update on public.notes for each row execute function public.touch_updated_at();

-- Only the signed-in owner can see or change their rows
alter table public.sources enable row level security;
alter table public.quotes enable row level security;
alter table public.notes enable row level security;

drop policy if exists "own sources" on public.sources;
create policy "own sources" on public.sources for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "own quotes" on public.quotes;
create policy "own quotes" on public.quotes for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "own notes" on public.notes;
create policy "own notes" on public.notes for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
