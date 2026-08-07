-- DE STAMPERTJES v2.12.7 - EENVOUDIGE ADMIN PORTAL
-- Eenmalig uitvoeren in Supabase SQL Editor.

create table if not exists public.stampertjes_admin_settings (
  id integer primary key default 1 check (id=1),
  admin_code text not null
);

insert into public.stampertjes_admin_settings(id,admin_code)
values (1,'MijnStampertjes2026!')
on conflict (id) do update
set admin_code=excluded.admin_code;

alter table public.stampertjes_admin_settings enable row level security;
revoke all on public.stampertjes_admin_settings from anon, authenticated;

create or replace function public.verify_stampertjes_admin(
  p_admin_code text
)
returns boolean
language sql
stable
security definer
set search_path=public
as $$
  select coalesce(
    (
      select admin_code = coalesce(p_admin_code,'')
      from public.stampertjes_admin_settings
      where id=1
    ),
    false
  );
$$;

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
  affected integer;
begin
  if public.verify_stampertjes_admin(p_admin_code) is not true then
    return false;
  end if;

  delete from public.community_posts where id=p_post_id;
  get diagnostics affected=row_count;
  return affected=1;
end;
$$;

create or replace function public.admin_get_community_posts(
  p_admin_code text
)
returns table(
  id bigint,
  name text,
  type text,
  message text,
  likes integer,
  created_at timestamptz
)
language sql
stable
security definer
set search_path=public
as $$
  select p.id,p.name,p.type,p.message,p.likes,p.created_at
  from public.community_posts p
  where public.verify_stampertjes_admin(p_admin_code)
  order by p.created_at desc
  limit 200;
$$;

revoke all on function public.verify_stampertjes_admin(text) from public;
revoke all on function public.admin_delete_community_post(bigint,text) from public;
revoke all on function public.admin_get_community_posts(text) from public;

grant execute on function public.verify_stampertjes_admin(text) to anon, authenticated;
grant execute on function public.admin_delete_community_post(bigint,text) to anon, authenticated;
grant execute on function public.admin_get_community_posts(text) to anon, authenticated;

select public.verify_stampertjes_admin('MijnStampertjes2026!') as admin_code_ok;
