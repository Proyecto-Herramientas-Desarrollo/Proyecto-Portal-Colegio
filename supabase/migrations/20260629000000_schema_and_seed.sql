-- Supabase / PostgreSQL Schema & Seed Migration
-- Created at 2026-06-29T04:01:59.547Z

-- Enable Row Level Security (RLS) or leave it disabled for now depending on configuration
-- We will create tables first.

-- 1. AULAS
CREATE TABLE IF NOT EXISTS public.aulas (
    id SERIAL PRIMARY KEY,
    grado VARCHAR(50) NOT NULL,
    seccion VARCHAR(10) NOT NULL,
    turno VARCHAR(20) NOT NULL
);

-- 2. CURSOS
CREATE TABLE IF NOT EXISTS public.cursos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    horas_semanales INTEGER NOT NULL
);

-- 3. DOCENTES
CREATE TABLE IF NOT EXISTS public.docentes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(8) UNIQUE NOT NULL,
    especialidad_curso_id INTEGER REFERENCES public.cursos(id) ON DELETE SET NULL,
    user_id UUID, -- References auth.users(id) in Supabase
    foto_url TEXT,
    telefono VARCHAR(20),
    contacto_emergencia TEXT,
    horario_atencion VARCHAR(100),
    departamento VARCHAR(100)
);

-- 4. ALUMNOS
CREATE TABLE IF NOT EXISTS public.alumnos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(8) UNIQUE NOT NULL,
    aula_id INTEGER REFERENCES public.aulas(id) ON DELETE SET NULL,
    user_id UUID, -- References auth.users(id) in Supabase
    foto_url TEXT,
    telefono VARCHAR(20),
    contacto_emergencia TEXT
);

-- 5. HORARIOS
CREATE TABLE IF NOT EXISTS public.horarios (
    id SERIAL PRIMARY KEY,
    aula_id INTEGER REFERENCES public.aulas(id) ON DELETE CASCADE,
    dia VARCHAR(15) NOT NULL,
    bloque_orden INTEGER NOT NULL,
    curso_id INTEGER REFERENCES public.cursos(id) ON DELETE CASCADE,
    docente_id INTEGER REFERENCES public.docentes(id) ON DELETE CASCADE
);

-- 6. NOTAS
CREATE TABLE IF NOT EXISTS public.notas (
    id SERIAL PRIMARY KEY,
    alumno_id INTEGER REFERENCES public.alumnos(id) ON DELETE CASCADE,
    curso_id INTEGER REFERENCES public.cursos(id) ON DELETE CASCADE,
    bimestre_1 NUMERIC(4,2),
    bimestre_2 NUMERIC(4,2),
    bimestre_3 NUMERIC(4,2),
    bimestre_4 NUMERIC(4,2),
    promedio_final NUMERIC(4,2)
);

-- 7. ASISTENCIAS
CREATE TABLE IF NOT EXISTS public.asistencias (
    id SERIAL PRIMARY KEY,
    alumno_id INTEGER REFERENCES public.alumnos(id) ON DELETE CASCADE,
    curso_id INTEGER REFERENCES public.cursos(id) ON DELETE CASCADE,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    estado VARCHAR(20) NOT NULL, -- 'Asiste', 'Tarde', 'Falta', 'Justificado'
    comentario TEXT
);

-- 8. TRAMITES
CREATE TABLE IF NOT EXISTS public.tramites (
    id SERIAL PRIMARY KEY,
    alumno_id INTEGER REFERENCES public.alumnos(id) ON DELETE CASCADE,
    tipo VARCHAR(100) NOT NULL,
    fecha_solicitud DATE NOT NULL DEFAULT CURRENT_DATE,
    estado VARCHAR(20) NOT NULL DEFAULT 'Pendiente', -- 'Pendiente', 'Aprobado', 'Rechazado'
    dni_validador VARCHAR(8),
    documento_resultado_url TEXT
);

-- 9. FINANZAS
CREATE TABLE IF NOT EXISTS public.finanzas (
    id SERIAL PRIMARY KEY,
    alumno_id INTEGER REFERENCES public.alumnos(id) ON DELETE CASCADE,
    concepto VARCHAR(255) NOT NULL,
    monto NUMERIC(10,2) NOT NULL,
    estado VARCHAR(20) NOT NULL, -- 'Pagado', 'Pendiente', 'Por Vencer'
    vencimiento DATE NOT NULL
);

-- 10. MATERIALES DE CLASE
CREATE TABLE IF NOT EXISTS public.materiales_clase (
    id SERIAL PRIMARY KEY,
    curso_id INTEGER REFERENCES public.cursos(id) ON DELETE CASCADE,
    docente_id INTEGER REFERENCES public.docentes(id) ON DELETE SET NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    archivo_url TEXT, -- Link to Supabase Storage Bucket
    archivo_nombre VARCHAR(255),
    tipo VARCHAR(10), -- PDF, PPTX, DOCX, etc.
    size VARCHAR(50),
    fecha_subida TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 11. TAREAS
CREATE TABLE IF NOT EXISTS public.tareas (
    id SERIAL PRIMARY KEY,
    curso_id INTEGER REFERENCES public.cursos(id) ON DELETE CASCADE,
    docente_id INTEGER REFERENCES public.docentes(id) ON DELETE SET NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    archivo_url TEXT,
    fecha_limite TIMESTAMP WITH TIME ZONE NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 12. TAREAS ENTREGADAS
CREATE TABLE IF NOT EXISTS public.tareas_entregadas (
    id SERIAL PRIMARY KEY,
    tarea_id INTEGER REFERENCES public.tareas(id) ON DELETE CASCADE,
    alumno_id INTEGER REFERENCES public.alumnos(id) ON DELETE CASCADE,
    archivo_url TEXT,
    archivo_nombre VARCHAR(255),
    fecha_entrega TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    nota NUMERIC(4,2),
    comentario TEXT,
    estado VARCHAR(20) DEFAULT 'Entregado' -- 'Entregado', 'Calificado'
);

-- 13. MENSAJES INTERNOS
CREATE TABLE IF NOT EXISTS public.mensajes (
    id SERIAL PRIMARY KEY,
    remitente_id INTEGER NOT NULL,
    remitente_tipo VARCHAR(10) NOT NULL, -- 'alumno' or 'docente'
    destinatario_id INTEGER NOT NULL,
    destinatario_tipo VARCHAR(10) NOT NULL, -- 'alumno' or 'docente'
    asunto VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    fecha_envio TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    leido BOOLEAN DEFAULT FALSE NOT NULL
);

-- 14. NOTIFICACIONES
CREATE TABLE IF NOT EXISTS public.notificaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    usuario_tipo VARCHAR(10) NOT NULL, -- 'alumno' or 'docente'
    titulo VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    leido BOOLEAN DEFAULT FALSE NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- SEED DATA SECTION
-- We will insert the existing data from our front-end db.ts file.


-- Seed Aulas
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (1, '1ro Secundaria', 'A', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (2, '1ro Secundaria', 'B', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (3, '1ro Secundaria', 'C', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (4, '1ro Secundaria', 'D', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (5, '2do Secundaria', 'A', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (6, '2do Secundaria', 'B', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (7, '2do Secundaria', 'C', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (8, '2do Secundaria', 'D', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (9, '3ro Secundaria', 'A', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (10, '3ro Secundaria', 'B', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (11, '3ro Secundaria', 'C', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (12, '3ro Secundaria', 'D', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (13, '4to Secundaria', 'A', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (14, '4to Secundaria', 'B', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (15, '4to Secundaria', 'C', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (16, '4to Secundaria', 'D', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (17, '5to Secundaria', 'A', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (18, '5to Secundaria', 'B', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (19, '5to Secundaria', 'C', 'Mañana') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.aulas (id, grado, seccion, turno) VALUES (20, '5to Secundaria', 'D', 'Mañana') ON CONFLICT (id) DO NOTHING;
SELECT setval('public.aulas_id_seq', (SELECT MAX(id) FROM public.aulas));

-- Seed Cursos
INSERT INTO public.cursos (id, nombre, horas_semanales) VALUES (1, 'Matemática', 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.cursos (id, nombre, horas_semanales) VALUES (2, 'Comunicación', 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.cursos (id, nombre, horas_semanales) VALUES (3, 'CIT (Ciencia y Tecnología)', 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.cursos (id, nombre, horas_semanales) VALUES (4, 'Arte', 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.cursos (id, nombre, horas_semanales) VALUES (5, 'Educación Física', 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.cursos (id, nombre, horas_semanales) VALUES (6, 'Religión', 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.cursos (id, nombre, horas_semanales) VALUES (7, 'Humanidades', 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.cursos (id, nombre, horas_semanales) VALUES (8, 'Educación para el Trabajo', 3) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.cursos (id, nombre, horas_semanales) VALUES (9, 'Inglés', 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.cursos (id, nombre, horas_semanales) VALUES (10, 'Historia y Geografía', 4) ON CONFLICT (id) DO NOTHING;
SELECT setval('public.cursos_id_seq', (SELECT MAX(id) FROM public.cursos));

-- Seed Docentes
INSERT INTO public.docentes (id, nombre, apellido, dni, especialidad_curso_id) VALUES (1, 'Carlos', 'Mendoza', '10293847', 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.docentes (id, nombre, apellido, dni, especialidad_curso_id) VALUES (2, 'Ana', 'Ramírez', '29384756', 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.docentes (id, nombre, apellido, dni, especialidad_curso_id) VALUES (3, 'Bertha', 'Orihuela', '09876543', 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.docentes (id, nombre, apellido, dni, especialidad_curso_id) VALUES (4, 'Jorge', 'Salinas', '38475619', 3) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.docentes (id, nombre, apellido, dni, especialidad_curso_id) VALUES (5, 'Lucía', 'Vargas', '47561928', 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.docentes (id, nombre, apellido, dni, especialidad_curso_id) VALUES (6, 'Miguel', 'Trauco', '56192837', 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.docentes (id, nombre, apellido, dni, especialidad_curso_id) VALUES (7, 'Teresa', 'Campos', '61928374', 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.docentes (id, nombre, apellido, dni, especialidad_curso_id) VALUES (8, 'Roberto', 'Gómez', '19283746', 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.docentes (id, nombre, apellido, dni, especialidad_curso_id) VALUES (9, 'Elena', 'Rojas', '92837465', 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.docentes (id, nombre, apellido, dni, especialidad_curso_id) VALUES (10, 'Patricia', 'Kling', '11223344', 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.docentes (id, nombre, apellido, dni, especialidad_curso_id) VALUES (11, 'Hugo', 'Paredes', '55667788', 10) ON CONFLICT (id) DO NOTHING;
SELECT setval('public.docentes_id_seq', (SELECT MAX(id) FROM public.docentes));

-- Seed Alumnos
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (1, 'Mateo', 'García', '70123456', 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (2, 'Valeria', 'López', '70123457', 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (3, 'Diego', 'Davila', '70123458', 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (4, 'Shantall', 'Gutiérrez', '70123459', 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (5, 'David', 'Torres', '70123460', 3) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (6, 'Camila', 'Ruiz', '70123461', 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (7, 'Sebastián', 'Castro', '70123462', 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (8, 'Gabriela', 'Flores', '70123463', 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (9, 'Joaquín', 'Ríos', '70123464', 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (10, 'Mariana', 'Vega', '70123465', 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (11, 'Lucas', 'Navarro', '70123466', 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (12, 'Valentina', 'Molina', '70123467', 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (13, 'Matías', 'Ortiz', '70123468', 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (14, 'Luciana', 'Silva', '70123469', 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (15, 'Nicolás', 'Reyes', '70123470', 12) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (16, 'Antonella', 'Morales', '70123471', 13) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (17, 'Leonardo', 'Herrera', '70123472', 13) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (18, 'Isabella', 'Medina', '70123473', 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (19, 'Gabriel', 'Aguilar', '70123474', 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (20, 'Daniela', 'Paz', '70123475', 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (21, 'Rodrigo', 'Guzmán', '70123476', 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (22, 'Renata', 'Salazar', '70123477', 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (23, 'Emilio', 'Cordero', '70123478', 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (24, 'Paula', 'Cabrera', '70123479', 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (25, 'Alejandro', 'Bustamante', '70123480', 19) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (26, 'Sofía', 'Paredes', '70123481', 19) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (27, 'Marcos', 'León', '70123482', 20) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (28, 'Romina', 'Espinoza', '70123483', 20) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (29, 'Andrés', 'Carrillo', '70123484', 20) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.alumnos (id, nombre, apellido, dni, aula_id) VALUES (30, 'Jimena', 'Cáceres', '70123485', 20) ON CONFLICT (id) DO NOTHING;
SELECT setval('public.alumnos_id_seq', (SELECT MAX(id) FROM public.alumnos));

-- Seed Horarios
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (1, 1, 'Lunes', 1, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (2, 1, 'Lunes', 2, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (3, 1, 'Lunes', 3, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (4, 1, 'Lunes', 4, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (5, 1, 'Lunes', 5, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (6, 1, 'Lunes', 6, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (7, 1, 'Lunes', 7, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (8, 1, 'Martes', 1, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (9, 1, 'Martes', 2, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (10, 1, 'Martes', 3, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (11, 1, 'Martes', 4, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (12, 1, 'Martes', 5, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (13, 1, 'Martes', 6, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (14, 1, 'Martes', 7, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (15, 1, 'Miércoles', 1, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (16, 1, 'Miércoles', 2, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (17, 1, 'Miércoles', 3, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (18, 1, 'Miércoles', 4, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (19, 1, 'Miércoles', 5, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (20, 1, 'Miércoles', 6, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (21, 1, 'Miércoles', 7, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (22, 1, 'Jueves', 1, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (23, 1, 'Jueves', 2, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (24, 1, 'Jueves', 3, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (25, 1, 'Jueves', 4, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (26, 1, 'Jueves', 5, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (27, 1, 'Jueves', 6, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (28, 1, 'Jueves', 7, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (29, 1, 'Viernes', 1, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (30, 1, 'Viernes', 2, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (31, 1, 'Viernes', 3, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (32, 1, 'Viernes', 4, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (33, 1, 'Viernes', 5, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (34, 1, 'Viernes', 6, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (35, 1, 'Viernes', 7, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (36, 2, 'Lunes', 1, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (37, 2, 'Lunes', 2, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (38, 2, 'Lunes', 3, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (39, 2, 'Lunes', 4, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (40, 2, 'Lunes', 5, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (41, 2, 'Lunes', 6, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (42, 2, 'Lunes', 7, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (43, 2, 'Martes', 1, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (44, 2, 'Martes', 2, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (45, 2, 'Martes', 3, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (46, 2, 'Martes', 4, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (47, 2, 'Martes', 5, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (48, 2, 'Martes', 6, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (49, 2, 'Martes', 7, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (50, 2, 'Miércoles', 1, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (51, 2, 'Miércoles', 2, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (52, 2, 'Miércoles', 3, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (53, 2, 'Miércoles', 4, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (54, 2, 'Miércoles', 5, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (55, 2, 'Miércoles', 6, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (56, 2, 'Miércoles', 7, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (57, 2, 'Jueves', 1, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (58, 2, 'Jueves', 2, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (59, 2, 'Jueves', 3, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (60, 2, 'Jueves', 4, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (61, 2, 'Jueves', 5, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (62, 2, 'Jueves', 6, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (63, 2, 'Jueves', 7, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (64, 2, 'Viernes', 1, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (65, 2, 'Viernes', 2, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (66, 2, 'Viernes', 3, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (67, 2, 'Viernes', 4, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (68, 2, 'Viernes', 5, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (69, 2, 'Viernes', 6, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (70, 2, 'Viernes', 7, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (71, 3, 'Lunes', 1, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (72, 3, 'Lunes', 2, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (73, 3, 'Lunes', 3, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (74, 3, 'Lunes', 4, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (75, 3, 'Lunes', 5, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (76, 3, 'Lunes', 6, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (77, 3, 'Lunes', 7, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (78, 3, 'Martes', 1, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (79, 3, 'Martes', 2, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (80, 3, 'Martes', 3, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (81, 3, 'Martes', 4, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (82, 3, 'Martes', 5, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (83, 3, 'Martes', 6, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (84, 3, 'Martes', 7, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (85, 3, 'Miércoles', 1, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (86, 3, 'Miércoles', 2, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (87, 3, 'Miércoles', 3, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (88, 3, 'Miércoles', 4, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (89, 3, 'Miércoles', 5, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (90, 3, 'Miércoles', 6, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (91, 3, 'Miércoles', 7, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (92, 3, 'Jueves', 1, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (93, 3, 'Jueves', 2, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (94, 3, 'Jueves', 3, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (95, 3, 'Jueves', 4, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (96, 3, 'Jueves', 5, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (97, 3, 'Jueves', 6, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (98, 3, 'Jueves', 7, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (99, 3, 'Viernes', 1, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (100, 3, 'Viernes', 2, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (101, 3, 'Viernes', 3, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (102, 3, 'Viernes', 4, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (103, 3, 'Viernes', 5, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (104, 3, 'Viernes', 6, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (105, 3, 'Viernes', 7, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (106, 4, 'Lunes', 1, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (107, 4, 'Lunes', 2, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (108, 4, 'Lunes', 3, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (109, 4, 'Lunes', 4, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (110, 4, 'Lunes', 5, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (111, 4, 'Lunes', 6, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (112, 4, 'Lunes', 7, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (113, 4, 'Martes', 1, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (114, 4, 'Martes', 2, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (115, 4, 'Martes', 3, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (116, 4, 'Martes', 4, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (117, 4, 'Martes', 5, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (118, 4, 'Martes', 6, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (119, 4, 'Martes', 7, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (120, 4, 'Miércoles', 1, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (121, 4, 'Miércoles', 2, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (122, 4, 'Miércoles', 3, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (123, 4, 'Miércoles', 4, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (124, 4, 'Miércoles', 5, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (125, 4, 'Miércoles', 6, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (126, 4, 'Miércoles', 7, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (127, 4, 'Jueves', 1, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (128, 4, 'Jueves', 2, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (129, 4, 'Jueves', 3, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (130, 4, 'Jueves', 4, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (131, 4, 'Jueves', 5, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (132, 4, 'Jueves', 6, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (133, 4, 'Jueves', 7, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (134, 4, 'Viernes', 1, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (135, 4, 'Viernes', 2, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (136, 4, 'Viernes', 3, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (137, 4, 'Viernes', 4, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (138, 4, 'Viernes', 5, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (139, 4, 'Viernes', 6, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (140, 4, 'Viernes', 7, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (141, 5, 'Lunes', 1, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (142, 5, 'Lunes', 2, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (143, 5, 'Lunes', 3, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (144, 5, 'Lunes', 4, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (145, 5, 'Lunes', 5, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (146, 5, 'Lunes', 6, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (147, 5, 'Lunes', 7, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (148, 5, 'Martes', 1, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (149, 5, 'Martes', 2, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (150, 5, 'Martes', 3, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (151, 5, 'Martes', 4, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (152, 5, 'Martes', 5, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (153, 5, 'Martes', 6, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (154, 5, 'Martes', 7, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (155, 5, 'Miércoles', 1, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (156, 5, 'Miércoles', 2, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (157, 5, 'Miércoles', 3, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (158, 5, 'Miércoles', 4, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (159, 5, 'Miércoles', 5, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (160, 5, 'Miércoles', 6, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (161, 5, 'Miércoles', 7, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (162, 5, 'Jueves', 1, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (163, 5, 'Jueves', 2, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (164, 5, 'Jueves', 3, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (165, 5, 'Jueves', 4, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (166, 5, 'Jueves', 5, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (167, 5, 'Jueves', 6, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (168, 5, 'Jueves', 7, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (169, 5, 'Viernes', 1, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (170, 5, 'Viernes', 2, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (171, 5, 'Viernes', 3, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (172, 5, 'Viernes', 4, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (173, 5, 'Viernes', 5, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (174, 5, 'Viernes', 6, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (175, 5, 'Viernes', 7, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (176, 6, 'Lunes', 1, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (177, 6, 'Lunes', 2, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (178, 6, 'Lunes', 3, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (179, 6, 'Lunes', 4, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (180, 6, 'Lunes', 5, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (181, 6, 'Lunes', 6, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (182, 6, 'Lunes', 7, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (183, 6, 'Martes', 1, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (184, 6, 'Martes', 2, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (185, 6, 'Martes', 3, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (186, 6, 'Martes', 4, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (187, 6, 'Martes', 5, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (188, 6, 'Martes', 6, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (189, 6, 'Martes', 7, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (190, 6, 'Miércoles', 1, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (191, 6, 'Miércoles', 2, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (192, 6, 'Miércoles', 3, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (193, 6, 'Miércoles', 4, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (194, 6, 'Miércoles', 5, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (195, 6, 'Miércoles', 6, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (196, 6, 'Miércoles', 7, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (197, 6, 'Jueves', 1, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (198, 6, 'Jueves', 2, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (199, 6, 'Jueves', 3, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (200, 6, 'Jueves', 4, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (201, 6, 'Jueves', 5, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (202, 6, 'Jueves', 6, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (203, 6, 'Jueves', 7, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (204, 6, 'Viernes', 1, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (205, 6, 'Viernes', 2, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (206, 6, 'Viernes', 3, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (207, 6, 'Viernes', 4, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (208, 6, 'Viernes', 5, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (209, 6, 'Viernes', 6, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (210, 6, 'Viernes', 7, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (211, 7, 'Lunes', 1, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (212, 7, 'Lunes', 2, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (213, 7, 'Lunes', 3, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (214, 7, 'Lunes', 4, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (215, 7, 'Lunes', 5, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (216, 7, 'Lunes', 6, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (217, 7, 'Lunes', 7, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (218, 7, 'Martes', 1, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (219, 7, 'Martes', 2, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (220, 7, 'Martes', 3, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (221, 7, 'Martes', 4, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (222, 7, 'Martes', 5, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (223, 7, 'Martes', 6, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (224, 7, 'Martes', 7, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (225, 7, 'Miércoles', 1, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (226, 7, 'Miércoles', 2, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (227, 7, 'Miércoles', 3, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (228, 7, 'Miércoles', 4, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (229, 7, 'Miércoles', 5, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (230, 7, 'Miércoles', 6, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (231, 7, 'Miércoles', 7, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (232, 7, 'Jueves', 1, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (233, 7, 'Jueves', 2, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (234, 7, 'Jueves', 3, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (235, 7, 'Jueves', 4, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (236, 7, 'Jueves', 5, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (237, 7, 'Jueves', 6, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (238, 7, 'Jueves', 7, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (239, 7, 'Viernes', 1, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (240, 7, 'Viernes', 2, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (241, 7, 'Viernes', 3, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (242, 7, 'Viernes', 4, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (243, 7, 'Viernes', 5, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (244, 7, 'Viernes', 6, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (245, 7, 'Viernes', 7, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (246, 8, 'Lunes', 1, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (247, 8, 'Lunes', 2, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (248, 8, 'Lunes', 3, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (249, 8, 'Lunes', 4, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (250, 8, 'Lunes', 5, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (251, 8, 'Lunes', 6, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (252, 8, 'Lunes', 7, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (253, 8, 'Martes', 1, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (254, 8, 'Martes', 2, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (255, 8, 'Martes', 3, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (256, 8, 'Martes', 4, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (257, 8, 'Martes', 5, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (258, 8, 'Martes', 6, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (259, 8, 'Martes', 7, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (260, 8, 'Miércoles', 1, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (261, 8, 'Miércoles', 2, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (262, 8, 'Miércoles', 3, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (263, 8, 'Miércoles', 4, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (264, 8, 'Miércoles', 5, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (265, 8, 'Miércoles', 6, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (266, 8, 'Miércoles', 7, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (267, 8, 'Jueves', 1, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (268, 8, 'Jueves', 2, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (269, 8, 'Jueves', 3, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (270, 8, 'Jueves', 4, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (271, 8, 'Jueves', 5, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (272, 8, 'Jueves', 6, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (273, 8, 'Jueves', 7, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (274, 8, 'Viernes', 1, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (275, 8, 'Viernes', 2, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (276, 8, 'Viernes', 3, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (277, 8, 'Viernes', 4, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (278, 8, 'Viernes', 5, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (279, 8, 'Viernes', 6, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (280, 8, 'Viernes', 7, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (281, 9, 'Lunes', 1, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (282, 9, 'Lunes', 2, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (283, 9, 'Lunes', 3, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (284, 9, 'Lunes', 4, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (285, 9, 'Lunes', 5, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (286, 9, 'Lunes', 6, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (287, 9, 'Lunes', 7, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (288, 9, 'Martes', 1, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (289, 9, 'Martes', 2, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (290, 9, 'Martes', 3, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (291, 9, 'Martes', 4, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (292, 9, 'Martes', 5, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (293, 9, 'Martes', 6, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (294, 9, 'Martes', 7, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (295, 9, 'Miércoles', 1, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (296, 9, 'Miércoles', 2, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (297, 9, 'Miércoles', 3, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (298, 9, 'Miércoles', 4, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (299, 9, 'Miércoles', 5, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (300, 9, 'Miércoles', 6, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (301, 9, 'Miércoles', 7, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (302, 9, 'Jueves', 1, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (303, 9, 'Jueves', 2, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (304, 9, 'Jueves', 3, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (305, 9, 'Jueves', 4, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (306, 9, 'Jueves', 5, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (307, 9, 'Jueves', 6, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (308, 9, 'Jueves', 7, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (309, 9, 'Viernes', 1, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (310, 9, 'Viernes', 2, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (311, 9, 'Viernes', 3, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (312, 9, 'Viernes', 4, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (313, 9, 'Viernes', 5, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (314, 9, 'Viernes', 6, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (315, 9, 'Viernes', 7, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (316, 10, 'Lunes', 1, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (317, 10, 'Lunes', 2, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (318, 10, 'Lunes', 3, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (319, 10, 'Lunes', 4, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (320, 10, 'Lunes', 5, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (321, 10, 'Lunes', 6, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (322, 10, 'Lunes', 7, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (323, 10, 'Martes', 1, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (324, 10, 'Martes', 2, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (325, 10, 'Martes', 3, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (326, 10, 'Martes', 4, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (327, 10, 'Martes', 5, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (328, 10, 'Martes', 6, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (329, 10, 'Martes', 7, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (330, 10, 'Miércoles', 1, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (331, 10, 'Miércoles', 2, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (332, 10, 'Miércoles', 3, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (333, 10, 'Miércoles', 4, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (334, 10, 'Miércoles', 5, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (335, 10, 'Miércoles', 6, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (336, 10, 'Miércoles', 7, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (337, 10, 'Jueves', 1, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (338, 10, 'Jueves', 2, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (339, 10, 'Jueves', 3, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (340, 10, 'Jueves', 4, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (341, 10, 'Jueves', 5, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (342, 10, 'Jueves', 6, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (343, 10, 'Jueves', 7, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (344, 10, 'Viernes', 1, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (345, 10, 'Viernes', 2, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (346, 10, 'Viernes', 3, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (347, 10, 'Viernes', 4, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (348, 10, 'Viernes', 5, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (349, 10, 'Viernes', 6, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (350, 10, 'Viernes', 7, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (351, 11, 'Lunes', 1, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (352, 11, 'Lunes', 2, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (353, 11, 'Lunes', 3, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (354, 11, 'Lunes', 4, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (355, 11, 'Lunes', 5, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (356, 11, 'Lunes', 6, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (357, 11, 'Lunes', 7, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (358, 11, 'Martes', 1, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (359, 11, 'Martes', 2, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (360, 11, 'Martes', 3, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (361, 11, 'Martes', 4, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (362, 11, 'Martes', 5, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (363, 11, 'Martes', 6, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (364, 11, 'Martes', 7, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (365, 11, 'Miércoles', 1, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (366, 11, 'Miércoles', 2, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (367, 11, 'Miércoles', 3, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (368, 11, 'Miércoles', 4, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (369, 11, 'Miércoles', 5, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (370, 11, 'Miércoles', 6, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (371, 11, 'Miércoles', 7, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (372, 11, 'Jueves', 1, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (373, 11, 'Jueves', 2, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (374, 11, 'Jueves', 3, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (375, 11, 'Jueves', 4, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (376, 11, 'Jueves', 5, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (377, 11, 'Jueves', 6, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (378, 11, 'Jueves', 7, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (379, 11, 'Viernes', 1, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (380, 11, 'Viernes', 2, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (381, 11, 'Viernes', 3, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (382, 11, 'Viernes', 4, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (383, 11, 'Viernes', 5, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (384, 11, 'Viernes', 6, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (385, 11, 'Viernes', 7, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (386, 12, 'Lunes', 1, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (387, 12, 'Lunes', 2, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (388, 12, 'Lunes', 3, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (389, 12, 'Lunes', 4, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (390, 12, 'Lunes', 5, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (391, 12, 'Lunes', 6, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (392, 12, 'Lunes', 7, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (393, 12, 'Martes', 1, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (394, 12, 'Martes', 2, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (395, 12, 'Martes', 3, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (396, 12, 'Martes', 4, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (397, 12, 'Martes', 5, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (398, 12, 'Martes', 6, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (399, 12, 'Martes', 7, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (400, 12, 'Miércoles', 1, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (401, 12, 'Miércoles', 2, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (402, 12, 'Miércoles', 3, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (403, 12, 'Miércoles', 4, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (404, 12, 'Miércoles', 5, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (405, 12, 'Miércoles', 6, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (406, 12, 'Miércoles', 7, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (407, 12, 'Jueves', 1, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (408, 12, 'Jueves', 2, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (409, 12, 'Jueves', 3, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (410, 12, 'Jueves', 4, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (411, 12, 'Jueves', 5, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (412, 12, 'Jueves', 6, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (413, 12, 'Jueves', 7, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (414, 12, 'Viernes', 1, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (415, 12, 'Viernes', 2, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (416, 12, 'Viernes', 3, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (417, 12, 'Viernes', 4, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (418, 12, 'Viernes', 5, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (419, 12, 'Viernes', 6, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (420, 12, 'Viernes', 7, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (421, 13, 'Lunes', 1, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (422, 13, 'Lunes', 2, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (423, 13, 'Lunes', 3, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (424, 13, 'Lunes', 4, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (425, 13, 'Lunes', 5, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (426, 13, 'Lunes', 6, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (427, 13, 'Lunes', 7, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (428, 13, 'Martes', 1, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (429, 13, 'Martes', 2, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (430, 13, 'Martes', 3, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (431, 13, 'Martes', 4, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (432, 13, 'Martes', 5, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (433, 13, 'Martes', 6, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (434, 13, 'Martes', 7, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (435, 13, 'Miércoles', 1, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (436, 13, 'Miércoles', 2, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (437, 13, 'Miércoles', 3, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (438, 13, 'Miércoles', 4, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (439, 13, 'Miércoles', 5, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (440, 13, 'Miércoles', 6, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (441, 13, 'Miércoles', 7, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (442, 13, 'Jueves', 1, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (443, 13, 'Jueves', 2, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (444, 13, 'Jueves', 3, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (445, 13, 'Jueves', 4, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (446, 13, 'Jueves', 5, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (447, 13, 'Jueves', 6, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (448, 13, 'Jueves', 7, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (449, 13, 'Viernes', 1, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (450, 13, 'Viernes', 2, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (451, 13, 'Viernes', 3, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (452, 13, 'Viernes', 4, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (453, 13, 'Viernes', 5, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (454, 13, 'Viernes', 6, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (455, 13, 'Viernes', 7, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (456, 14, 'Lunes', 1, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (457, 14, 'Lunes', 2, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (458, 14, 'Lunes', 3, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (459, 14, 'Lunes', 4, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (460, 14, 'Lunes', 5, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (461, 14, 'Lunes', 6, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (462, 14, 'Lunes', 7, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (463, 14, 'Martes', 1, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (464, 14, 'Martes', 2, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (465, 14, 'Martes', 3, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (466, 14, 'Martes', 4, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (467, 14, 'Martes', 5, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (468, 14, 'Martes', 6, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (469, 14, 'Martes', 7, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (470, 14, 'Miércoles', 1, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (471, 14, 'Miércoles', 2, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (472, 14, 'Miércoles', 3, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (473, 14, 'Miércoles', 4, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (474, 14, 'Miércoles', 5, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (475, 14, 'Miércoles', 6, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (476, 14, 'Miércoles', 7, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (477, 14, 'Jueves', 1, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (478, 14, 'Jueves', 2, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (479, 14, 'Jueves', 3, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (480, 14, 'Jueves', 4, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (481, 14, 'Jueves', 5, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (482, 14, 'Jueves', 6, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (483, 14, 'Jueves', 7, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (484, 14, 'Viernes', 1, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (485, 14, 'Viernes', 2, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (486, 14, 'Viernes', 3, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (487, 14, 'Viernes', 4, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (488, 14, 'Viernes', 5, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (489, 14, 'Viernes', 6, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (490, 14, 'Viernes', 7, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (491, 15, 'Lunes', 1, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (492, 15, 'Lunes', 2, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (493, 15, 'Lunes', 3, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (494, 15, 'Lunes', 4, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (495, 15, 'Lunes', 5, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (496, 15, 'Lunes', 6, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (497, 15, 'Lunes', 7, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (498, 15, 'Martes', 1, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (499, 15, 'Martes', 2, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (500, 15, 'Martes', 3, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (501, 15, 'Martes', 4, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (502, 15, 'Martes', 5, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (503, 15, 'Martes', 6, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (504, 15, 'Martes', 7, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (505, 15, 'Miércoles', 1, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (506, 15, 'Miércoles', 2, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (507, 15, 'Miércoles', 3, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (508, 15, 'Miércoles', 4, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (509, 15, 'Miércoles', 5, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (510, 15, 'Miércoles', 6, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (511, 15, 'Miércoles', 7, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (512, 15, 'Jueves', 1, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (513, 15, 'Jueves', 2, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (514, 15, 'Jueves', 3, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (515, 15, 'Jueves', 4, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (516, 15, 'Jueves', 5, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (517, 15, 'Jueves', 6, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (518, 15, 'Jueves', 7, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (519, 15, 'Viernes', 1, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (520, 15, 'Viernes', 2, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (521, 15, 'Viernes', 3, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (522, 15, 'Viernes', 4, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (523, 15, 'Viernes', 5, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (524, 15, 'Viernes', 6, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (525, 15, 'Viernes', 7, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (526, 16, 'Lunes', 1, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (527, 16, 'Lunes', 2, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (528, 16, 'Lunes', 3, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (529, 16, 'Lunes', 4, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (530, 16, 'Lunes', 5, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (531, 16, 'Lunes', 6, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (532, 16, 'Lunes', 7, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (533, 16, 'Martes', 1, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (534, 16, 'Martes', 2, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (535, 16, 'Martes', 3, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (536, 16, 'Martes', 4, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (537, 16, 'Martes', 5, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (538, 16, 'Martes', 6, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (539, 16, 'Martes', 7, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (540, 16, 'Miércoles', 1, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (541, 16, 'Miércoles', 2, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (542, 16, 'Miércoles', 3, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (543, 16, 'Miércoles', 4, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (544, 16, 'Miércoles', 5, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (545, 16, 'Miércoles', 6, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (546, 16, 'Miércoles', 7, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (547, 16, 'Jueves', 1, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (548, 16, 'Jueves', 2, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (549, 16, 'Jueves', 3, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (550, 16, 'Jueves', 4, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (551, 16, 'Jueves', 5, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (552, 16, 'Jueves', 6, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (553, 16, 'Jueves', 7, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (554, 16, 'Viernes', 1, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (555, 16, 'Viernes', 2, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (556, 16, 'Viernes', 3, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (557, 16, 'Viernes', 4, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (558, 16, 'Viernes', 5, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (559, 16, 'Viernes', 6, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (560, 16, 'Viernes', 7, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (561, 17, 'Lunes', 1, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (562, 17, 'Lunes', 2, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (563, 17, 'Lunes', 3, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (564, 17, 'Lunes', 4, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (565, 17, 'Lunes', 5, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (566, 17, 'Lunes', 6, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (567, 17, 'Lunes', 7, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (568, 17, 'Martes', 1, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (569, 17, 'Martes', 2, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (570, 17, 'Martes', 3, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (571, 17, 'Martes', 4, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (572, 17, 'Martes', 5, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (573, 17, 'Martes', 6, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (574, 17, 'Martes', 7, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (575, 17, 'Miércoles', 1, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (576, 17, 'Miércoles', 2, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (577, 17, 'Miércoles', 3, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (578, 17, 'Miércoles', 4, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (579, 17, 'Miércoles', 5, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (580, 17, 'Miércoles', 6, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (581, 17, 'Miércoles', 7, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (582, 17, 'Jueves', 1, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (583, 17, 'Jueves', 2, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (584, 17, 'Jueves', 3, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (585, 17, 'Jueves', 4, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (586, 17, 'Jueves', 5, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (587, 17, 'Jueves', 6, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (588, 17, 'Jueves', 7, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (589, 17, 'Viernes', 1, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (590, 17, 'Viernes', 2, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (591, 17, 'Viernes', 3, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (592, 17, 'Viernes', 4, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (593, 17, 'Viernes', 5, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (594, 17, 'Viernes', 6, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (595, 17, 'Viernes', 7, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (596, 18, 'Lunes', 1, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (597, 18, 'Lunes', 2, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (598, 18, 'Lunes', 3, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (599, 18, 'Lunes', 4, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (600, 18, 'Lunes', 5, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (601, 18, 'Lunes', 6, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (602, 18, 'Lunes', 7, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (603, 18, 'Martes', 1, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (604, 18, 'Martes', 2, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (605, 18, 'Martes', 3, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (606, 18, 'Martes', 4, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (607, 18, 'Martes', 5, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (608, 18, 'Martes', 6, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (609, 18, 'Martes', 7, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (610, 18, 'Miércoles', 1, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (611, 18, 'Miércoles', 2, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (612, 18, 'Miércoles', 3, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (613, 18, 'Miércoles', 4, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (614, 18, 'Miércoles', 5, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (615, 18, 'Miércoles', 6, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (616, 18, 'Miércoles', 7, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (617, 18, 'Jueves', 1, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (618, 18, 'Jueves', 2, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (619, 18, 'Jueves', 3, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (620, 18, 'Jueves', 4, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (621, 18, 'Jueves', 5, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (622, 18, 'Jueves', 6, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (623, 18, 'Jueves', 7, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (624, 18, 'Viernes', 1, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (625, 18, 'Viernes', 2, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (626, 18, 'Viernes', 3, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (627, 18, 'Viernes', 4, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (628, 18, 'Viernes', 5, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (629, 18, 'Viernes', 6, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (630, 18, 'Viernes', 7, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (631, 19, 'Lunes', 1, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (632, 19, 'Lunes', 2, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (633, 19, 'Lunes', 3, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (634, 19, 'Lunes', 4, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (635, 19, 'Lunes', 5, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (636, 19, 'Lunes', 6, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (637, 19, 'Lunes', 7, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (638, 19, 'Martes', 1, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (639, 19, 'Martes', 2, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (640, 19, 'Martes', 3, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (641, 19, 'Martes', 4, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (642, 19, 'Martes', 5, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (643, 19, 'Martes', 6, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (644, 19, 'Martes', 7, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (645, 19, 'Miércoles', 1, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (646, 19, 'Miércoles', 2, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (647, 19, 'Miércoles', 3, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (648, 19, 'Miércoles', 4, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (649, 19, 'Miércoles', 5, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (650, 19, 'Miércoles', 6, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (651, 19, 'Miércoles', 7, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (652, 19, 'Jueves', 1, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (653, 19, 'Jueves', 2, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (654, 19, 'Jueves', 3, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (655, 19, 'Jueves', 4, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (656, 19, 'Jueves', 5, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (657, 19, 'Jueves', 6, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (658, 19, 'Jueves', 7, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (659, 19, 'Viernes', 1, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (660, 19, 'Viernes', 2, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (661, 19, 'Viernes', 3, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (662, 19, 'Viernes', 4, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (663, 19, 'Viernes', 5, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (664, 19, 'Viernes', 6, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (665, 19, 'Viernes', 7, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (666, 20, 'Lunes', 1, 2, 2) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (667, 20, 'Lunes', 2, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (668, 20, 'Lunes', 3, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (669, 20, 'Lunes', 4, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (670, 20, 'Lunes', 5, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (671, 20, 'Lunes', 6, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (672, 20, 'Lunes', 7, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (673, 20, 'Martes', 1, 3, 4) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (674, 20, 'Martes', 2, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (675, 20, 'Martes', 3, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (676, 20, 'Martes', 4, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (677, 20, 'Martes', 5, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (678, 20, 'Martes', 6, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (679, 20, 'Martes', 7, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (680, 20, 'Miércoles', 1, 4, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (681, 20, 'Miércoles', 2, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (682, 20, 'Miércoles', 3, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (683, 20, 'Miércoles', 4, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (684, 20, 'Miércoles', 5, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (685, 20, 'Miércoles', 6, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (686, 20, 'Miércoles', 7, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (687, 20, 'Jueves', 1, 5, 6) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (688, 20, 'Jueves', 2, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (689, 20, 'Jueves', 3, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (690, 20, 'Jueves', 4, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (691, 20, 'Jueves', 5, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (692, 20, 'Jueves', 6, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (693, 20, 'Jueves', 7, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (694, 20, 'Viernes', 1, 6, 7) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (695, 20, 'Viernes', 2, 7, 8) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (696, 20, 'Viernes', 3, 8, 9) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (697, 20, 'Viernes', 4, 9, 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (698, 20, 'Viernes', 5, 10, 11) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (699, 20, 'Viernes', 6, 1, 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.horarios (id, aula_id, dia, bloque_orden, curso_id, docente_id) VALUES (700, 20, 'Viernes', 7, 2, 2) ON CONFLICT (id) DO NOTHING;
SELECT setval('public.horarios_id_seq', (SELECT MAX(id) FROM public.horarios));

-- Seed Notas
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (1, 1, 1, 14, 15, 15, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (2, 1, 2, 15, 16, 17, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (3, 1, 3, 16, 17, 19, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (4, 1, 4, 17, 18, 12, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (5, 1, 5, 18, 19, 14, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (6, 1, 6, 19, 20, 16, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (7, 1, 7, 20, 12, 18, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (8, 1, 8, 12, 13, 20, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (9, 1, 9, 13, 14, 13, 15, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (10, 1, 10, 14, 15, 15, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (11, 2, 1, 15, 17, 16, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (12, 2, 2, 16, 18, 18, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (13, 2, 3, 17, 19, 20, 18, 19) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (14, 2, 4, 18, 20, 13, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (15, 2, 5, 19, 12, 15, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (16, 2, 6, 20, 13, 17, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (17, 2, 7, 12, 14, 19, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (18, 2, 8, 13, 15, 12, 15, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (19, 2, 9, 14, 16, 14, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (20, 2, 10, 15, 17, 16, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (21, 3, 1, 16, 19, 17, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (22, 3, 2, 17, 20, 19, 18, 19) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (23, 3, 3, 18, 12, 12, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (24, 3, 4, 19, 13, 14, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (25, 3, 5, 20, 14, 16, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (26, 3, 6, 12, 15, 18, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (27, 3, 7, 13, 16, 20, 15, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (28, 3, 8, 14, 17, 13, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (29, 3, 9, 15, 18, 15, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (30, 3, 10, 16, 19, 17, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (31, 4, 1, 17, 12, 18, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (32, 4, 2, 18, 13, 20, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (33, 4, 3, 19, 14, 13, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (34, 4, 4, 20, 15, 15, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (35, 4, 5, 12, 16, 17, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (36, 4, 6, 13, 17, 19, 15, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (37, 4, 7, 14, 18, 12, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (38, 4, 8, 15, 19, 14, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (39, 4, 9, 16, 20, 16, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (40, 4, 10, 17, 12, 18, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (41, 5, 1, 18, 14, 19, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (42, 5, 2, 19, 15, 12, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (43, 5, 3, 20, 16, 14, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (44, 5, 4, 12, 17, 16, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (45, 5, 5, 13, 18, 18, 15, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (46, 5, 6, 14, 19, 20, 18, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (47, 5, 7, 15, 20, 13, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (48, 5, 8, 16, 12, 15, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (49, 5, 9, 17, 13, 17, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (50, 5, 10, 18, 14, 19, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (51, 6, 1, 19, 16, 20, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (52, 6, 2, 20, 17, 13, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (53, 6, 3, 12, 18, 15, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (54, 6, 4, 13, 19, 17, 15, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (55, 6, 5, 14, 20, 19, 18, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (56, 6, 6, 15, 12, 12, 12, 13) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (57, 6, 7, 16, 13, 14, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (58, 6, 8, 17, 14, 16, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (59, 6, 9, 18, 15, 18, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (60, 6, 10, 19, 16, 20, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (61, 7, 1, 20, 18, 12, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (62, 7, 2, 12, 19, 14, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (63, 7, 3, 13, 20, 16, 15, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (64, 7, 4, 14, 12, 18, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (65, 7, 5, 15, 13, 20, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (66, 7, 6, 16, 14, 13, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (67, 7, 7, 17, 15, 15, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (68, 7, 8, 18, 16, 17, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (69, 7, 9, 19, 17, 19, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (70, 7, 10, 20, 18, 12, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (71, 8, 1, 12, 20, 13, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (72, 8, 2, 13, 12, 15, 15, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (73, 8, 3, 14, 13, 17, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (74, 8, 4, 15, 14, 19, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (75, 8, 5, 16, 15, 12, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (76, 8, 6, 17, 16, 14, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (77, 8, 7, 18, 17, 16, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (78, 8, 8, 19, 18, 18, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (79, 8, 9, 20, 19, 20, 18, 19) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (80, 8, 10, 12, 20, 13, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (81, 9, 1, 13, 13, 14, 15, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (82, 9, 2, 14, 14, 16, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (83, 9, 3, 15, 15, 18, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (84, 9, 4, 16, 16, 20, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (85, 9, 5, 17, 17, 13, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (86, 9, 6, 18, 18, 15, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (87, 9, 7, 19, 19, 17, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (88, 9, 8, 20, 20, 19, 18, 19) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (89, 9, 9, 12, 12, 12, 12, 12) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (90, 9, 10, 13, 13, 14, 15, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (91, 10, 1, 14, 15, 15, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (92, 10, 2, 15, 16, 17, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (93, 10, 3, 16, 17, 19, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (94, 10, 4, 17, 18, 12, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (95, 10, 5, 18, 19, 14, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (96, 10, 6, 19, 20, 16, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (97, 10, 7, 20, 12, 18, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (98, 10, 8, 12, 13, 20, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (99, 10, 9, 13, 14, 13, 15, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (100, 10, 10, 14, 15, 15, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (101, 11, 1, 15, 17, 16, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (102, 11, 2, 16, 18, 18, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (103, 11, 3, 17, 19, 20, 18, 19) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (104, 11, 4, 18, 20, 13, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (105, 11, 5, 19, 12, 15, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (106, 11, 6, 20, 13, 17, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (107, 11, 7, 12, 14, 19, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (108, 11, 8, 13, 15, 12, 15, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (109, 11, 9, 14, 16, 14, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (110, 11, 10, 15, 17, 16, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (111, 12, 1, 16, 19, 17, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (112, 12, 2, 17, 20, 19, 18, 19) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (113, 12, 3, 18, 12, 12, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (114, 12, 4, 19, 13, 14, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (115, 12, 5, 20, 14, 16, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (116, 12, 6, 12, 15, 18, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (117, 12, 7, 13, 16, 20, 15, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (118, 12, 8, 14, 17, 13, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (119, 12, 9, 15, 18, 15, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (120, 12, 10, 16, 19, 17, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (121, 13, 1, 17, 12, 18, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (122, 13, 2, 18, 13, 20, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (123, 13, 3, 19, 14, 13, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (124, 13, 4, 20, 15, 15, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (125, 13, 5, 12, 16, 17, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (126, 13, 6, 13, 17, 19, 15, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (127, 13, 7, 14, 18, 12, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (128, 13, 8, 15, 19, 14, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (129, 13, 9, 16, 20, 16, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (130, 13, 10, 17, 12, 18, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (131, 14, 1, 18, 14, 19, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (132, 14, 2, 19, 15, 12, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (133, 14, 3, 20, 16, 14, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (134, 14, 4, 12, 17, 16, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (135, 14, 5, 13, 18, 18, 15, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (136, 14, 6, 14, 19, 20, 18, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (137, 14, 7, 15, 20, 13, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (138, 14, 8, 16, 12, 15, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (139, 14, 9, 17, 13, 17, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (140, 14, 10, 18, 14, 19, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (141, 15, 1, 19, 16, 20, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (142, 15, 2, 20, 17, 13, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (143, 15, 3, 12, 18, 15, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (144, 15, 4, 13, 19, 17, 15, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (145, 15, 5, 14, 20, 19, 18, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (146, 15, 6, 15, 12, 12, 12, 13) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (147, 15, 7, 16, 13, 14, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (148, 15, 8, 17, 14, 16, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (149, 15, 9, 18, 15, 18, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (150, 15, 10, 19, 16, 20, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (151, 16, 1, 20, 18, 12, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (152, 16, 2, 12, 19, 14, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (153, 16, 3, 13, 20, 16, 15, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (154, 16, 4, 14, 12, 18, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (155, 16, 5, 15, 13, 20, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (156, 16, 6, 16, 14, 13, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (157, 16, 7, 17, 15, 15, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (158, 16, 8, 18, 16, 17, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (159, 16, 9, 19, 17, 19, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (160, 16, 10, 20, 18, 12, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (161, 17, 1, 12, 20, 13, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (162, 17, 2, 13, 12, 15, 15, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (163, 17, 3, 14, 13, 17, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (164, 17, 4, 15, 14, 19, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (165, 17, 5, 16, 15, 12, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (166, 17, 6, 17, 16, 14, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (167, 17, 7, 18, 17, 16, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (168, 17, 8, 19, 18, 18, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (169, 17, 9, 20, 19, 20, 18, 19) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (170, 17, 10, 12, 20, 13, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (171, 18, 1, 13, 13, 14, 15, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (172, 18, 2, 14, 14, 16, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (173, 18, 3, 15, 15, 18, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (174, 18, 4, 16, 16, 20, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (175, 18, 5, 17, 17, 13, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (176, 18, 6, 18, 18, 15, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (177, 18, 7, 19, 19, 17, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (178, 18, 8, 20, 20, 19, 18, 19) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (179, 18, 9, 12, 12, 12, 12, 12) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (180, 18, 10, 13, 13, 14, 15, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (181, 19, 1, 14, 15, 15, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (182, 19, 2, 15, 16, 17, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (183, 19, 3, 16, 17, 19, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (184, 19, 4, 17, 18, 12, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (185, 19, 5, 18, 19, 14, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (186, 19, 6, 19, 20, 16, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (187, 19, 7, 20, 12, 18, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (188, 19, 8, 12, 13, 20, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (189, 19, 9, 13, 14, 13, 15, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (190, 19, 10, 14, 15, 15, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (191, 20, 1, 15, 17, 16, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (192, 20, 2, 16, 18, 18, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (193, 20, 3, 17, 19, 20, 18, 19) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (194, 20, 4, 18, 20, 13, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (195, 20, 5, 19, 12, 15, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (196, 20, 6, 20, 13, 17, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (197, 20, 7, 12, 14, 19, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (198, 20, 8, 13, 15, 12, 15, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (199, 20, 9, 14, 16, 14, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (200, 20, 10, 15, 17, 16, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (201, 21, 1, 16, 19, 17, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (202, 21, 2, 17, 20, 19, 18, 19) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (203, 21, 3, 18, 12, 12, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (204, 21, 4, 19, 13, 14, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (205, 21, 5, 20, 14, 16, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (206, 21, 6, 12, 15, 18, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (207, 21, 7, 13, 16, 20, 15, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (208, 21, 8, 14, 17, 13, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (209, 21, 9, 15, 18, 15, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (210, 21, 10, 16, 19, 17, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (211, 22, 1, 17, 12, 18, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (212, 22, 2, 18, 13, 20, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (213, 22, 3, 19, 14, 13, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (214, 22, 4, 20, 15, 15, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (215, 22, 5, 12, 16, 17, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (216, 22, 6, 13, 17, 19, 15, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (217, 22, 7, 14, 18, 12, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (218, 22, 8, 15, 19, 14, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (219, 22, 9, 16, 20, 16, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (220, 22, 10, 17, 12, 18, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (221, 23, 1, 18, 14, 19, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (222, 23, 2, 19, 15, 12, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (223, 23, 3, 20, 16, 14, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (224, 23, 4, 12, 17, 16, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (225, 23, 5, 13, 18, 18, 15, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (226, 23, 6, 14, 19, 20, 18, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (227, 23, 7, 15, 20, 13, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (228, 23, 8, 16, 12, 15, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (229, 23, 9, 17, 13, 17, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (230, 23, 10, 18, 14, 19, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (231, 24, 1, 19, 16, 20, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (232, 24, 2, 20, 17, 13, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (233, 24, 3, 12, 18, 15, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (234, 24, 4, 13, 19, 17, 15, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (235, 24, 5, 14, 20, 19, 18, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (236, 24, 6, 15, 12, 12, 12, 13) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (237, 24, 7, 16, 13, 14, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (238, 24, 8, 17, 14, 16, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (239, 24, 9, 18, 15, 18, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (240, 24, 10, 19, 16, 20, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (241, 25, 1, 20, 18, 12, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (242, 25, 2, 12, 19, 14, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (243, 25, 3, 13, 20, 16, 15, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (244, 25, 4, 14, 12, 18, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (245, 25, 5, 15, 13, 20, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (246, 25, 6, 16, 14, 13, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (247, 25, 7, 17, 15, 15, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (248, 25, 8, 18, 16, 17, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (249, 25, 9, 19, 17, 19, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (250, 25, 10, 20, 18, 12, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (251, 26, 1, 12, 20, 13, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (252, 26, 2, 13, 12, 15, 15, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (253, 26, 3, 14, 13, 17, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (254, 26, 4, 15, 14, 19, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (255, 26, 5, 16, 15, 12, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (256, 26, 6, 17, 16, 14, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (257, 26, 7, 18, 17, 16, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (258, 26, 8, 19, 18, 18, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (259, 26, 9, 20, 19, 20, 18, 19) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (260, 26, 10, 12, 20, 13, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (261, 27, 1, 13, 13, 14, 15, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (262, 27, 2, 14, 14, 16, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (263, 27, 3, 15, 15, 18, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (264, 27, 4, 16, 16, 20, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (265, 27, 5, 17, 17, 13, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (266, 27, 6, 18, 18, 15, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (267, 27, 7, 19, 19, 17, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (268, 27, 8, 20, 20, 19, 18, 19) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (269, 27, 9, 12, 12, 12, 12, 12) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (270, 27, 10, 13, 13, 14, 15, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (271, 28, 1, 14, 15, 15, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (272, 28, 2, 15, 16, 17, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (273, 28, 3, 16, 17, 19, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (274, 28, 4, 17, 18, 12, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (275, 28, 5, 18, 19, 14, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (276, 28, 6, 19, 20, 16, 15, 18) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (277, 28, 7, 20, 12, 18, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (278, 28, 8, 12, 13, 20, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (279, 28, 9, 13, 14, 13, 15, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (280, 28, 10, 14, 15, 15, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (281, 29, 1, 15, 17, 16, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (282, 29, 2, 16, 18, 18, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (283, 29, 3, 17, 19, 20, 18, 19) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (284, 29, 4, 18, 20, 13, 12, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (285, 29, 5, 19, 12, 15, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (286, 29, 6, 20, 13, 17, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (287, 29, 7, 12, 14, 19, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (288, 29, 8, 13, 15, 12, 15, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (289, 29, 9, 14, 16, 14, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (290, 29, 10, 15, 17, 16, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (291, 30, 1, 16, 19, 17, 15, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (292, 30, 2, 17, 20, 19, 18, 19) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (293, 30, 3, 18, 12, 12, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (294, 30, 4, 19, 13, 14, 15, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (295, 30, 5, 20, 14, 16, 18, 17) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (296, 30, 6, 12, 15, 18, 12, 14) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (297, 30, 7, 13, 16, 20, 15, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (298, 30, 8, 14, 17, 13, 18, 16) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (299, 30, 9, 15, 18, 15, 12, 15) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.notas (id, alumno_id, curso_id, bimestre_1, bimestre_2, bimestre_3, bimestre_4, promedio_final) VALUES (300, 30, 10, 16, 19, 17, 15, 17) ON CONFLICT (id) DO NOTHING;
SELECT setval('public.notas_id_seq', (SELECT MAX(id) FROM public.notas));

-- Seed sample Tramites
INSERT INTO public.tramites (id, alumno_id, tipo, fecha_solicitud, estado) VALUES (1, 3, 'Constancia de Estudios', '2026-06-20', 'Aprobado') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.tramites (id, alumno_id, tipo, fecha_solicitud, estado) VALUES (2, 3, 'Certificado de Notas', '2026-06-25', 'Pendiente') ON CONFLICT (id) DO NOTHING;
SELECT setval('public.tramites_id_seq', (SELECT MAX(id) FROM public.tramites));

-- Seed sample Finanzas
INSERT INTO public.finanzas (id, alumno_id, concepto, monto, estado, vencimiento) VALUES (1, 3, 'Matrícula 2026', 350.00, 'Pagado', '2026-02-15') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.finanzas (id, alumno_id, concepto, monto, estado, vencimiento) VALUES (2, 3, 'Pensión Marzo', 450.00, 'Pagado', '2026-03-05') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.finanzas (id, alumno_id, concepto, monto, estado, vencimiento) VALUES (3, 3, 'Pensión Abril', 450.00, 'Pendiente', '2026-04-05') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.finanzas (id, alumno_id, concepto, monto, estado, vencimiento) VALUES (4, 3, 'Pensión Mayo', 450.00, 'Por Vencer', '2026-05-05') ON CONFLICT (id) DO NOTHING;
SELECT setval('public.finanzas_id_seq', (SELECT MAX(id) FROM public.finanzas));

-- Seed sample Materiales de clase
INSERT INTO public.materiales_clase (id, curso_id, docente_id, titulo, descripcion, tipo, size, fecha_subida) VALUES (1, 1, 1, 'Semana 1: Introducción al curso', 'Guía introductoria de matemática', 'PDF', '2.4 MB', '2026-06-25 10:00:00') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.materiales_clase (id, curso_id, docente_id, titulo, descripcion, tipo, size, fecha_subida) VALUES (2, 1, 1, 'Diapositivas de la Unidad 1', 'Presentación de álgebra básica', 'PPTX', '5.1 MB', '2026-06-26 14:30:00') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.materiales_clase (id, curso_id, docente_id, titulo, descripcion, tipo, size, fecha_subida) VALUES (3, 1, 1, 'Guía de Ejercicios Prácticos', 'Ejercicios de ecuaciones de primer grado', 'DOCX', '1.2 MB', '2026-06-27 09:15:00') ON CONFLICT (id) DO NOTHING;
SELECT setval('public.materiales_clase_id_seq', (SELECT MAX(id) FROM public.materiales_clase));

-- Seed sample Tareas
INSERT INTO public.tareas (id, curso_id, docente_id, titulo, descripcion, fecha_limite, fecha_creacion) VALUES (1, 1, 1, 'Práctica Calificada 1', 'Resolver la lista de ejercicios de ecuaciones', '2026-07-01 23:59:59', '2026-06-28 08:00:00') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.tareas (id, curso_id, docente_id, titulo, descripcion, fecha_limite, fecha_creacion) VALUES (2, 1, 1, 'Trabajo de Investigación', 'Investigar sobre la historia del álgebra', '2026-06-20 23:59:59', '2026-06-10 08:00:00') ON CONFLICT (id) DO NOTHING;
SELECT setval('public.tareas_id_seq', (SELECT MAX(id) FROM public.tareas));

-- Seed sample Tareas Entregadas
INSERT INTO public.tareas_entregadas (id, tarea_id, alumno_id, archivo_nombre, fecha_entrega, nota, comentario, estado) VALUES (1, 2, 3, 'trabajo_investigacion_mateo.pdf', '2026-06-19 18:30:00', 17.00, 'Buen trabajo', 'Calificado') ON CONFLICT (id) DO NOTHING;
SELECT setval('public.tareas_entregadas_id_seq', (SELECT MAX(id) FROM public.tareas_entregadas));

-- 12. AUTO-GENERATE AUTH.USERS FOR CURRENT DATA
-- This block automatically creates auth users in Supabase for all seeded alumnos and docentes
-- so they can log in immediately using their DNI as part of their email (e.g. DNI@colegio.edu.pe)
-- and their default password '1234'.
DO $$
DECLARE
    r_alumno RECORD;
    r_docente RECORD;
    new_user_id UUID;
BEGIN
    -- Create auth users for alumnos
    FOR r_alumno IN SELECT id, dni, nombre, apellido FROM public.alumnos WHERE user_id IS NULL LOOP
        SELECT id INTO new_user_id FROM auth.users WHERE email = r_alumno.dni || '@colegio.edu.pe';
        
        IF new_user_id IS NULL THEN
            new_user_id := gen_random_uuid();
            
            INSERT INTO auth.users (
                id,
                instance_id,
                aud,
                role,
                email,
                encrypted_password,
                email_confirmed_at,
                raw_app_meta_data,
                raw_user_meta_data,
                is_super_admin,
                created_at,
                updated_at
            ) VALUES (
                new_user_id,
                '00000000-0000-0000-0000-000000000000',
                'authenticated',
                'authenticated',
                r_alumno.dni || '@colegio.edu.pe',
                crypt('1234', gen_salt('bf')),
                now(),
                jsonb_build_object('provider', 'email', 'providers', array['email']),
                jsonb_build_object('role', 'alumno', 'nombre', r_alumno.nombre, 'apellido', r_alumno.apellido, 'profile_id', r_alumno.id),
                false,
                now(),
                now()
            );
            
            INSERT INTO auth.identities (
                id,
                user_id,
                identity_data,
                provider,
                last_sign_in_at,
                created_at,
                updated_at,
                provider_id
            ) VALUES (
                new_user_id,
                new_user_id,
                jsonb_build_object('sub', new_user_id::text, 'email', r_alumno.dni || '@colegio.edu.pe'),
                'email',
                now(),
                now(),
                now(),
                r_alumno.dni || '@colegio.edu.pe'
            );
        END IF;
        
        UPDATE public.alumnos SET user_id = new_user_id WHERE id = r_alumno.id;
    END LOOP;

    -- Create auth users for docentes
    FOR r_docente IN SELECT id, dni, nombre, apellido FROM public.docentes WHERE user_id IS NULL LOOP
        SELECT id INTO new_user_id FROM auth.users WHERE email = r_docente.dni || '@colegio.edu.pe';
        
        IF new_user_id IS NULL THEN
            new_user_id := gen_random_uuid();
            
            INSERT INTO auth.users (
                id,
                instance_id,
                aud,
                role,
                email,
                encrypted_password,
                email_confirmed_at,
                raw_app_meta_data,
                raw_user_meta_data,
                is_super_admin,
                created_at,
                updated_at
            ) VALUES (
                new_user_id,
                '00000000-0000-0000-0000-000000000000',
                'authenticated',
                'authenticated',
                r_docente.dni || '@colegio.edu.pe',
                crypt('1234', gen_salt('bf')),
                now(),
                jsonb_build_object('provider', 'email', 'providers', array['email']),
                jsonb_build_object('role', 'docente', 'nombre', r_docente.nombre, 'apellido', r_docente.apellido, 'profile_id', r_docente.id),
                false,
                now(),
                now()
            );
            
            INSERT INTO auth.identities (
                id,
                user_id,
                identity_data,
                provider,
                last_sign_in_at,
                created_at,
                updated_at,
                provider_id
            ) VALUES (
                new_user_id,
                new_user_id,
                jsonb_build_object('sub', new_user_id::text, 'email', r_docente.dni || '@colegio.edu.pe'),
                'email',
                now(),
                now(),
                now(),
                r_docente.dni || '@colegio.edu.pe'
            );
        END IF;
        
        UPDATE public.docentes SET user_id = new_user_id WHERE id = r_docente.id;
    END LOOP;
END $$;
