
-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id          SERIAL PRIMARY KEY,        
    nombre      VARCHAR(100) NOT NULL,     
    precio      NUMERIC(10, 2) NOT NULL,   
    stock       INTEGER NOT NULL,          
    updated_at  TIMESTAMP,                 
    is_deleted  BOOLEAN DEFAULT FALSE     
);


-- Tabla para guardar el historial de cambios de precios
CREATE TABLE IF NOT EXISTS audit_log (
    id              SERIAL PRIMARY KEY,
    producto_id     INTEGER,               
    precio_anterior NUMERIC(10, 2),       
    precio_nuevo    NUMERIC(10, 2),        
    fecha_cambio    TIMESTAMP DEFAULT NOW()
);