-- =====================================================
-- FinTrack Initial Schema
-- Version: 1.0.0
-- Author: Joseph William C. Ramos
-- Project: FinTrack
-- =====================================================

create extension if not exists "pgcrypto";

-- =====================================================
-- ENUMS
-- =====================================================

create type attendance_status as enum (
    'Present',
    'Absent',
    'Leave',
    'Holiday',
    'Rest Day',
    'Half Day'
);

-- =====================================================
-- PROFILES
-- =====================================================

create table if not exists public.profiles (

    id uuid primary key
        references auth.users(id)
        on delete cascade,

    full_name text not null,

    avatar_url text,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);

comment on table public.profiles is
'Stores additional user profile information.';

-- =====================================================
-- PAYROLL SETTINGS
-- =====================================================

create table if not exists public.payroll_settings (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references public.profiles(id)
        on delete cascade,

    monthly_salary numeric(10,2)
        not null
        default 30000
        check (monthly_salary >= 0),

    daily_budget numeric(10,2)
        not null
        default 350
        check (daily_budget >= 0),

    parent_allowance numeric(10,2)
        not null
        default 0
        check (parent_allowance >= 0),

    cutoff_day_1 smallint
        not null
        default 18
        check (cutoff_day_1 between 1 and 31),

    cutoff_day_2 smallint
        not null
        default 3
        check (cutoff_day_2 between 1 and 31),

    payday_1 smallint
        not null
        default 15
        check (payday_1 between 1 and 31),

    payday_2 smallint
        not null
        default 30
        check (payday_2 between 1 and 31),

    work_days_per_week smallint
        not null
        default 5
        check (work_days_per_week between 1 and 7),

    work_hours_per_day numeric(4,2)
        not null
        default 8
        check (work_hours_per_day > 0),

    employment_type text
        not null
        default 'Regular',

    created_at timestamptz
        not null
        default now(),

    updated_at timestamptz
        not null
        default now(),

    constraint payroll_settings_user_unique
        unique(user_id)

);

comment on table public.payroll_settings is
'Stores payroll configuration and salary settings for each user.';

-- =====================================================
-- ATTENDANCE
-- =====================================================

create table if not exists public.attendance (

    id uuid primary key default gen_random_uuid(),

    user_id uuid
        not null
        references public.profiles(id)
        on delete cascade,

    attendance_date date
        not null,

    status attendance_status
        not null,

    hours_worked numeric(4,2)
        not null
        default 8
        check (hours_worked >= 0),

    overtime_hours numeric(4,2)
        not null
        default 0
        check (overtime_hours >= 0),

    remarks text,

    created_at timestamptz
        not null
        default now(),

    updated_at timestamptz
        not null
        default now(),

    constraint attendance_unique_day
        unique(user_id, attendance_date)

);

comment on table public.attendance is
'Stores daily attendance records used for payroll forecasting.';

-- =====================================================
-- EXPENSE CATEGORIES
-- =====================================================

create table if not exists public.expense_categories (

    id uuid primary key default gen_random_uuid(),

    name text not null unique,

    icon text,

    color text,

    created_at timestamptz
        not null
        default now()

);

comment on table public.expense_categories is
'Stores available expense categories.';

-- =====================================================
-- EXPENSES
-- =====================================================

create table if not exists public.expenses (

    id uuid primary key default gen_random_uuid(),

    user_id uuid
        not null
        references public.profiles(id)
        on delete cascade,

    category_id uuid
        references public.expense_categories(id)
        on delete set null,

    expense_date date
        not null,

    description text,

    amount numeric(10,2)
        not null
        check (amount > 0),

    is_workday boolean
        not null
        default true,

    created_at timestamptz
        not null
        default now(),

    updated_at timestamptz
        not null
        default now()

);

comment on table public.expenses is
'Stores all expense transactions.';

-- =====================================================
-- WISHLIST
-- =====================================================

create table if not exists public.wishlist (

    id uuid primary key default gen_random_uuid(),

    user_id uuid
        not null
        references public.profiles(id)
        on delete cascade,

    item_name text
        not null,

    target_amount numeric(10,2)
        not null
        check (target_amount > 0),

    saved_amount numeric(10,2)
        not null
        default 0
        check (saved_amount >= 0),

    priority text
        not null
        default 'Medium'
        check (
            priority in (
                'Low',
                'Medium',
                'High'
            )
        ),

    target_date date,

    is_completed boolean
        not null
        default false,

    created_at timestamptz
        not null
        default now(),

    updated_at timestamptz
        not null
        default now()

);

comment on table public.wishlist is
'Stores savings goals and wishlist items.';