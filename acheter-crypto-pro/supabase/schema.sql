-- Supabase schema pour Acheter Crypto Pro
-- À exécuter dans SQL Editor après création du projet Supabase.

create extension if not exists "uuid-ossp";

create type public.user_role as enum ('user', 'premium', 'support', 'editor', 'analyst', 'admin', 'super_admin');
create type public.content_status as enum ('draft', 'published', 'scheduled', 'archived');
create type public.signal_status as enum ('draft', 'active', 'watching', 'closed', 'archived');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role public.user_role not null default 'user',
  is_premium boolean not null default false,
  stripe_customer_id text,
  created_at timestamptz not null default now()
);

create table public.courses (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  level text not null,
  is_premium boolean not null default false,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now()
);

create table public.lessons (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  content text,
  video_url text,
  sort_order int not null default 0,
  is_premium boolean not null default false
);

create table public.user_progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table public.analyses (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  summary text,
  content text,
  premium_content text,
  tag text,
  status public.content_status not null default 'draft',
  is_premium boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.signals (
  id uuid primary key default uuid_generate_v4(),
  asset text not null,
  direction text not null check (direction in ('Long', 'Short')),
  entry text not null,
  target text not null,
  stop text not null,
  risk text not null,
  confidence int not null default 50,
  status public.signal_status not null default 'draft',
  rationale text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admin_logs (
  id uuid primary key default uuid_generate_v4(),
  actor uuid references public.profiles(id),
  action text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.user_progress enable row level security;
alter table public.analyses enable row level security;
alter table public.signals enable row level security;
alter table public.admin_logs enable row level security;

create policy "Profiles can read themselves" on public.profiles for select using (auth.uid() = id);
create policy "Public can read published courses" on public.courses for select using (status = 'published');
create policy "Public can read published analyses" on public.analyses for select using (status = 'published');
create policy "Premium can read active signals" on public.signals for select using (status in ('active', 'watching', 'closed'));

-- Les politiques admin complètes doivent être ajoutées via fonction is_admin() en production.
