
-- Create a table for cars
create table public.cars (
  id bigint primary key generated always as identity,
  brand text,
  type text,
  picture_url text,
  status int not null default 1
);



-- Set up Row Level Security (RLS) for cars
alter table public.cars
  enable row level security;

-- Create function to check if user is a admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from profiles where id = auth.uid() and is_admin = true
  );
end;
$$ language plpgsql security definer;

-- Set RLS policy to allow users to see the cars
create policy "All Users can see all cars." on public.cars
  for select using (true);

-- Set RLS policy to allow admins to manage their own cars
create policy "Admins can manage their own cars." on public.cars
  for all using (public.is_admin());



-- Set up Storage!
insert into storage.buckets (id, name)
  values ('cars', 'cars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Car pictures are publicly accessible." on storage.objects
  for select using (bucket_id = 'cars');

create policy "Admins only can modify the car pictures" on storage.objects
  for all using (public.is_admin() and bucket_id = 'cars');
