# Here I will present the Models for this Project

## Profile

```ts
export interface Profile {
  id: string;
  updated_at: string;
  username: string;
  full_name: string;
  avatar_url: string;
  isAdmin: boolean;
  status: number;
}
```

```sql
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  is_admin boolean not null default false,
  status int not null default 1,

  constraint username_length check (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

```

---------------------

## Cars

```ts
export interface Car {
  id: number;
  brand: string;
  type: string;
  pictureUrl: string;
  status: number;
}
```

```sql
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
```
