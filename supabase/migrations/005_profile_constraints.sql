alter table public.profiles
add constraint profiles_full_name_not_empty
check (length(trim(full_name)) > 0);