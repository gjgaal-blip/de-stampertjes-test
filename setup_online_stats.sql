-- DE STAMPERTJES - ONLINE STATISTIEKEN
-- Eenmalig uitvoeren in Supabase: SQL Editor > New query > Run

create table if not exists public.player_stats (
  device_id uuid primary key,
  player_name text not null default 'SPELER'
    check (char_length(player_name) between 1 and 10),
  games_played integer not null default 0 check (games_played between 0 and 999999999),
  best_score integer not null default 0 check (best_score between 0 and 999999999),
  highest_level integer not null default 1 check (highest_level between 1 and 999999),
  apples_defeated integer not null default 0 check (apples_defeated between 0 and 999999999),
  deaths integer not null default 0 check (deaths between 0 and 999999999),
  longest_combo integer not null default 0 check (longest_combo between 0 and 999999),
  teddy_found boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.player_stats enable row level security;

revoke all on table public.player_stats from anon;
revoke all on table public.player_stats from authenticated;

create or replace function public.submit_player_stats(
  p_device_id uuid,
  p_player_name text,
  p_games_played integer,
  p_best_score integer,
  p_highest_level integer,
  p_apples_defeated integer,
  p_deaths integer,
  p_longest_combo integer,
  p_teddy_found boolean
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.player_stats (
    device_id,
    player_name,
    games_played,
    best_score,
    highest_level,
    apples_defeated,
    deaths,
    longest_combo,
    teddy_found,
    updated_at
  )
  values (
    p_device_id,
    upper(left(coalesce(nullif(trim(p_player_name),''),'SPELER'),10)),
    greatest(coalesce(p_games_played,0),0),
    greatest(coalesce(p_best_score,0),0),
    greatest(coalesce(p_highest_level,1),1),
    greatest(coalesce(p_apples_defeated,0),0),
    greatest(coalesce(p_deaths,0),0),
    greatest(coalesce(p_longest_combo,0),0),
    coalesce(p_teddy_found,false),
    now()
  )
  on conflict (device_id) do update set
    player_name = excluded.player_name,
    games_played = greatest(public.player_stats.games_played,excluded.games_played),
    best_score = greatest(public.player_stats.best_score,excluded.best_score),
    highest_level = greatest(public.player_stats.highest_level,excluded.highest_level),
    apples_defeated = greatest(public.player_stats.apples_defeated,excluded.apples_defeated),
    deaths = greatest(public.player_stats.deaths,excluded.deaths),
    longest_combo = greatest(public.player_stats.longest_combo,excluded.longest_combo),
    teddy_found = public.player_stats.teddy_found or excluded.teddy_found,
    updated_at = now();
end;
$$;

create or replace function public.get_public_stats()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'totals',
    jsonb_build_object(
      'players', count(*),
      'games_played', coalesce(sum(games_played),0),
      'apples_defeated', coalesce(sum(apples_defeated),0),
      'deaths', coalesce(sum(deaths),0),
      'teddy_finders', count(*) filter (where teddy_found),
      'highest_level', coalesce(max(highest_level),1)
    ),
    'leaders',
    coalesce(
      (
        select jsonb_agg(to_jsonb(x))
        from (
          select player_name,best_score,highest_level
          from public.player_stats
          order by best_score desc,highest_level desc,updated_at asc
          limit 5
        ) x
      ),
      '[]'::jsonb
    )
  )
  from public.player_stats;
$$;

revoke all on function public.submit_player_stats(
  uuid,text,integer,integer,integer,integer,integer,integer,boolean
) from public;
revoke all on function public.get_public_stats() from public;

grant execute on function public.submit_player_stats(
  uuid,text,integer,integer,integer,integer,integer,integer,boolean
) to anon, authenticated;
grant execute on function public.get_public_stats() to anon, authenticated;

create index if not exists player_stats_best_score_idx
on public.player_stats (best_score desc);

create index if not exists player_stats_updated_idx
on public.player_stats (updated_at desc);
