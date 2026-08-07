-- DE STAMPERTJES v2.12.6 - ADMIN VERIFICATIE FIX
-- Voer dit één keer uit in Supabase SQL Editor.
-- Dit gebruikt dezelfde beheercode/hash die je al bij v2.12.4 hebt ingesteld.

create extension if not exists pgcrypto;

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
      select admin_code_hash =
             encode(digest(coalesce(p_admin_code,''),'sha256'),'hex')
      from public.stampertjes_admin_settings
      where id=1
    ),
    false
  );
$$;

revoke all on function public.verify_stampertjes_admin(text) from public;
grant execute on function public.verify_stampertjes_admin(text) to anon, authenticated;

-- Admin-deletefunctie opnieuw vastleggen.
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
  select public.verify_stampertjes_admin(p_admin_code)
  into valid;

  if coalesce(valid,false) is not true then
    return false;
  end if;

  delete from public.community_posts
  where id=p_post_id;

  get diagnostics affected = row_count;
  return affected=1;
end;
$$;

revoke all on function public.admin_delete_community_post(bigint,text) from public;
grant execute on function public.admin_delete_community_post(bigint,text) to anon, authenticated;
