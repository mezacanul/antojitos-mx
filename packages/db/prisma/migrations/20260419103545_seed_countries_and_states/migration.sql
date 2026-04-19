-- Seed Countries
INSERT INTO "Country" (id, code, name, "phoneCode") VALUES (gen_random_uuid(), 'MX', 'Mexico', '52') ON CONFLICT (code) DO NOTHING;
INSERT INTO "Country" (id, code, name, "phoneCode") VALUES (gen_random_uuid(), 'CA', 'Canada', '1') ON CONFLICT (code) DO NOTHING;
INSERT INTO "Country" (id, code, name, "phoneCode") VALUES (gen_random_uuid(), 'US', 'United States', '1') ON CONFLICT (code) DO NOTHING;

-- Seed Mexico States
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'AGU', 'Aguascalientes', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'BCN', 'Baja California', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'BCS', 'Baja California Sur', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'CAM', 'Campeche', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'COA', 'Coahuila', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'COL', 'Colima', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'CHP', 'Chiapas', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'CHH', 'Chihuahua', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'CMX', 'Ciudad de México', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'DUR', 'Durango', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'GUA', 'Guanajuato', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'GRO', 'Guerrero', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'HID', 'Hidalgo', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'JAL', 'Jalisco', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'MEX', 'Estado de México', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'MIC', 'Michoacán', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'MOR', 'Morelos', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'NAY', 'Nayarit', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'NLE', 'Nuevo León', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'OAX', 'Oaxaca', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'PUE', 'Puebla', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'QUE', 'Querétaro', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'ROO', 'Quintana Roo', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'SLP', 'San Luis Potosí', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'SIN', 'Sinaloa', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'SON', 'Sonora', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'TAB', 'Tabasco', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'TAM', 'Tamaulipas', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'TLA', 'Tlaxcala', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'VER', 'Veracruz', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'YUC', 'Yucatán', 'MX');
INSERT INTO "State" (id, code, name, "countryCode") VALUES (gen_random_uuid(), 'ZAC', 'Zacatecas', 'MX');
