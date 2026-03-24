
-- ============================================================
-- ACTIVIDAD D: El Procedure Que Falla
-- Base de Datos Avanzadas · UP Chiapas
-- Mtro. Ramsés Alejandro Camas Nájera
-- ============================================================
-- Este código COMPILA y EJECUTA sin errores de sintaxis.
-- Contiene 5 bugs LÓGICOS que debes encontrar.
-- ============================================================

DROP TABLE IF EXISTS inscripciones CASCADE;
DROP TABLE IF EXISTS prerrequisitos CASCADE;
DROP TABLE IF EXISTS cursos CASCADE;
DROP TABLE IF EXISTS alumnos CASCADE;
DROP TABLE IF EXISTS log_inscripciones CASCADE;

-- ==================== TABLAS ====================

CREATE TABLE alumnos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    semestre INT NOT NULL CHECK (semestre BETWEEN 1 AND 12),
    activo BOOLEAN DEFAULT true
);

CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    clave VARCHAR(10) UNIQUE NOT NULL,
    cupo_maximo INT NOT NULL CHECK (cupo_maximo > 0),
    cupo_disponible INT NOT NULL CHECK (cupo_disponible >= 0),
    semestre_minimo INT DEFAULT 1,
    activo BOOLEAN DEFAULT true
);

-- Tabla de prerrequisitos: para inscribirse a un curso,
-- el alumno debe haber aprobado los cursos listados aquí.
-- Si un curso NO tiene prerrequisitos, NO aparece en esta tabla.
CREATE TABLE prerrequisitos (
    id SERIAL PRIMARY KEY,
    curso_id INT NOT NULL REFERENCES cursos(id),
    prerrequisito_id INT REFERENCES cursos(id)
);

CREATE TABLE inscripciones (
    id SERIAL PRIMARY KEY,
    alumno_id INT NOT NULL REFERENCES alumnos(id),
    curso_id INT NOT NULL REFERENCES cursos(id),
    fecha TIMESTAMP DEFAULT now(),
    estado VARCHAR(20) DEFAULT 'ACTIVA',
    UNIQUE(alumno_id, curso_id)
);

CREATE TABLE log_inscripciones (
    id SERIAL PRIMARY KEY,
    alumno_id INT,
    curso_id INT,
    accion VARCHAR(50),
    detalle TEXT,
    fecha TIMESTAMP DEFAULT now()
);

-- ==================== DATOS DE PRUEBA ====================

INSERT INTO alumnos (nombre, matricula, semestre) VALUES
('Ana García', '2024001', 5),
('Carlos Mendoza', '2024002', 3),
('Diana Torres', '2024003', 7),
('Eduardo Ramírez', '2024004', 2),
('Fernanda López', '2024005', 6);

INSERT INTO cursos (nombre, clave, cupo_maximo, cupo_disponible, semestre_minimo) VALUES
('Base de Datos Avanzadas', 'BDA-501', 30, 5, 5),
('Programación Web', 'PW-301', 35, 10, 3),
('Inteligencia Artificial', 'IA-601', 25, 2, 6),
('Estructuras de Datos', 'ED-201', 40, 15, 2),
('Redes de Computadoras', 'RC-401', 30, 8, 4);

-- Prerrequisitos:
-- BDA-501 requiere ED-201
-- IA-601 requiere BDA-501
-- RC-401 requiere PW-301
-- PW-301 y ED-201 NO tienen prerrequisitos (no aparecen aquí)
INSERT INTO prerrequisitos (curso_id, prerrequisito_id) VALUES
(1, 4),   -- BDA requiere Estructuras de Datos
(3, 1),   -- IA requiere BDA
(5, 2);   -- Redes requiere Prog Web

-- Inscripciones previas aprobadas (para validar prerrequisitos)
INSERT INTO inscripciones (alumno_id, curso_id, estado) VALUES
(1, 4, 'APROBADA'),   -- Ana aprobó Estructuras de Datos
(1, 2, 'APROBADA'),   -- Ana aprobó Prog Web
(3, 4, 'APROBADA'),   -- Diana aprobó Estructuras de Datos
(3, 1, 'APROBADA');   -- Diana aprobó BDA

-- ==================== TRIGGER (con bug) ====================

CREATE OR REPLACE FUNCTION fn_log_inscripcion()
RETURNS TRIGGER AS $$
BEGIN
    -- Registrar en el log
    INSERT INTO log_inscripciones (alumno_id, curso_id, accion, detalle)
    VALUES (NEW.alumno_id, NEW.curso_id, 'INSCRIPCION',
            'Alumno inscrito al curso');

    -- Descontar cupo disponible
    UPDATE cursos SET cupo_disponible = cupo_disponible - 1
    WHERE id = NEW.curso_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_log_inscripcion
AFTER INSERT ON inscripciones
FOR EACH ROW
EXECUTE FUNCTION fn_log_inscripcion();

-- ==================== STORED PROCEDURE (con bugs) ====================

CREATE OR REPLACE PROCEDURE sp_inscribir_alumnos(
    IN p_curso_id INT,
    IN p_alumno_ids INT[],
    OUT p_inscritos INT
)
LANGUAGE plpgsql AS $$
DECLARE
    v_alumno_id INT;
    v_alumno RECORD;
    v_curso RECORD;
    v_cupo INT;
    v_cumple_prereq BOOLEAN;
BEGIN
    -- Obtener información del curso
    SELECT * INTO v_curso FROM cursos WHERE id = p_curso_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Curso con id % no existe', p_curso_id;
    END IF;

    IF v_curso.activo = false THEN
        RAISE EXCEPTION 'Curso % no está activo', v_curso.nombre;
    END IF;

    -- Iterar sobre cada alumno
    FOREACH v_alumno_id IN ARRAY p_alumno_ids
    LOOP
        -- Obtener datos del alumno (BUG 1: FOR UPDATE en tabla equivocada)
        SELECT * INTO v_alumno FROM alumnos
        WHERE id = v_alumno_id FOR UPDATE;

        IF NOT FOUND THEN
            RAISE NOTICE 'Alumno % no encontrado, saltando...', v_alumno_id;
            CONTINUE;
        END IF;

        -- Verificar semestre mínimo
        IF v_alumno.semestre < v_curso.semestre_minimo THEN
            RAISE NOTICE 'Alumno % no cumple semestre mínimo', v_alumno.nombre;
            CONTINUE;
        END IF;

        -- Verificar cupo disponible
        SELECT cupo_disponible INTO v_cupo FROM cursos WHERE id = p_curso_id;
        IF v_cupo <= 0 THEN
            RAISE NOTICE 'Sin cupo para %', v_alumno.nombre;
            CONTINUE;
        END IF;

        -- Verificar prerrequisitos (BUG 5: falla con NULL)
        SELECT NOT EXISTS (
            SELECT 1 FROM prerrequisitos p
            WHERE p.curso_id = p_curso_id
              AND p.prerrequisito_id NOT IN (
                  SELECT curso_id FROM inscripciones
                  WHERE alumno_id = v_alumno_id
                    AND estado = 'APROBADA'
              )
        ) INTO v_cumple_prereq;

        IF NOT v_cumple_prereq THEN
            RAISE NOTICE 'Alumno % no cumple prerrequisitos', v_alumno.nombre;
            CONTINUE;
        END IF;

        -- Verificar que no esté ya inscrito
        IF EXISTS (SELECT 1 FROM inscripciones
                   WHERE alumno_id = v_alumno_id AND curso_id = p_curso_id
                     AND estado = 'ACTIVA') THEN
            RAISE NOTICE 'Alumno % ya inscrito', v_alumno.nombre;
            CONTINUE;
        END IF;

        -- Inscribir al alumno
        INSERT INTO inscripciones (alumno_id, curso_id, estado)
        VALUES (v_alumno_id, p_curso_id, 'ACTIVA');

        -- Descontar cupo (BUG 3: el trigger TAMBIÉN descuenta)
        UPDATE cursos SET cupo_disponible = cupo_disponible - 1
        WHERE id = p_curso_id;

        -- (BUG 2: COMMIT sin EXCEPTION block)
        COMMIT;

        RAISE NOTICE 'Alumno % inscrito exitosamente', v_alumno.nombre;

    END LOOP;

    -- (BUG 4: p_inscritos nunca se asigna, siempre retorna NULL)

END;
$$;

-- ==================== VERIFICACIÓN ====================
DO $$
BEGIN
    RAISE NOTICE '=== Código Actividad D cargado correctamente ===';
    RAISE NOTICE 'Alumnos: %', (SELECT COUNT(*) FROM alumnos);
    RAISE NOTICE 'Cursos: %', (SELECT COUNT(*) FROM cursos);
    RAISE NOTICE 'Prerrequisitos definidos: %', (SELECT COUNT(*) FROM prerrequisitos);
    RAISE NOTICE 'Inscripciones previas: %', (SELECT COUNT(*) FROM inscripciones);
    RAISE NOTICE 'Cupo disponible BDA-501: %', (SELECT cupo_disponible FROM cursos WHERE clave = 'BDA-501');
    RAISE NOTICE '';
    RAISE NOTICE 'Prueba sugerida:';
    RAISE NOTICE '  CALL sp_inscribir_alumnos(1, ARRAY[1,2,3,4,5], NULL);';
    RAISE NOTICE '  -- Luego verificar: SELECT * FROM cursos; SELECT * FROM inscripciones;';
END $$;

-- ==================== ANALISIS ====================

/* 
Bug 1 Concurrenccia y bloque de filas:
    Se hacia un FOR UPDATE en la tabla alumnos. Como no se bloqueaba la tabla cursos
    se podianrealizar mismo tiempo el inscribir alumnos desde dos transacciones distintas.

    Impacto: El administrador podria visualizar cursos con mas cupos disponibles de
    las que realmente se necesitan para un aula.

    Solucion: Bloquear el curso para asegurar que nadie más modifique el cupo simultáneamente
    SELECT cupo_disponible INTO v_cupo FROM cursos WHERE id = p_curso_id FOR UPDATE;

Bug 2 COMMIT dentro del loop:
   El commit dentro del bucle foreach es incorrecto ya que se rompe la atomocidad 
   que este debe llevar ya que no habria un todo o nada. Si el proceso falla en el n numero de una lista
   solo se habran guardado los anteriores y no se podra revertir.

   Impacto: Si el proceso llegara a fallar al no poder hacer rollback de forma facil deja la
   BD en un estado inconsciente.

   Solucion: lo mas ideal seria mover el commit fuera del bucle foreach.
     INSERT INTO inscripciones (alumno_id, curso_id, estado)
        VALUES (v_alumno_id, p_curso_id, 'ACTIVA');
        p_inscritos := p_inscritos + 1; 
        RAISE NOTICE 'Alumno % inscrito exitosamente', v_alumno.nombre;
    END LOOP;
    COMMIT;

Bug 3 El trigger descuenta:
    El trigger al ejecutarse como AFTER INSERT se descontaba automaticamente un 1
    pero al pasar por el UPDATE establecido se le volvia a restar un 1.

    Impacto: Por cada alumno que se tiene practicamente se le restaba dos cupos
    generando que se vean mas cupos llenos de lo que realmente se tiene.

    Solucion: Podria quitarse el UPDATE y que directamente el trigger se encargue de hacer
    el descuento.
    UPDATE cursos SET cupo_disponible = cupo_disponible - 1 WHERE id = p_curso_id; 

Bug 4 Parametro de salida:
    El parametro de salida p_inscritos nunca se asigna, siempre retorna null.

    Impacto: Se podria recibir el valor nulo lo cual daria la impresion de que el proceso fallo 
    cuando en realidad no lo hizo.

    Solucion: Inicializar un contador e irle sumando con cada inscripcion exitosa.
    BEGIN
    p_inscritos := 0; 
    -- ... 
        INSERT INTO inscripciones (alumno_id, curso_id, estado)
        VALUES (v_alumno_id, p_curso_id, 'ACTIVA');
        
        p_inscritos := p_inscritos + 1; 
    

Bug 5 Manejo de NULL:
    El hecho de tener un NOT IN en lugar de un null hace que el resultado sea desconocido
    cosa que puede hacer que no se filtre correctamente.

    Impacto: El no tener un null haria que los alumnos podrian inscribirse a materias
    a las cuales aun no estan listos por no haber cursado las materiaas necesarias para estas nuevas.

    Solucion: Cambiar el NOT IN por un NOT EXISTS.
    SELECT NOT EXISTS (
    SELECT 1 FROM prerrequisitos p
    WHERE p.curso_id = p_curso_id
      AND NOT EXISTS (
          SELECT 1 FROM inscripciones i
          WHERE i.alumno_id = v_alumno_id
            AND i.curso_id = p.prerrequisito_id
            AND i.estado = 'APROBADA'
      )
) INTO v_cumple_prereq;

*/

-- ==================== PRIORIZACION ====================

/*
Primeramente priorizaria el bug 1 (concurrencia) ya que en un entorno escolar donde se intentan inscribir 
muchos estudiantes al mismo tiempo se crearia un problema administrativo ya que habrian mas cupos de los que realmente se tienen.

Tambien priorizaria el Bug 2 (commit en loop) es fundamental para asegurar que si algo 
falla durante la inscripción el sistema no quede en un estado inconsistente.

Y por ultimo el seria el bug 3 (doble descuento de cupo) ya que corrompe los datos desde un incio
lo que hace que el sistema no tenga la informacion correcta.
*/

-- =========== CODIGO CORREGIDO ===================
/*
DROP TABLE IF EXISTS inscripciones CASCADE;
DROP TABLE IF EXISTS prerrequisitos CASCADE;
DROP TABLE IF EXISTS cursos CASCADE;
DROP TABLE IF EXISTS alumnos CASCADE;
DROP TABLE IF EXISTS log_inscripciones CASCADE;
-- ==================== TABLAS ====================
CREATE TABLE alumnos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    semestre INT NOT NULL CHECK (semestre BETWEEN 1 AND 12),
    activo BOOLEAN DEFAULT true
);
CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    clave VARCHAR(10) UNIQUE NOT NULL,
    cupo_maximo INT NOT NULL CHECK (cupo_maximo > 0),
    cupo_disponible INT NOT NULL CHECK (cupo_disponible >= 0),
    semestre_minimo INT DEFAULT 1,
    activo BOOLEAN DEFAULT true
);
CREATE TABLE prerrequisitos (
    id SERIAL PRIMARY KEY,
    curso_id INT NOT NULL REFERENCES cursos(id),
    prerrequisito_id INT REFERENCES cursos(id)
);
CREATE TABLE inscripciones (
    id SERIAL PRIMARY KEY,
    alumno_id INT NOT NULL REFERENCES alumnos(id),
    curso_id INT NOT NULL REFERENCES cursos(id),
    fecha TIMESTAMP DEFAULT now(),
    estado VARCHAR(20) DEFAULT 'ACTIVA',
    UNIQUE(alumno_id, curso_id)
);
CREATE TABLE log_inscripciones (
    id SERIAL PRIMARY KEY,
    alumno_id INT,
    curso_id INT,
    accion VARCHAR(50),
    detalle TEXT,
    fecha TIMESTAMP DEFAULT now()
);
-- ==================== DATOS DE PRUEBA ====================
INSERT INTO alumnos (nombre, matricula, semestre) VALUES
('Ana García', '2024001', 5),
('Carlos Mendoza', '2024002', 3),
('Diana Torres', '2024003', 7),
('Eduardo Ramírez', '2024004', 2),
('Fernanda López', '2024005', 6);
INSERT INTO cursos (nombre, clave, cupo_maximo, cupo_disponible, semestre_minimo) VALUES
('Base de Datos Avanzadas', 'BDA-501', 30, 5, 5),
('Programación Web', 'PW-301', 35, 10, 3),
('Inteligencia Artificial', 'IA-601', 25, 2, 6),
('Estructuras de Datos', 'ED-201', 40, 15, 2),
('Redes de Computadoras', 'RC-401', 30, 8, 4);
INSERT INTO prerrequisitos (curso_id, prerrequisito_id) VALUES
(1, 4), (3, 1), (5, 2);
INSERT INTO inscripciones (alumno_id, curso_id, estado) VALUES
(1, 4, 'APROBADA'), (1, 2, 'APROBADA'), (3, 4, 'APROBADA'), (3, 1, 'APROBADA');
-- ==================== TRIGGER (Funcionamiento correcto) ====================
CREATE OR REPLACE FUNCTION fn_log_inscripcion()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO log_inscripciones (alumno_id, curso_id, accion, detalle)
    VALUES (NEW.alumno_id, NEW.curso_id, 'INSCRIPCION', 'Alumno inscrito al curso');
    -- El trigger se encarga de descontar el cupo
    UPDATE cursos SET cupo_disponible = cupo_disponible - 1
    WHERE id = NEW.curso_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trg_log_inscripcion
AFTER INSERT ON inscripciones
FOR EACH ROW
EXECUTE FUNCTION fn_log_inscripcion();
-- ==================== STORED PROCEDURE (CORREGIDO) ====================
CREATE OR REPLACE PROCEDURE sp_inscribir_alumnos(
    IN p_curso_id INT,
    IN p_alumno_ids INT[],
    OUT p_inscritos INT
)
LANGUAGE plpgsql AS $$
DECLARE
    v_alumno_id INT;
    v_alumno RECORD;
    v_curso RECORD;
    v_cupo INT;
    v_cumple_prereq BOOLEAN;
BEGIN
    -- BUG 4 CORREGIDO: Inicializar contador
    p_inscritos := 0;
    SELECT * INTO v_curso FROM cursos WHERE id = p_curso_id;
    IF NOT FOUND THEN RAISE EXCEPTION 'Curso con id % no existe', p_curso_id; END IF;
    IF v_curso.activo = false THEN RAISE EXCEPTION 'Curso % no está activo', v_curso.nombre; END IF;
    FOREACH v_alumno_id IN ARRAY p_alumno_ids
    LOOP
        -- BUG 1 CORREGIDO: Bloqueo de fila del curso para concurrencia
        SELECT cupo_disponible INTO v_cupo FROM cursos WHERE id = p_curso_id FOR UPDATE;
        SELECT * INTO v_alumno FROM alumnos WHERE id = v_alumno_id;
        IF NOT FOUND THEN
            RAISE NOTICE 'Alumno % no encontrado, saltando...', v_alumno_id;
            CONTINUE;
        END IF;
        IF v_alumno.semestre < v_curso.semestre_minimo THEN
            RAISE NOTICE 'Alumno % no cumple semestre mínimo', v_alumno.nombre;
            CONTINUE;
        END IF;
        IF v_cupo <= 0 THEN
            RAISE NOTICE 'Sin cupo para %', v_alumno.nombre;
            CONTINUE;
        END IF;
        -- BUG 5 CORREGIDO: Manejo de NULL con NOT EXISTS
        SELECT NOT EXISTS (
            SELECT 1 FROM prerrequisitos p
            WHERE p.curso_id = p_curso_id
              AND NOT EXISTS (
                  SELECT 1 FROM inscripciones i
                  WHERE i.alumno_id = v_alumno_id
                    AND i.curso_id = p.prerrequisito_id
                    AND i.estado = 'APROBADA'
              )
        ) INTO v_cumple_prereq;
        IF NOT v_cumple_prereq THEN
            RAISE NOTICE 'Alumno % no cumple prerrequisitos', v_alumno.nombre;
            CONTINUE;
        END IF;
        IF EXISTS (SELECT 1 FROM inscripciones
                   WHERE alumno_id = v_alumno_id AND curso_id = p_curso_id
                     AND estado = 'ACTIVA') THEN
            RAISE NOTICE 'Alumno % ya inscrito', v_alumno.nombre;
            CONTINUE;
        END IF;
        -- Inscribir al alumno
        INSERT INTO inscripciones (alumno_id, curso_id, estado)
        VALUES (v_alumno_id, p_curso_id, 'ACTIVA');
        -- BUG 3 CORREGIDO: Se eliminó el UPDATE manual (El trigger ya lo hace)
        
        -- BUG 4 CORREGIDO: Incrementar contador de inscritos
        p_inscritos := p_inscritos + 1;
        RAISE NOTICE 'Alumno % inscrito exitosamente', v_alumno.nombre;
    END LOOP;
    -- BUG 2 CORREGIDO: COMMIT fuera del loop para asegurar atomicidad
    COMMIT;
END;
$$;

*/
