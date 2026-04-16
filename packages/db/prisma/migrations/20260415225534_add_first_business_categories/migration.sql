-- This is an empty migration.
INSERT INTO "BusinessCategory" ("id", "name", "description")
VALUES
  (gen_random_uuid(), 'Taquería', 'Especializada en tacos de diversos estilos como al pastor, carnitas, barbacoa, suadero y más. El corazón de la comida callejera mexicana.'),
  
  (gen_random_uuid(), 'Postres', 'Postres y dulces tradicionales mexicanos como churros, flan, tres leches, buñuelos, arroz con leche y nieves.'),
  
  (gen_random_uuid(), 'Mariscos y Pescados', 'Restaurantes especializados en mariscos y pescados frescos: aguachile, ceviche, cóctel de camarón, filetes y platillos del mar.'),
  
  (gen_random_uuid(), 'Carnitas', 'Especialidad en carnitas de cerdo cocidas lentamente, servidas en tacos, platos o con guarniciones tradicionales.'),
  
  (gen_random_uuid(), 'Barbacoa', 'Barbacoa de borrego, res o cabrito cocida en pozo o al vapor, acompañada de consomé y tortillas.'),
  
  (gen_random_uuid(), 'Birria', 'Especialidad en birria de chivo, res o cordero. Incluye tacos de birria, quesabirria y consomé.'),
  
  (gen_random_uuid(), 'Antojitos Mexicanos', 'Antojitos típicos como sopes, gorditas, tlacoyos, quesadillas, huaraches y chalupas.'),
  
  (gen_random_uuid(), 'Tortas y Sandwiches', 'Tortas mexicanas grandes y llenas de sabor: torta cubana, ahogada, de milanesa, pierna y más.'),
  
  (gen_random_uuid(), 'Carnes Asadas / Parrilla', 'Carnes a la parrilla como arrachera, cecina, carne asada, cabrito y cortes norteños.'),
  
  (gen_random_uuid(), 'Moles y Platillos Tradicionales', 'Especialidad en moles (poblano, verde, negro, coloradito) y platillos clásicos mexicanos.'),
  
  (gen_random_uuid(), 'Enchiladas y Chilaquiles', 'Enchiladas de diversos estilos y chilaquiles rojos o verdes, un desayuno mexicano muy popular.'),
  
  (gen_random_uuid(), 'Pozolería', 'Especializada en pozole rojo, verde o blanco, con maíz cacahuazintle y carne de cerdo o pollo.'),
  
  (gen_random_uuid(), 'Botanas y Cervecería', 'Botanas, antojitos para compartir y amplia selección de cervezas mexicanas y artesanales.'),
  
  (gen_random_uuid(), 'Cocina Yucateca / Regional', 'Platillos de la cocina yucateca y otras regiones: cochinita pibil, panuchos, salbutes y especialidades regionales.')
ON CONFLICT ("name") DO NOTHING;  -- Evita duplicados si la categoría ya existe