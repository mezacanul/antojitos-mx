-- Seed Latin American Countries
INSERT INTO "Country" (id, code, name, "phoneCode") VALUES
(gen_random_uuid(), 'AR', 'Argentina', '54'),
(gen_random_uuid(), 'BO', 'Bolivia', '591'),
(gen_random_uuid(), 'BR', 'Brazil', '55'),
(gen_random_uuid(), 'CL', 'Chile', '56'),
(gen_random_uuid(), 'CO', 'Colombia', '57'),
(gen_random_uuid(), 'CR', 'Costa Rica', '506'),
(gen_random_uuid(), 'CU', 'Cuba', '53'),
(gen_random_uuid(), 'DO', 'Dominican Republic', '1'),
(gen_random_uuid(), 'EC', 'Ecuador', '593'),
(gen_random_uuid(), 'SV', 'El Salvador', '503'),
(gen_random_uuid(), 'GT', 'Guatemala', '502'),
(gen_random_uuid(), 'HN', 'Honduras', '504'),
(gen_random_uuid(), 'NI', 'Nicaragua', '505'),
(gen_random_uuid(), 'PA', 'Panama', '507'),
(gen_random_uuid(), 'PY', 'Paraguay', '595'),
(gen_random_uuid(), 'PE', 'Peru', '51'),
(gen_random_uuid(), 'PR', 'Puerto Rico', '1'),
(gen_random_uuid(), 'UY', 'Uruguay', '598'),
(gen_random_uuid(), 'VE', 'Venezuela', '58')
ON CONFLICT (code) DO NOTHING;