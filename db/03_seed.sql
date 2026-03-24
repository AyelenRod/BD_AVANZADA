-- Inserts válidos — precio y stock correctos, deben insertarse sin problema
INSERT INTO productos (nombre, precio, stock) VALUES ('Laptop',    1500.00, 10);
INSERT INTO productos (nombre, precio, stock) VALUES ('Mouse',       25.50, 50);
INSERT INTO productos (nombre, precio, stock) VALUES ('Teclado',     45.00, 30);
INSERT INTO productos (nombre, precio, stock) VALUES ('Monitor',    320.00, 15);
INSERT INTO productos (nombre, precio, stock) VALUES ('Audífonos',   80.00, 25);


-- =============================================================
-- CONSULTAS DE PRUEBA PARA VERIFICAR LOS TRIGGERS
-- (Descomenta y ejecuta manualmente en tu cliente SQL)
-- =============================================================

-- [Trigger 1] Debe lanzar error por precio negativo:
-- INSERT INTO productos (nombre, precio, stock) VALUES ('Webcam', -50, 10);

-- [Trigger 1] Debe lanzar error por stock negativo:
-- INSERT INTO productos (nombre, precio, stock) VALUES ('Webcam', 50, -1);

-- [Trigger 2 + 3] Cambiar precio → registra en audit_log y actualiza updated_at:
-- UPDATE productos SET precio = 1800.00 WHERE id = 1;
-- SELECT * FROM audit_log;
-- SELECT id, nombre, precio, updated_at FROM productos WHERE id = 1;

-- [Trigger 4] Soft delete → no borra físicamente, solo marca is_deleted = TRUE:
-- DELETE FROM productos WHERE id = 2;
-- SELECT id, nombre, is_deleted FROM productos WHERE id = 2;