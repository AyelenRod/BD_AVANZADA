
-- Tabla de clientes
CREATE TABLE IF NOT EXISTS clientes (
    id          SERIAL PRIMARY KEY,        
    nombre      VARCHAR(100) NOT NULL,     
    email       VARCHAR(100) UNIQUE NOT NULL, 
    password    VARCHAR(255) NOT NULL,     
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id          SERIAL PRIMARY KEY,        
    nombre      VARCHAR(100) NOT NULL,     
    precio      NUMERIC(10, 2) NOT NULL,   
    stock       INTEGER NOT NULL,          
    updated_at  TIMESTAMP,                 
    is_deleted  BOOLEAN DEFAULT FALSE     
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id          SERIAL PRIMARY KEY,        
    cliente_id  INTEGER NOT NULL,         
    total       NUMERIC(10, 2) NOT NULL,   
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Tabla de items de pedido
CREATE TABLE IF NOT EXISTS items_pedido (
    id          SERIAL PRIMARY KEY,        
    pedido_id   INTEGER NOT NULL,         
    producto_id INTEGER NOT NULL,         
    cantidad    INTEGER NOT NULL,          
    precio      NUMERIC(10, 2) NOT NULL,                       
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);



