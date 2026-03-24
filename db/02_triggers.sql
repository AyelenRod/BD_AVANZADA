-- TRIGGER 1: BEFORE INSERT - No permitir precio negativo ni stock < 0

CREATE OR REPLACE FUNCTION fn_validar_insert()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.precio < 0 THEN
        RAISE EXCEPTION 'El precio no puede ser negativo. Valor recibido: %', NEW.precio;
    END IF;

    IF NEW.stock < 0 THEN
        RAISE EXCEPTION 'El stock no puede ser menor a 0. Valor recibido: %', NEW.stock;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_validar_insert
    BEFORE INSERT       
    ON productos        
    FOR EACH ROW        
    EXECUTE FUNCTION fn_validar_insert();


-- TRIGGER 2: AFTER UPDATE - Objetivo: Registrar cambios de precio en audit_log

CREATE OR REPLACE FUNCTION fn_audit_precio()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.precio <> NEW.precio THEN
        INSERT INTO audit_log (producto_id, precio_anterior, precio_nuevo)
        VALUES (NEW.id, OLD.precio, NEW.precio);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_audit_precio
    AFTER UPDATE      
    ON productos
    FOR EACH ROW
    EXECUTE FUNCTION fn_audit_precio();

-- TRIGGER 3: BEFORE UPDATE - Objetivo: Auto-actualizar updated_at en cada modificación

CREATE OR REPLACE FUNCTION fn_actualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_actualizar_timestamp
    BEFORE UPDATE      
    ON productos
    FOR EACH ROW
    EXECUTE FUNCTION fn_actualizar_timestamp();

-- TRIGGER 4: BEFORE DELETE - Objetivo: Soft-delete (marcar is_deleted en vez de borrar)

CREATE OR REPLACE FUNCTION fn_soft_delete()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE productos
    SET is_deleted = TRUE
    WHERE id = OLD.id;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_soft_delete
    BEFORE DELETE      
    ON productos
    FOR EACH ROW
    EXECUTE FUNCTION fn_soft_delete();