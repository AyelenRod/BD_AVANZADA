-- db/seed.sql

-- Insertar Clientes
INSERT INTO customers (name, email, country) VALUES
('Juan Pérez', 'juan@test.com', 'Mexico'),
('Maria Garcia', 'maria@test.com', 'Spain'),
('John Doe', 'john@test.com', 'USA'),
('Ana Lopez', 'ana@test.com', 'Mexico'),
('Carlos Ruiz', 'carlos@test.com', 'Argentina');

-- Insertar Productos
INSERT INTO products (name, category, price, stock) VALUES
('Laptop Gamer', 'Electronica', 1200.00, 5),
('Mouse Inalámbrico', 'Electronica', 25.50, 100),
('Teclado Mecánico', 'Electronica', 80.00, 0), 
('Silla Ergonómica', 'Muebles', 300.00, 15),
('Escritorio de Pie', 'Muebles', 450.00, 8),
('Café Premium', 'Alimentos', 15.00, 50);

-- Insertar Órdenes
INSERT INTO orders (customer_id, status, order_date) VALUES
(1, 'completed', '2023-10-01 10:00:00'),
(2, 'completed', '2023-10-02 11:30:00'),
(1, 'completed', '2023-10-05 14:00:00'),
(3, 'cancelled', '2023-11-01 09:00:00'), 
(4, 'completed', '2023-11-10 16:20:00'),
(5, 'pending',   '2023-12-01 10:00:00');

-- Insertar Items de las Órdenes
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 1200.00), 
(1, 2, 2, 25.50),  
(2, 4, 1, 300.00),  
(3, 6, 10, 15.00),  
(4, 1, 1, 1200.00), 
(5, 2, 1, 25.50),
(5, 3, 1, 80.00),
(6, 5, 1, 450.00);