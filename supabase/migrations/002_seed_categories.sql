insert into public.expense_categories
(name, icon, color)

values

('Food','Utensils','orange'),

('Transportation','Bus','blue'),

('Shopping','ShoppingBag','green'),

('Bills','Receipt','red'),

('Entertainment','Film','purple'),

('Health','HeartPulse','pink'),

('Gift','Gift','yellow'),

('Others','Circle','gray')

on conflict (name) do nothing;