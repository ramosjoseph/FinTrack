-- =====================================================
-- FinTrack Financial Tables
-- =====================================================

--------------------------------------------------------
-- EXPENSES
--------------------------------------------------------

create table if not exists public.expenses (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references public.profiles(id)
        on delete cascade,

    category_id uuid
        references public.expense_categories(id)
        on delete set null,

    expense_name text not null,

    amount numeric(10,2) not null,

    expense_date date not null,

    notes text,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

--------------------------------------------------------
-- GOVERNMENT DEDUCTIONS
--------------------------------------------------------

create table if not exists public.government_deductions (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references public.profiles(id)
        on delete cascade,

    sss numeric(10,2) default 0,

    philhealth numeric(10,2) default 0,

    pagibig numeric(10,2) default 0,

    withholding_tax numeric(10,2) default 0,

    effective_date date not null,

    created_at timestamptz default now()

);

--------------------------------------------------------
-- SAVINGS GOALS
--------------------------------------------------------

create table if not exists public.savings_goals (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references public.profiles(id)
        on delete cascade,

    goal_name text not null,

    target_amount numeric(10,2) not null,

    current_amount numeric(10,2) default 0,

    monthly_contribution numeric(10,2) default 0,

    deadline date,

    completed boolean default false,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

--------------------------------------------------------
-- WISHLIST
--------------------------------------------------------

create table if not exists public.wishlist (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references public.profiles(id)
        on delete cascade,

    item_name text not null,

    estimated_price numeric(10,2) not null,

    priority text default 'Medium',

    escrow_enabled boolean default true,

    target_date date,

    purchased boolean default false,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

--------------------------------------------------------
-- PAYROLL FORECASTS
--------------------------------------------------------

create table if not exists public.payroll_forecasts (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references public.profiles(id)
        on delete cascade,

    payroll_start date not null,

    payroll_end date not null,

    expected_gross numeric(10,2),

    expected_deductions numeric(10,2),

    expected_net numeric(10,2),

    absent_days integer default 0,

    generated_at timestamptz default now()

);

--------------------------------------------------------
-- TRANSACTIONS
--------------------------------------------------------

create table if not exists public.transactions (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null
        references public.profiles(id)
        on delete cascade,

    transaction_type text not null,

    amount numeric(10,2) not null,

    description text,

    transaction_date date not null,

    reference_id uuid,

    created_at timestamptz default now()

);