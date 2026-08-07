-- DE STAMPERTJES v2.12.4 - CAFÉ MODERATION
-- Voer dit één keer uit in Supabase: SQL Editor > New query > Run.
--
-- BELANGRIJK:
-- Vervang hieronder CHANGE_ME_GJ_ADMIN_CODE door een eigen sterke beheercode.
-- Deze code komt NIET in index.html te staan.

create extension if not exists pgcrypto;

alter table public.community_posts
  add column if not exists device_id uuid;

-- Oude berichten mogen device_id null houden.
create index if not exists community_posts_device_idx
on public.community_posts(device_id);

-- Geheime beheerinstelling in de database.
create table if not exists public.stampertjes_admin_settings (
  id integer primary key default 1 check (id = 1),
  admin_code_hash text not null
);

insert into public.stampertjes_admin_settings(id,admin_code_hash)
values (
  1,
  encode(digest('CHANGE_ME_GJ_ADMIN_CODE','sha256'),'hex')
)
on conflict (id) do update
set admin_code_hash=excluded.admin_code_hash;

alter table public.stampertjes_admin_settings enable row level security;
revoke all on public.stampertjes_admin_settings from anon, authenticated;

-- Verwijder oude publieke directe tabelrechten.
revoke insert, update, delete on public.community_posts from anon, authenticated;
grant select on public.community_posts to anon, authenticated;

-- Nieuwe berichten veilig via RPC.
create or replace function public.create_community_post(
  p_device_id uuid,
  p_player_name text,
  p_type text,
  p_message text
)
returns void
language plpgsql
security definer
set search_path=public
as $$
begin
  if p_device_id is null then
    raise exception 'device_id required';
  end if;

  if p_type not in ('Algemeen','Idee','Bug','Highscore') then
    raise exception 'invalid type';
  end if;

  insert into public.community_posts(name,type,message,likes,device_id)
  values (
    upper(left(coalesce(nullif(trim(p_player_name),''),'SPELER'),10)),
    p_type,
    left(trim(p_message),240),
    0,
    p_device_id
  );
end;
$$;

-- Alleen eigen bericht bewerken.
create or replace function public.update_own_community_post(
  p_post_id bigint,
  p_device_id uuid,
  p_player_name text,
  p_type text,
  p_message text
)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare
  affected integer;
begin
  if p_type not in ('Algemeen','Idee','Bug','Highscore') then
    return false;
  end if;

  update public.community_posts
  set name=upper(left(coalesce(nullif(trim(p_player_name),''),'SPELER'),10)),
      type=p_type,
      message=left(trim(p_message),240)
  where id=p_post_id
    and device_id=p_device_id;

  get diagnostics affected = row_count;
  return affected=1;
end;
$$;

-- Alleen eigen bericht verwijderen.
create or replace function public.delete_own_community_post(
  p_post_id bigint,
  p_device_id uuid
)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare
  affected integer;
begin
  delete from public.community_posts
  where id=p_post_id
    and device_id=p_device_id;

  get diagnostics affected = row_count;
  return affected=1;
end;
$$;

-- Admin mag elk bericht verwijderen als de code klopt.
create or replace function public.admin_delete_community_post(
  p_post_id bigint,
  p_admin_code text
)
returns boolean
language plpgsql
security definer
set search_path=public
as $$
declare
  valid boolean;
  affected integer;
begin
  select admin_code_hash =
         encode(digest(coalesce(p_admin_code,''),'sha256'),'hex')
  into valid
  from public.stampertjes_admin_settings
  where id=1;

  if coalesce(valid,false) is not true then
    return false;
  end if;

  delete from public.community_posts where id=p_post_id;
  get diagnostics affected = row_count;
  return affected=1;
end;
$$;

-- Publieke posts lezen, maar alleen "is_own" teruggeven; device_id zelf blijft verborgen.
create or replace function public.get_community_posts(
  p_device_id uuid
)
returns table(
  id bigint,
  name text,
  type text,
  message text,
  likes integer,
  created_at timestamptz,
  is_own boolean
)
language sql
stable
security definer
set search_path=public
as $$
  select
    p.id,
    p.name,
    p.type,
    p.message,
    p.likes,
    p.created_at,
    (p.device_id is not null and p.device_id=p_device_id) as is_own
  from public.community_posts p
  order by p.created_at desc
  limit 100;
$$;

-- Likes via RPC.
create or replace function public.like_community_post(
  p_post_id bigint
)
returns void
language sql
security definer
set search_path=public
as $$
  update public.community_posts
  set likes=least(likes+1,999999)
  where id=p_post_id;
$$;

revoke all on function public.create_community_post(uuid,text,text,text) from public;
revoke all on function public.update_own_community_post(bigint,uuid,text,text,text) from public;
revoke all on function public.delete_own_community_post(bigint,uuid) from public;
revoke all on function public.admin_delete_community_post(bigint,text) from public;
revoke all on function public.get_community_posts(uuid) from public;
revoke all on function public.like_community_post(bigint) from public;

grant execute on function public.create_community_post(uuid,text,text,text) to anon, authenticated;
grant execute on function public.update_own_community_post(bigint,uuid,text,text,text) to anon, authenticated;
grant execute on function public.delete_own_community_post(bigint,uuid) to anon, authenticated;
grant execute on function public.admin_delete_community_post(bigint,text) to anon, authenticated;
grant execute on function public.get_community_posts(uuid) to anon, authenticated;
grant execute on function public.like_community_post(bigint) to anon, authenticated;
