export const SAN_ALFONSO_DB = {
  // 1. AULAS (1ro a 5to con secciones A, B, C, D)
  aulas: [
    { id: 1, grado: '1ro Secundaria', seccion: 'A', turno: 'Mañana' },
    { id: 2, grado: '1ro Secundaria', seccion: 'B', turno: 'Mañana' },
    { id: 3, grado: '1ro Secundaria', seccion: 'C', turno: 'Mañana' },
    { id: 4, grado: '1ro Secundaria', seccion: 'D', turno: 'Mañana' },
    { id: 5, grado: '2do Secundaria', seccion: 'A', turno: 'Mañana' },
    { id: 6, grado: '2do Secundaria', seccion: 'B', turno: 'Mañana' },
    { id: 7, grado: '2do Secundaria', seccion: 'C', turno: 'Mañana' },
    { id: 8, grado: '2do Secundaria', seccion: 'D', turno: 'Mañana' },
    { id: 9, grado: '3ro Secundaria', seccion: 'A', turno: 'Mañana' },
    { id: 10, grado: '3ro Secundaria', seccion: 'B', turno: 'Mañana' },
    { id: 11, grado: '3ro Secundaria', seccion: 'C', turno: 'Mañana' },
    { id: 12, grado: '3ro Secundaria', seccion: 'D', turno: 'Mañana' },
    { id: 13, grado: '4to Secundaria', seccion: 'A', turno: 'Mañana' },
    { id: 14, grado: '4to Secundaria', seccion: 'B', turno: 'Mañana' },
    { id: 15, grado: '4to Secundaria', seccion: 'C', turno: 'Mañana' },
    { id: 16, grado: '4to Secundaria', seccion: 'D', turno: 'Mañana' },
    { id: 17, grado: '5to Secundaria', seccion: 'A', turno: 'Mañana' },
    { id: 18, grado: '5to Secundaria', seccion: 'B', turno: 'Mañana' },
    { id: 19, grado: '5to Secundaria', seccion: 'C', turno: 'Mañana' },
    { id: 20, grado: '5to Secundaria', seccion: 'D', turno: 'Mañana' }
  ],

  // 2. CURSOS (Catálogo general. Todas las aulas llevan estos cursos)
  cursos: [
    { id: 1, nombre: 'Matemática', horasSemanales: 6 },
    { id: 2, nombre: 'Comunicación', horasSemanales: 6 },
    { id: 3, nombre: 'CIT (Ciencia y Tecnología)', horasSemanales: 4 },
    { id: 4, nombre: 'Arte', horasSemanales: 2 },
    { id: 5, nombre: 'Educación Física', horasSemanales: 2 },
    { id: 6, nombre: 'Religión', horasSemanales: 2 },
    { id: 7, nombre: 'Humanidades', horasSemanales: 4 },
    { id: 8, nombre: 'Educación para el Trabajo', horasSemanales: 3 },
    { id: 9, nombre: 'Inglés', horasSemanales: 4 },            // <-- Curso nuevo
    { id: 10, nombre: 'Historia y Geografía', horasSemanales: 4 } // <-- Curso nuevo
  ],

  // 3. DOCENTES (Añadidos docentes para los nuevos cursos)
  docentes: [
    { id: 1, nombre: 'Carlos', apellido: 'Mendoza', dni: '10293847', especialidad_curso_id: 1 },
    { id: 2, nombre: 'Ana', apellido: 'Ramírez', dni: '29384756', especialidad_curso_id: 2 },
    { id: 3, nombre: 'Bertha', apellido: 'Orihuela', dni: '09876543', especialidad_curso_id: 1 },
    { id: 4, nombre: 'Jorge', apellido: 'Salinas', dni: '38475619', especialidad_curso_id: 3 },
    { id: 5, nombre: 'Lucía', apellido: 'Vargas', dni: '47561928', especialidad_curso_id: 4 },
    { id: 6, nombre: 'Miguel', apellido: 'Trauco', dni: '56192837', especialidad_curso_id: 5 },
    { id: 7, nombre: 'Teresa', apellido: 'Campos', dni: '61928374', especialidad_curso_id: 6 },
    { id: 8, nombre: 'Roberto', apellido: 'Gómez', dni: '19283746', especialidad_curso_id: 7 },
    { id: 9, nombre: 'Elena', apellido: 'Rojas', dni: '92837465', especialidad_curso_id: 8 },
    { id: 10, nombre: 'Patricia', apellido: 'Kling', dni: '11223344', especialidad_curso_id: 9 }, // Inglés
    { id: 11, nombre: 'Hugo', apellido: 'Paredes', dni: '55667788', especialidad_curso_id: 10 } // Historia
  ],

  // 4. ALUMNOS (Repartidos en las nuevas secciones)
  alumnos: [
    { id: 1, nombre: 'Mateo', apellido: 'García', dni: '70123456', aula_id: 1 },  // 1ro A
    { id: 2, nombre: 'Valeria', apellido: 'López', dni: '70123457', aula_id: 1 }, // 1ro A
    { id: 3, nombre: 'Diego', apellido: 'Davila', dni: '70123458', aula_id: 2 },  // 1ro B
    { id: 4, nombre: 'Shantall', apellido: 'Gutiérrez', dni: '70123459', aula_id: 2 }, // 1ro B
    { id: 5, nombre: 'David', apellido: 'Torres', dni: '70123460', aula_id: 3 },  // 1ro C
    { id: 6, nombre: 'Camila', apellido: 'Ruiz', dni: '70123461', aula_id: 4 },   // 1ro D
    { id: 7, nombre: 'Sebastián', apellido: 'Castro', dni: '70123462', aula_id: 5 },  // 2do A
    { id: 8, nombre: 'Gabriela', apellido: 'Flores', dni: '70123463', aula_id: 6 },  // 2do B
    { id: 9, nombre: 'Joaquín', apellido: 'Ríos', dni: '70123464', aula_id: 7 },   // 2do C
    { id: 10, nombre: 'Mariana', apellido: 'Vega', dni: '70123465', aula_id: 8 },  // 2do D
    { id: 11, nombre: 'Lucas', apellido: 'Navarro', dni: '70123466', aula_id: 9 },  // 3ro A
    { id: 12, nombre: 'Valentina', apellido: 'Molina', dni: '70123467', aula_id: 9 }, // 3ro A
    { id: 13, nombre: 'Matías', apellido: 'Ortiz', dni: '70123468', aula_id: 10 }, // 3ro B
    { id: 14, nombre: 'Luciana', apellido: 'Silva', dni: '70123469', aula_id: 11 }, // 3ro C
    { id: 15, nombre: 'Nicolás', apellido: 'Reyes', dni: '70123470', aula_id: 12 }, // 3ro D
    { id: 16, nombre: 'Antonella', apellido: 'Morales', dni: '70123471', aula_id: 13 }, // 4to A
    { id: 17, nombre: 'Leonardo', apellido: 'Herrera', dni: '70123472', aula_id: 13 }, // 4to A
    { id: 18, nombre: 'Isabella', apellido: 'Medina', dni: '70123473', aula_id: 14 }, // 4to B
    { id: 19, nombre: 'Gabriel', apellido: 'Aguilar', dni: '70123474', aula_id: 15 }, // 4to C
    { id: 20, nombre: 'Daniela', apellido: 'Paz', dni: '70123475', aula_id: 16 }, // 4to D
    { id: 21, nombre: 'Rodrigo', apellido: 'Guzmán', dni: '70123476', aula_id: 17 }, // 5to A
    { id: 22, nombre: 'Renata', apellido: 'Salazar', dni: '70123477', aula_id: 17 }, // 5to A
    { id: 23, nombre: 'Emilio', apellido: 'Cordero', dni: '70123478', aula_id: 18 }, // 5to B
    { id: 24, nombre: 'Paula', apellido: 'Cabrera', dni: '70123479', aula_id: 18 }, // 5to B
    { id: 25, nombre: 'Alejandro', apellido: 'Bustamante', dni: '70123480', aula_id: 19 }, // 5to C
    { id: 26, nombre: 'Sofía', apellido: 'Paredes', dni: '70123481', aula_id: 19 }, // 5to C
    { id: 27, nombre: 'Marcos', apellido: 'León', dni: '70123482', aula_id: 20 }, // 5to D
    { id: 28, nombre: 'Romina', apellido: 'Espinoza', dni: '70123483', aula_id: 20 }, // 5to D
    { id: 29, nombre: 'Andrés', apellido: 'Carrillo', dni: '70123484', aula_id: 20 }, // 5to D
    { id: 30, nombre: 'Jimena', apellido: 'Cáceres', dni: '70123485', aula_id: 20 }  // 5to D
  ],
  horarios: [
    {
      "id": 1,
      "aula_id": 1,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 2,
      "aula_id": 1,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 3,
      "aula_id": 1,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 4,
      "aula_id": 1,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 5,
      "aula_id": 1,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 6,
      "aula_id": 1,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 7,
      "aula_id": 1,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 8,
      "aula_id": 1,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 9,
      "aula_id": 1,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 10,
      "aula_id": 1,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 11,
      "aula_id": 1,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 12,
      "aula_id": 1,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 13,
      "aula_id": 1,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 14,
      "aula_id": 1,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 15,
      "aula_id": 1,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 16,
      "aula_id": 1,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 17,
      "aula_id": 1,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 18,
      "aula_id": 1,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 19,
      "aula_id": 1,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 20,
      "aula_id": 1,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 21,
      "aula_id": 1,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 22,
      "aula_id": 1,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 23,
      "aula_id": 1,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 24,
      "aula_id": 1,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 25,
      "aula_id": 1,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 26,
      "aula_id": 1,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 27,
      "aula_id": 1,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 28,
      "aula_id": 1,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 29,
      "aula_id": 1,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 30,
      "aula_id": 1,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 31,
      "aula_id": 1,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 32,
      "aula_id": 1,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 33,
      "aula_id": 1,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 34,
      "aula_id": 1,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 35,
      "aula_id": 1,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 36,
      "aula_id": 2,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 37,
      "aula_id": 2,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 38,
      "aula_id": 2,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 39,
      "aula_id": 2,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 40,
      "aula_id": 2,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 41,
      "aula_id": 2,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 42,
      "aula_id": 2,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 43,
      "aula_id": 2,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 44,
      "aula_id": 2,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 45,
      "aula_id": 2,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 46,
      "aula_id": 2,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 47,
      "aula_id": 2,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 48,
      "aula_id": 2,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 49,
      "aula_id": 2,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 50,
      "aula_id": 2,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 51,
      "aula_id": 2,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 52,
      "aula_id": 2,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 53,
      "aula_id": 2,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 54,
      "aula_id": 2,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 55,
      "aula_id": 2,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 56,
      "aula_id": 2,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 57,
      "aula_id": 2,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 58,
      "aula_id": 2,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 59,
      "aula_id": 2,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 60,
      "aula_id": 2,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 61,
      "aula_id": 2,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 62,
      "aula_id": 2,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 63,
      "aula_id": 2,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 64,
      "aula_id": 2,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 65,
      "aula_id": 2,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 66,
      "aula_id": 2,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 67,
      "aula_id": 2,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 68,
      "aula_id": 2,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 69,
      "aula_id": 2,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 70,
      "aula_id": 2,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 71,
      "aula_id": 3,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 72,
      "aula_id": 3,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 73,
      "aula_id": 3,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 74,
      "aula_id": 3,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 75,
      "aula_id": 3,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 76,
      "aula_id": 3,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 77,
      "aula_id": 3,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 78,
      "aula_id": 3,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 79,
      "aula_id": 3,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 80,
      "aula_id": 3,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 81,
      "aula_id": 3,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 82,
      "aula_id": 3,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 83,
      "aula_id": 3,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 84,
      "aula_id": 3,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 85,
      "aula_id": 3,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 86,
      "aula_id": 3,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 87,
      "aula_id": 3,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 88,
      "aula_id": 3,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 89,
      "aula_id": 3,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 90,
      "aula_id": 3,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 91,
      "aula_id": 3,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 92,
      "aula_id": 3,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 93,
      "aula_id": 3,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 94,
      "aula_id": 3,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 95,
      "aula_id": 3,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 96,
      "aula_id": 3,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 97,
      "aula_id": 3,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 98,
      "aula_id": 3,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 99,
      "aula_id": 3,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 100,
      "aula_id": 3,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 101,
      "aula_id": 3,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 102,
      "aula_id": 3,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 103,
      "aula_id": 3,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 104,
      "aula_id": 3,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 105,
      "aula_id": 3,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 106,
      "aula_id": 4,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 107,
      "aula_id": 4,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 108,
      "aula_id": 4,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 109,
      "aula_id": 4,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 110,
      "aula_id": 4,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 111,
      "aula_id": 4,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 112,
      "aula_id": 4,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 113,
      "aula_id": 4,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 114,
      "aula_id": 4,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 115,
      "aula_id": 4,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 116,
      "aula_id": 4,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 117,
      "aula_id": 4,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 118,
      "aula_id": 4,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 119,
      "aula_id": 4,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 120,
      "aula_id": 4,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 121,
      "aula_id": 4,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 122,
      "aula_id": 4,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 123,
      "aula_id": 4,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 124,
      "aula_id": 4,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 125,
      "aula_id": 4,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 126,
      "aula_id": 4,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 127,
      "aula_id": 4,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 128,
      "aula_id": 4,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 129,
      "aula_id": 4,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 130,
      "aula_id": 4,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 131,
      "aula_id": 4,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 132,
      "aula_id": 4,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 133,
      "aula_id": 4,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 134,
      "aula_id": 4,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 135,
      "aula_id": 4,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 136,
      "aula_id": 4,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 137,
      "aula_id": 4,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 138,
      "aula_id": 4,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 139,
      "aula_id": 4,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 140,
      "aula_id": 4,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 141,
      "aula_id": 5,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 142,
      "aula_id": 5,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 143,
      "aula_id": 5,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 144,
      "aula_id": 5,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 145,
      "aula_id": 5,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 146,
      "aula_id": 5,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 147,
      "aula_id": 5,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 148,
      "aula_id": 5,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 149,
      "aula_id": 5,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 150,
      "aula_id": 5,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 151,
      "aula_id": 5,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 152,
      "aula_id": 5,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 153,
      "aula_id": 5,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 154,
      "aula_id": 5,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 155,
      "aula_id": 5,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 156,
      "aula_id": 5,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 157,
      "aula_id": 5,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 158,
      "aula_id": 5,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 159,
      "aula_id": 5,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 160,
      "aula_id": 5,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 161,
      "aula_id": 5,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 162,
      "aula_id": 5,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 163,
      "aula_id": 5,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 164,
      "aula_id": 5,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 165,
      "aula_id": 5,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 166,
      "aula_id": 5,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 167,
      "aula_id": 5,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 168,
      "aula_id": 5,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 169,
      "aula_id": 5,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 170,
      "aula_id": 5,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 171,
      "aula_id": 5,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 172,
      "aula_id": 5,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 173,
      "aula_id": 5,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 174,
      "aula_id": 5,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 175,
      "aula_id": 5,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 176,
      "aula_id": 6,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 177,
      "aula_id": 6,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 178,
      "aula_id": 6,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 179,
      "aula_id": 6,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 180,
      "aula_id": 6,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 181,
      "aula_id": 6,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 182,
      "aula_id": 6,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 183,
      "aula_id": 6,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 184,
      "aula_id": 6,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 185,
      "aula_id": 6,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 186,
      "aula_id": 6,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 187,
      "aula_id": 6,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 188,
      "aula_id": 6,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 189,
      "aula_id": 6,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 190,
      "aula_id": 6,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 191,
      "aula_id": 6,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 192,
      "aula_id": 6,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 193,
      "aula_id": 6,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 194,
      "aula_id": 6,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 195,
      "aula_id": 6,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 196,
      "aula_id": 6,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 197,
      "aula_id": 6,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 198,
      "aula_id": 6,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 199,
      "aula_id": 6,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 200,
      "aula_id": 6,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 201,
      "aula_id": 6,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 202,
      "aula_id": 6,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 203,
      "aula_id": 6,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 204,
      "aula_id": 6,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 205,
      "aula_id": 6,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 206,
      "aula_id": 6,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 207,
      "aula_id": 6,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 208,
      "aula_id": 6,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 209,
      "aula_id": 6,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 210,
      "aula_id": 6,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 211,
      "aula_id": 7,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 212,
      "aula_id": 7,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 213,
      "aula_id": 7,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 214,
      "aula_id": 7,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 215,
      "aula_id": 7,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 216,
      "aula_id": 7,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 217,
      "aula_id": 7,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 218,
      "aula_id": 7,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 219,
      "aula_id": 7,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 220,
      "aula_id": 7,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 221,
      "aula_id": 7,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 222,
      "aula_id": 7,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 223,
      "aula_id": 7,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 224,
      "aula_id": 7,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 225,
      "aula_id": 7,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 226,
      "aula_id": 7,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 227,
      "aula_id": 7,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 228,
      "aula_id": 7,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 229,
      "aula_id": 7,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 230,
      "aula_id": 7,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 231,
      "aula_id": 7,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 232,
      "aula_id": 7,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 233,
      "aula_id": 7,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 234,
      "aula_id": 7,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 235,
      "aula_id": 7,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 236,
      "aula_id": 7,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 237,
      "aula_id": 7,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 238,
      "aula_id": 7,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 239,
      "aula_id": 7,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 240,
      "aula_id": 7,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 241,
      "aula_id": 7,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 242,
      "aula_id": 7,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 243,
      "aula_id": 7,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 244,
      "aula_id": 7,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 245,
      "aula_id": 7,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 246,
      "aula_id": 8,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 247,
      "aula_id": 8,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 248,
      "aula_id": 8,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 249,
      "aula_id": 8,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 250,
      "aula_id": 8,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 251,
      "aula_id": 8,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 252,
      "aula_id": 8,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 253,
      "aula_id": 8,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 254,
      "aula_id": 8,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 255,
      "aula_id": 8,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 256,
      "aula_id": 8,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 257,
      "aula_id": 8,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 258,
      "aula_id": 8,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 259,
      "aula_id": 8,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 260,
      "aula_id": 8,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 261,
      "aula_id": 8,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 262,
      "aula_id": 8,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 263,
      "aula_id": 8,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 264,
      "aula_id": 8,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 265,
      "aula_id": 8,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 266,
      "aula_id": 8,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 267,
      "aula_id": 8,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 268,
      "aula_id": 8,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 269,
      "aula_id": 8,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 270,
      "aula_id": 8,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 271,
      "aula_id": 8,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 272,
      "aula_id": 8,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 273,
      "aula_id": 8,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 274,
      "aula_id": 8,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 275,
      "aula_id": 8,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 276,
      "aula_id": 8,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 277,
      "aula_id": 8,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 278,
      "aula_id": 8,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 279,
      "aula_id": 8,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 280,
      "aula_id": 8,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 281,
      "aula_id": 9,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 282,
      "aula_id": 9,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 283,
      "aula_id": 9,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 284,
      "aula_id": 9,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 285,
      "aula_id": 9,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 286,
      "aula_id": 9,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 287,
      "aula_id": 9,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 288,
      "aula_id": 9,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 289,
      "aula_id": 9,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 290,
      "aula_id": 9,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 291,
      "aula_id": 9,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 292,
      "aula_id": 9,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 293,
      "aula_id": 9,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 294,
      "aula_id": 9,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 295,
      "aula_id": 9,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 296,
      "aula_id": 9,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 297,
      "aula_id": 9,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 298,
      "aula_id": 9,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 299,
      "aula_id": 9,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 300,
      "aula_id": 9,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 301,
      "aula_id": 9,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 302,
      "aula_id": 9,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 303,
      "aula_id": 9,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 304,
      "aula_id": 9,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 305,
      "aula_id": 9,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 306,
      "aula_id": 9,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 307,
      "aula_id": 9,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 308,
      "aula_id": 9,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 309,
      "aula_id": 9,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 310,
      "aula_id": 9,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 311,
      "aula_id": 9,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 312,
      "aula_id": 9,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 313,
      "aula_id": 9,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 314,
      "aula_id": 9,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 315,
      "aula_id": 9,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 316,
      "aula_id": 10,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 317,
      "aula_id": 10,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 318,
      "aula_id": 10,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 319,
      "aula_id": 10,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 320,
      "aula_id": 10,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 321,
      "aula_id": 10,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 322,
      "aula_id": 10,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 323,
      "aula_id": 10,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 324,
      "aula_id": 10,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 325,
      "aula_id": 10,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 326,
      "aula_id": 10,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 327,
      "aula_id": 10,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 328,
      "aula_id": 10,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 329,
      "aula_id": 10,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 330,
      "aula_id": 10,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 331,
      "aula_id": 10,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 332,
      "aula_id": 10,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 333,
      "aula_id": 10,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 334,
      "aula_id": 10,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 335,
      "aula_id": 10,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 336,
      "aula_id": 10,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 337,
      "aula_id": 10,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 338,
      "aula_id": 10,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 339,
      "aula_id": 10,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 340,
      "aula_id": 10,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 341,
      "aula_id": 10,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 342,
      "aula_id": 10,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 343,
      "aula_id": 10,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 344,
      "aula_id": 10,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 345,
      "aula_id": 10,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 346,
      "aula_id": 10,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 347,
      "aula_id": 10,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 348,
      "aula_id": 10,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 349,
      "aula_id": 10,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 350,
      "aula_id": 10,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 351,
      "aula_id": 11,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 352,
      "aula_id": 11,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 353,
      "aula_id": 11,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 354,
      "aula_id": 11,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 355,
      "aula_id": 11,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 356,
      "aula_id": 11,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 357,
      "aula_id": 11,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 358,
      "aula_id": 11,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 359,
      "aula_id": 11,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 360,
      "aula_id": 11,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 361,
      "aula_id": 11,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 362,
      "aula_id": 11,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 363,
      "aula_id": 11,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 364,
      "aula_id": 11,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 365,
      "aula_id": 11,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 366,
      "aula_id": 11,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 367,
      "aula_id": 11,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 368,
      "aula_id": 11,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 369,
      "aula_id": 11,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 370,
      "aula_id": 11,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 371,
      "aula_id": 11,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 372,
      "aula_id": 11,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 373,
      "aula_id": 11,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 374,
      "aula_id": 11,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 375,
      "aula_id": 11,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 376,
      "aula_id": 11,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 377,
      "aula_id": 11,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 378,
      "aula_id": 11,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 379,
      "aula_id": 11,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 380,
      "aula_id": 11,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 381,
      "aula_id": 11,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 382,
      "aula_id": 11,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 383,
      "aula_id": 11,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 384,
      "aula_id": 11,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 385,
      "aula_id": 11,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 386,
      "aula_id": 12,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 387,
      "aula_id": 12,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 388,
      "aula_id": 12,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 389,
      "aula_id": 12,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 390,
      "aula_id": 12,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 391,
      "aula_id": 12,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 392,
      "aula_id": 12,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 393,
      "aula_id": 12,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 394,
      "aula_id": 12,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 395,
      "aula_id": 12,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 396,
      "aula_id": 12,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 397,
      "aula_id": 12,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 398,
      "aula_id": 12,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 399,
      "aula_id": 12,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 400,
      "aula_id": 12,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 401,
      "aula_id": 12,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 402,
      "aula_id": 12,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 403,
      "aula_id": 12,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 404,
      "aula_id": 12,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 405,
      "aula_id": 12,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 406,
      "aula_id": 12,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 407,
      "aula_id": 12,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 408,
      "aula_id": 12,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 409,
      "aula_id": 12,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 410,
      "aula_id": 12,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 411,
      "aula_id": 12,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 412,
      "aula_id": 12,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 413,
      "aula_id": 12,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 414,
      "aula_id": 12,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 415,
      "aula_id": 12,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 416,
      "aula_id": 12,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 417,
      "aula_id": 12,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 418,
      "aula_id": 12,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 419,
      "aula_id": 12,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 420,
      "aula_id": 12,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 421,
      "aula_id": 13,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 422,
      "aula_id": 13,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 423,
      "aula_id": 13,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 424,
      "aula_id": 13,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 425,
      "aula_id": 13,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 426,
      "aula_id": 13,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 427,
      "aula_id": 13,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 428,
      "aula_id": 13,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 429,
      "aula_id": 13,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 430,
      "aula_id": 13,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 431,
      "aula_id": 13,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 432,
      "aula_id": 13,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 433,
      "aula_id": 13,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 434,
      "aula_id": 13,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 435,
      "aula_id": 13,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 436,
      "aula_id": 13,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 437,
      "aula_id": 13,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 438,
      "aula_id": 13,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 439,
      "aula_id": 13,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 440,
      "aula_id": 13,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 441,
      "aula_id": 13,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 442,
      "aula_id": 13,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 443,
      "aula_id": 13,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 444,
      "aula_id": 13,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 445,
      "aula_id": 13,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 446,
      "aula_id": 13,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 447,
      "aula_id": 13,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 448,
      "aula_id": 13,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 449,
      "aula_id": 13,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 450,
      "aula_id": 13,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 451,
      "aula_id": 13,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 452,
      "aula_id": 13,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 453,
      "aula_id": 13,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 454,
      "aula_id": 13,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 455,
      "aula_id": 13,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 456,
      "aula_id": 14,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 457,
      "aula_id": 14,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 458,
      "aula_id": 14,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 459,
      "aula_id": 14,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 460,
      "aula_id": 14,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 461,
      "aula_id": 14,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 462,
      "aula_id": 14,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 463,
      "aula_id": 14,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 464,
      "aula_id": 14,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 465,
      "aula_id": 14,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 466,
      "aula_id": 14,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 467,
      "aula_id": 14,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 468,
      "aula_id": 14,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 469,
      "aula_id": 14,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 470,
      "aula_id": 14,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 471,
      "aula_id": 14,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 472,
      "aula_id": 14,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 473,
      "aula_id": 14,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 474,
      "aula_id": 14,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 475,
      "aula_id": 14,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 476,
      "aula_id": 14,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 477,
      "aula_id": 14,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 478,
      "aula_id": 14,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 479,
      "aula_id": 14,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 480,
      "aula_id": 14,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 481,
      "aula_id": 14,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 482,
      "aula_id": 14,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 483,
      "aula_id": 14,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 484,
      "aula_id": 14,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 485,
      "aula_id": 14,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 486,
      "aula_id": 14,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 487,
      "aula_id": 14,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 488,
      "aula_id": 14,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 489,
      "aula_id": 14,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 490,
      "aula_id": 14,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 491,
      "aula_id": 15,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 492,
      "aula_id": 15,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 493,
      "aula_id": 15,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 494,
      "aula_id": 15,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 495,
      "aula_id": 15,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 496,
      "aula_id": 15,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 497,
      "aula_id": 15,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 498,
      "aula_id": 15,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 499,
      "aula_id": 15,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 500,
      "aula_id": 15,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 501,
      "aula_id": 15,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 502,
      "aula_id": 15,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 503,
      "aula_id": 15,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 504,
      "aula_id": 15,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 505,
      "aula_id": 15,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 506,
      "aula_id": 15,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 507,
      "aula_id": 15,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 508,
      "aula_id": 15,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 509,
      "aula_id": 15,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 510,
      "aula_id": 15,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 511,
      "aula_id": 15,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 512,
      "aula_id": 15,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 513,
      "aula_id": 15,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 514,
      "aula_id": 15,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 515,
      "aula_id": 15,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 516,
      "aula_id": 15,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 517,
      "aula_id": 15,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 518,
      "aula_id": 15,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 519,
      "aula_id": 15,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 520,
      "aula_id": 15,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 521,
      "aula_id": 15,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 522,
      "aula_id": 15,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 523,
      "aula_id": 15,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 524,
      "aula_id": 15,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 525,
      "aula_id": 15,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 526,
      "aula_id": 16,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 527,
      "aula_id": 16,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 528,
      "aula_id": 16,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 529,
      "aula_id": 16,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 530,
      "aula_id": 16,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 531,
      "aula_id": 16,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 532,
      "aula_id": 16,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 533,
      "aula_id": 16,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 534,
      "aula_id": 16,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 535,
      "aula_id": 16,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 536,
      "aula_id": 16,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 537,
      "aula_id": 16,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 538,
      "aula_id": 16,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 539,
      "aula_id": 16,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 540,
      "aula_id": 16,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 541,
      "aula_id": 16,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 542,
      "aula_id": 16,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 543,
      "aula_id": 16,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 544,
      "aula_id": 16,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 545,
      "aula_id": 16,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 546,
      "aula_id": 16,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 547,
      "aula_id": 16,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 548,
      "aula_id": 16,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 549,
      "aula_id": 16,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 550,
      "aula_id": 16,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 551,
      "aula_id": 16,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 552,
      "aula_id": 16,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 553,
      "aula_id": 16,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 554,
      "aula_id": 16,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 555,
      "aula_id": 16,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 556,
      "aula_id": 16,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 557,
      "aula_id": 16,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 558,
      "aula_id": 16,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 559,
      "aula_id": 16,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 560,
      "aula_id": 16,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 561,
      "aula_id": 17,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 562,
      "aula_id": 17,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 563,
      "aula_id": 17,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 564,
      "aula_id": 17,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 565,
      "aula_id": 17,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 566,
      "aula_id": 17,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 567,
      "aula_id": 17,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 568,
      "aula_id": 17,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 569,
      "aula_id": 17,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 570,
      "aula_id": 17,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 571,
      "aula_id": 17,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 572,
      "aula_id": 17,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 573,
      "aula_id": 17,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 574,
      "aula_id": 17,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 575,
      "aula_id": 17,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 576,
      "aula_id": 17,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 577,
      "aula_id": 17,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 578,
      "aula_id": 17,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 579,
      "aula_id": 17,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 580,
      "aula_id": 17,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 581,
      "aula_id": 17,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 582,
      "aula_id": 17,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 583,
      "aula_id": 17,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 584,
      "aula_id": 17,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 585,
      "aula_id": 17,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 586,
      "aula_id": 17,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 587,
      "aula_id": 17,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 588,
      "aula_id": 17,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 589,
      "aula_id": 17,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 590,
      "aula_id": 17,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 591,
      "aula_id": 17,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 592,
      "aula_id": 17,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 593,
      "aula_id": 17,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 594,
      "aula_id": 17,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 595,
      "aula_id": 17,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 596,
      "aula_id": 18,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 597,
      "aula_id": 18,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 598,
      "aula_id": 18,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 599,
      "aula_id": 18,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 600,
      "aula_id": 18,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 601,
      "aula_id": 18,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 602,
      "aula_id": 18,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 603,
      "aula_id": 18,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 604,
      "aula_id": 18,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 605,
      "aula_id": 18,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 606,
      "aula_id": 18,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 607,
      "aula_id": 18,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 608,
      "aula_id": 18,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 609,
      "aula_id": 18,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 610,
      "aula_id": 18,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 611,
      "aula_id": 18,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 612,
      "aula_id": 18,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 613,
      "aula_id": 18,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 614,
      "aula_id": 18,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 615,
      "aula_id": 18,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 616,
      "aula_id": 18,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 617,
      "aula_id": 18,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 618,
      "aula_id": 18,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 619,
      "aula_id": 18,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 620,
      "aula_id": 18,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 621,
      "aula_id": 18,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 622,
      "aula_id": 18,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 623,
      "aula_id": 18,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 624,
      "aula_id": 18,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 625,
      "aula_id": 18,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 626,
      "aula_id": 18,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 627,
      "aula_id": 18,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 628,
      "aula_id": 18,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 629,
      "aula_id": 18,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 630,
      "aula_id": 18,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 631,
      "aula_id": 19,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 632,
      "aula_id": 19,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 633,
      "aula_id": 19,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 634,
      "aula_id": 19,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 635,
      "aula_id": 19,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 636,
      "aula_id": 19,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 637,
      "aula_id": 19,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 638,
      "aula_id": 19,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 639,
      "aula_id": 19,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 640,
      "aula_id": 19,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 641,
      "aula_id": 19,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 642,
      "aula_id": 19,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 643,
      "aula_id": 19,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 644,
      "aula_id": 19,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 645,
      "aula_id": 19,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 646,
      "aula_id": 19,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 647,
      "aula_id": 19,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 648,
      "aula_id": 19,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 649,
      "aula_id": 19,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 650,
      "aula_id": 19,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 651,
      "aula_id": 19,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 652,
      "aula_id": 19,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 653,
      "aula_id": 19,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 654,
      "aula_id": 19,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 655,
      "aula_id": 19,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 656,
      "aula_id": 19,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 657,
      "aula_id": 19,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 658,
      "aula_id": 19,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 659,
      "aula_id": 19,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 660,
      "aula_id": 19,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 661,
      "aula_id": 19,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 662,
      "aula_id": 19,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 663,
      "aula_id": 19,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 664,
      "aula_id": 19,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 665,
      "aula_id": 19,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 666,
      "aula_id": 20,
      "dia": "Lunes",
      "bloque_orden": 1,
      "curso_id": 2,
      "docente_id": 2
    },
    {
      "id": 667,
      "aula_id": 20,
      "dia": "Lunes",
      "bloque_orden": 2,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 668,
      "aula_id": 20,
      "dia": "Lunes",
      "bloque_orden": 3,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 669,
      "aula_id": 20,
      "dia": "Lunes",
      "bloque_orden": 4,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 670,
      "aula_id": 20,
      "dia": "Lunes",
      "bloque_orden": 5,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 671,
      "aula_id": 20,
      "dia": "Lunes",
      "bloque_orden": 6,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 672,
      "aula_id": 20,
      "dia": "Lunes",
      "bloque_orden": 7,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 673,
      "aula_id": 20,
      "dia": "Martes",
      "bloque_orden": 1,
      "curso_id": 3,
      "docente_id": 4
    },
    {
      "id": 674,
      "aula_id": 20,
      "dia": "Martes",
      "bloque_orden": 2,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 675,
      "aula_id": 20,
      "dia": "Martes",
      "bloque_orden": 3,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 676,
      "aula_id": 20,
      "dia": "Martes",
      "bloque_orden": 4,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 677,
      "aula_id": 20,
      "dia": "Martes",
      "bloque_orden": 5,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 678,
      "aula_id": 20,
      "dia": "Martes",
      "bloque_orden": 6,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 679,
      "aula_id": 20,
      "dia": "Martes",
      "bloque_orden": 7,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 680,
      "aula_id": 20,
      "dia": "Miércoles",
      "bloque_orden": 1,
      "curso_id": 4,
      "docente_id": 5
    },
    {
      "id": 681,
      "aula_id": 20,
      "dia": "Miércoles",
      "bloque_orden": 2,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 682,
      "aula_id": 20,
      "dia": "Miércoles",
      "bloque_orden": 3,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 683,
      "aula_id": 20,
      "dia": "Miércoles",
      "bloque_orden": 4,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 684,
      "aula_id": 20,
      "dia": "Miércoles",
      "bloque_orden": 5,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 685,
      "aula_id": 20,
      "dia": "Miércoles",
      "bloque_orden": 6,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 686,
      "aula_id": 20,
      "dia": "Miércoles",
      "bloque_orden": 7,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 687,
      "aula_id": 20,
      "dia": "Jueves",
      "bloque_orden": 1,
      "curso_id": 5,
      "docente_id": 6
    },
    {
      "id": 688,
      "aula_id": 20,
      "dia": "Jueves",
      "bloque_orden": 2,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 689,
      "aula_id": 20,
      "dia": "Jueves",
      "bloque_orden": 3,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 690,
      "aula_id": 20,
      "dia": "Jueves",
      "bloque_orden": 4,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 691,
      "aula_id": 20,
      "dia": "Jueves",
      "bloque_orden": 5,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 692,
      "aula_id": 20,
      "dia": "Jueves",
      "bloque_orden": 6,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 693,
      "aula_id": 20,
      "dia": "Jueves",
      "bloque_orden": 7,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 694,
      "aula_id": 20,
      "dia": "Viernes",
      "bloque_orden": 1,
      "curso_id": 6,
      "docente_id": 7
    },
    {
      "id": 695,
      "aula_id": 20,
      "dia": "Viernes",
      "bloque_orden": 2,
      "curso_id": 7,
      "docente_id": 8
    },
    {
      "id": 696,
      "aula_id": 20,
      "dia": "Viernes",
      "bloque_orden": 3,
      "curso_id": 8,
      "docente_id": 9
    },
    {
      "id": 697,
      "aula_id": 20,
      "dia": "Viernes",
      "bloque_orden": 4,
      "curso_id": 9,
      "docente_id": 10
    },
    {
      "id": 698,
      "aula_id": 20,
      "dia": "Viernes",
      "bloque_orden": 5,
      "curso_id": 10,
      "docente_id": 11
    },
    {
      "id": 699,
      "aula_id": 20,
      "dia": "Viernes",
      "bloque_orden": 6,
      "curso_id": 1,
      "docente_id": 1
    },
    {
      "id": 700,
      "aula_id": 20,
      "dia": "Viernes",
      "bloque_orden": 7,
      "curso_id": 2,
      "docente_id": 2
    }
  ],
  notas: [
    {
      "id": 1,
      "alumno_id": 1,
      "curso_id": 1,
      "bimestre_1": 14,
      "bimestre_2": 15,
      "bimestre_3": 15,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 2,
      "alumno_id": 1,
      "curso_id": 2,
      "bimestre_1": 15,
      "bimestre_2": 16,
      "bimestre_3": 17,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 3,
      "alumno_id": 1,
      "curso_id": 3,
      "bimestre_1": 16,
      "bimestre_2": 17,
      "bimestre_3": 19,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 4,
      "alumno_id": 1,
      "curso_id": 4,
      "bimestre_1": 17,
      "bimestre_2": 18,
      "bimestre_3": 12,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 5,
      "alumno_id": 1,
      "curso_id": 5,
      "bimestre_1": 18,
      "bimestre_2": 19,
      "bimestre_3": 14,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 6,
      "alumno_id": 1,
      "curso_id": 6,
      "bimestre_1": 19,
      "bimestre_2": 20,
      "bimestre_3": 16,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 7,
      "alumno_id": 1,
      "curso_id": 7,
      "bimestre_1": 20,
      "bimestre_2": 12,
      "bimestre_3": 18,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 8,
      "alumno_id": 1,
      "curso_id": 8,
      "bimestre_1": 12,
      "bimestre_2": 13,
      "bimestre_3": 20,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 9,
      "alumno_id": 1,
      "curso_id": 9,
      "bimestre_1": 13,
      "bimestre_2": 14,
      "bimestre_3": 13,
      "bimestre_4": 15,
      "promedio_final": 14
    },
    {
      "id": 10,
      "alumno_id": 1,
      "curso_id": 10,
      "bimestre_1": 14,
      "bimestre_2": 15,
      "bimestre_3": 15,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 11,
      "alumno_id": 2,
      "curso_id": 1,
      "bimestre_1": 15,
      "bimestre_2": 17,
      "bimestre_3": 16,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 12,
      "alumno_id": 2,
      "curso_id": 2,
      "bimestre_1": 16,
      "bimestre_2": 18,
      "bimestre_3": 18,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 13,
      "alumno_id": 2,
      "curso_id": 3,
      "bimestre_1": 17,
      "bimestre_2": 19,
      "bimestre_3": 20,
      "bimestre_4": 18,
      "promedio_final": 19
    },
    {
      "id": 14,
      "alumno_id": 2,
      "curso_id": 4,
      "bimestre_1": 18,
      "bimestre_2": 20,
      "bimestre_3": 13,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 15,
      "alumno_id": 2,
      "curso_id": 5,
      "bimestre_1": 19,
      "bimestre_2": 12,
      "bimestre_3": 15,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 16,
      "alumno_id": 2,
      "curso_id": 6,
      "bimestre_1": 20,
      "bimestre_2": 13,
      "bimestre_3": 17,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 17,
      "alumno_id": 2,
      "curso_id": 7,
      "bimestre_1": 12,
      "bimestre_2": 14,
      "bimestre_3": 19,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 18,
      "alumno_id": 2,
      "curso_id": 8,
      "bimestre_1": 13,
      "bimestre_2": 15,
      "bimestre_3": 12,
      "bimestre_4": 15,
      "promedio_final": 14
    },
    {
      "id": 19,
      "alumno_id": 2,
      "curso_id": 9,
      "bimestre_1": 14,
      "bimestre_2": 16,
      "bimestre_3": 14,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 20,
      "alumno_id": 2,
      "curso_id": 10,
      "bimestre_1": 15,
      "bimestre_2": 17,
      "bimestre_3": 16,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 21,
      "alumno_id": 3,
      "curso_id": 1,
      "bimestre_1": 16,
      "bimestre_2": 19,
      "bimestre_3": 17,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 22,
      "alumno_id": 3,
      "curso_id": 2,
      "bimestre_1": 17,
      "bimestre_2": 20,
      "bimestre_3": 19,
      "bimestre_4": 18,
      "promedio_final": 19
    },
    {
      "id": 23,
      "alumno_id": 3,
      "curso_id": 3,
      "bimestre_1": 18,
      "bimestre_2": 12,
      "bimestre_3": 12,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 24,
      "alumno_id": 3,
      "curso_id": 4,
      "bimestre_1": 19,
      "bimestre_2": 13,
      "bimestre_3": 14,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 25,
      "alumno_id": 3,
      "curso_id": 5,
      "bimestre_1": 20,
      "bimestre_2": 14,
      "bimestre_3": 16,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 26,
      "alumno_id": 3,
      "curso_id": 6,
      "bimestre_1": 12,
      "bimestre_2": 15,
      "bimestre_3": 18,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 27,
      "alumno_id": 3,
      "curso_id": 7,
      "bimestre_1": 13,
      "bimestre_2": 16,
      "bimestre_3": 20,
      "bimestre_4": 15,
      "promedio_final": 16
    },
    {
      "id": 28,
      "alumno_id": 3,
      "curso_id": 8,
      "bimestre_1": 14,
      "bimestre_2": 17,
      "bimestre_3": 13,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 29,
      "alumno_id": 3,
      "curso_id": 9,
      "bimestre_1": 15,
      "bimestre_2": 18,
      "bimestre_3": 15,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 30,
      "alumno_id": 3,
      "curso_id": 10,
      "bimestre_1": 16,
      "bimestre_2": 19,
      "bimestre_3": 17,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 31,
      "alumno_id": 4,
      "curso_id": 1,
      "bimestre_1": 17,
      "bimestre_2": 12,
      "bimestre_3": 18,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 32,
      "alumno_id": 4,
      "curso_id": 2,
      "bimestre_1": 18,
      "bimestre_2": 13,
      "bimestre_3": 20,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 33,
      "alumno_id": 4,
      "curso_id": 3,
      "bimestre_1": 19,
      "bimestre_2": 14,
      "bimestre_3": 13,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 34,
      "alumno_id": 4,
      "curso_id": 4,
      "bimestre_1": 20,
      "bimestre_2": 15,
      "bimestre_3": 15,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 35,
      "alumno_id": 4,
      "curso_id": 5,
      "bimestre_1": 12,
      "bimestre_2": 16,
      "bimestre_3": 17,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 36,
      "alumno_id": 4,
      "curso_id": 6,
      "bimestre_1": 13,
      "bimestre_2": 17,
      "bimestre_3": 19,
      "bimestre_4": 15,
      "promedio_final": 16
    },
    {
      "id": 37,
      "alumno_id": 4,
      "curso_id": 7,
      "bimestre_1": 14,
      "bimestre_2": 18,
      "bimestre_3": 12,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 38,
      "alumno_id": 4,
      "curso_id": 8,
      "bimestre_1": 15,
      "bimestre_2": 19,
      "bimestre_3": 14,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 39,
      "alumno_id": 4,
      "curso_id": 9,
      "bimestre_1": 16,
      "bimestre_2": 20,
      "bimestre_3": 16,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 40,
      "alumno_id": 4,
      "curso_id": 10,
      "bimestre_1": 17,
      "bimestre_2": 12,
      "bimestre_3": 18,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 41,
      "alumno_id": 5,
      "curso_id": 1,
      "bimestre_1": 18,
      "bimestre_2": 14,
      "bimestre_3": 19,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 42,
      "alumno_id": 5,
      "curso_id": 2,
      "bimestre_1": 19,
      "bimestre_2": 15,
      "bimestre_3": 12,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 43,
      "alumno_id": 5,
      "curso_id": 3,
      "bimestre_1": 20,
      "bimestre_2": 16,
      "bimestre_3": 14,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 44,
      "alumno_id": 5,
      "curso_id": 4,
      "bimestre_1": 12,
      "bimestre_2": 17,
      "bimestre_3": 16,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 45,
      "alumno_id": 5,
      "curso_id": 5,
      "bimestre_1": 13,
      "bimestre_2": 18,
      "bimestre_3": 18,
      "bimestre_4": 15,
      "promedio_final": 16
    },
    {
      "id": 46,
      "alumno_id": 5,
      "curso_id": 6,
      "bimestre_1": 14,
      "bimestre_2": 19,
      "bimestre_3": 20,
      "bimestre_4": 18,
      "promedio_final": 18
    },
    {
      "id": 47,
      "alumno_id": 5,
      "curso_id": 7,
      "bimestre_1": 15,
      "bimestre_2": 20,
      "bimestre_3": 13,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 48,
      "alumno_id": 5,
      "curso_id": 8,
      "bimestre_1": 16,
      "bimestre_2": 12,
      "bimestre_3": 15,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 49,
      "alumno_id": 5,
      "curso_id": 9,
      "bimestre_1": 17,
      "bimestre_2": 13,
      "bimestre_3": 17,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 50,
      "alumno_id": 5,
      "curso_id": 10,
      "bimestre_1": 18,
      "bimestre_2": 14,
      "bimestre_3": 19,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 51,
      "alumno_id": 6,
      "curso_id": 1,
      "bimestre_1": 19,
      "bimestre_2": 16,
      "bimestre_3": 20,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 52,
      "alumno_id": 6,
      "curso_id": 2,
      "bimestre_1": 20,
      "bimestre_2": 17,
      "bimestre_3": 13,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 53,
      "alumno_id": 6,
      "curso_id": 3,
      "bimestre_1": 12,
      "bimestre_2": 18,
      "bimestre_3": 15,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 54,
      "alumno_id": 6,
      "curso_id": 4,
      "bimestre_1": 13,
      "bimestre_2": 19,
      "bimestre_3": 17,
      "bimestre_4": 15,
      "promedio_final": 16
    },
    {
      "id": 55,
      "alumno_id": 6,
      "curso_id": 5,
      "bimestre_1": 14,
      "bimestre_2": 20,
      "bimestre_3": 19,
      "bimestre_4": 18,
      "promedio_final": 18
    },
    {
      "id": 56,
      "alumno_id": 6,
      "curso_id": 6,
      "bimestre_1": 15,
      "bimestre_2": 12,
      "bimestre_3": 12,
      "bimestre_4": 12,
      "promedio_final": 13
    },
    {
      "id": 57,
      "alumno_id": 6,
      "curso_id": 7,
      "bimestre_1": 16,
      "bimestre_2": 13,
      "bimestre_3": 14,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 58,
      "alumno_id": 6,
      "curso_id": 8,
      "bimestre_1": 17,
      "bimestre_2": 14,
      "bimestre_3": 16,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 59,
      "alumno_id": 6,
      "curso_id": 9,
      "bimestre_1": 18,
      "bimestre_2": 15,
      "bimestre_3": 18,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 60,
      "alumno_id": 6,
      "curso_id": 10,
      "bimestre_1": 19,
      "bimestre_2": 16,
      "bimestre_3": 20,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 61,
      "alumno_id": 7,
      "curso_id": 1,
      "bimestre_1": 20,
      "bimestre_2": 18,
      "bimestre_3": 12,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 62,
      "alumno_id": 7,
      "curso_id": 2,
      "bimestre_1": 12,
      "bimestre_2": 19,
      "bimestre_3": 14,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 63,
      "alumno_id": 7,
      "curso_id": 3,
      "bimestre_1": 13,
      "bimestre_2": 20,
      "bimestre_3": 16,
      "bimestre_4": 15,
      "promedio_final": 16
    },
    {
      "id": 64,
      "alumno_id": 7,
      "curso_id": 4,
      "bimestre_1": 14,
      "bimestre_2": 12,
      "bimestre_3": 18,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 65,
      "alumno_id": 7,
      "curso_id": 5,
      "bimestre_1": 15,
      "bimestre_2": 13,
      "bimestre_3": 20,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 66,
      "alumno_id": 7,
      "curso_id": 6,
      "bimestre_1": 16,
      "bimestre_2": 14,
      "bimestre_3": 13,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 67,
      "alumno_id": 7,
      "curso_id": 7,
      "bimestre_1": 17,
      "bimestre_2": 15,
      "bimestre_3": 15,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 68,
      "alumno_id": 7,
      "curso_id": 8,
      "bimestre_1": 18,
      "bimestre_2": 16,
      "bimestre_3": 17,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 69,
      "alumno_id": 7,
      "curso_id": 9,
      "bimestre_1": 19,
      "bimestre_2": 17,
      "bimestre_3": 19,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 70,
      "alumno_id": 7,
      "curso_id": 10,
      "bimestre_1": 20,
      "bimestre_2": 18,
      "bimestre_3": 12,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 71,
      "alumno_id": 8,
      "curso_id": 1,
      "bimestre_1": 12,
      "bimestre_2": 20,
      "bimestre_3": 13,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 72,
      "alumno_id": 8,
      "curso_id": 2,
      "bimestre_1": 13,
      "bimestre_2": 12,
      "bimestre_3": 15,
      "bimestre_4": 15,
      "promedio_final": 14
    },
    {
      "id": 73,
      "alumno_id": 8,
      "curso_id": 3,
      "bimestre_1": 14,
      "bimestre_2": 13,
      "bimestre_3": 17,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 74,
      "alumno_id": 8,
      "curso_id": 4,
      "bimestre_1": 15,
      "bimestre_2": 14,
      "bimestre_3": 19,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 75,
      "alumno_id": 8,
      "curso_id": 5,
      "bimestre_1": 16,
      "bimestre_2": 15,
      "bimestre_3": 12,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 76,
      "alumno_id": 8,
      "curso_id": 6,
      "bimestre_1": 17,
      "bimestre_2": 16,
      "bimestre_3": 14,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 77,
      "alumno_id": 8,
      "curso_id": 7,
      "bimestre_1": 18,
      "bimestre_2": 17,
      "bimestre_3": 16,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 78,
      "alumno_id": 8,
      "curso_id": 8,
      "bimestre_1": 19,
      "bimestre_2": 18,
      "bimestre_3": 18,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 79,
      "alumno_id": 8,
      "curso_id": 9,
      "bimestre_1": 20,
      "bimestre_2": 19,
      "bimestre_3": 20,
      "bimestre_4": 18,
      "promedio_final": 19
    },
    {
      "id": 80,
      "alumno_id": 8,
      "curso_id": 10,
      "bimestre_1": 12,
      "bimestre_2": 20,
      "bimestre_3": 13,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 81,
      "alumno_id": 9,
      "curso_id": 1,
      "bimestre_1": 13,
      "bimestre_2": 13,
      "bimestre_3": 14,
      "bimestre_4": 15,
      "promedio_final": 14
    },
    {
      "id": 82,
      "alumno_id": 9,
      "curso_id": 2,
      "bimestre_1": 14,
      "bimestre_2": 14,
      "bimestre_3": 16,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 83,
      "alumno_id": 9,
      "curso_id": 3,
      "bimestre_1": 15,
      "bimestre_2": 15,
      "bimestre_3": 18,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 84,
      "alumno_id": 9,
      "curso_id": 4,
      "bimestre_1": 16,
      "bimestre_2": 16,
      "bimestre_3": 20,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 85,
      "alumno_id": 9,
      "curso_id": 5,
      "bimestre_1": 17,
      "bimestre_2": 17,
      "bimestre_3": 13,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 86,
      "alumno_id": 9,
      "curso_id": 6,
      "bimestre_1": 18,
      "bimestre_2": 18,
      "bimestre_3": 15,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 87,
      "alumno_id": 9,
      "curso_id": 7,
      "bimestre_1": 19,
      "bimestre_2": 19,
      "bimestre_3": 17,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 88,
      "alumno_id": 9,
      "curso_id": 8,
      "bimestre_1": 20,
      "bimestre_2": 20,
      "bimestre_3": 19,
      "bimestre_4": 18,
      "promedio_final": 19
    },
    {
      "id": 89,
      "alumno_id": 9,
      "curso_id": 9,
      "bimestre_1": 12,
      "bimestre_2": 12,
      "bimestre_3": 12,
      "bimestre_4": 12,
      "promedio_final": 12
    },
    {
      "id": 90,
      "alumno_id": 9,
      "curso_id": 10,
      "bimestre_1": 13,
      "bimestre_2": 13,
      "bimestre_3": 14,
      "bimestre_4": 15,
      "promedio_final": 14
    },
    {
      "id": 91,
      "alumno_id": 10,
      "curso_id": 1,
      "bimestre_1": 14,
      "bimestre_2": 15,
      "bimestre_3": 15,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 92,
      "alumno_id": 10,
      "curso_id": 2,
      "bimestre_1": 15,
      "bimestre_2": 16,
      "bimestre_3": 17,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 93,
      "alumno_id": 10,
      "curso_id": 3,
      "bimestre_1": 16,
      "bimestre_2": 17,
      "bimestre_3": 19,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 94,
      "alumno_id": 10,
      "curso_id": 4,
      "bimestre_1": 17,
      "bimestre_2": 18,
      "bimestre_3": 12,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 95,
      "alumno_id": 10,
      "curso_id": 5,
      "bimestre_1": 18,
      "bimestre_2": 19,
      "bimestre_3": 14,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 96,
      "alumno_id": 10,
      "curso_id": 6,
      "bimestre_1": 19,
      "bimestre_2": 20,
      "bimestre_3": 16,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 97,
      "alumno_id": 10,
      "curso_id": 7,
      "bimestre_1": 20,
      "bimestre_2": 12,
      "bimestre_3": 18,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 98,
      "alumno_id": 10,
      "curso_id": 8,
      "bimestre_1": 12,
      "bimestre_2": 13,
      "bimestre_3": 20,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 99,
      "alumno_id": 10,
      "curso_id": 9,
      "bimestre_1": 13,
      "bimestre_2": 14,
      "bimestre_3": 13,
      "bimestre_4": 15,
      "promedio_final": 14
    },
    {
      "id": 100,
      "alumno_id": 10,
      "curso_id": 10,
      "bimestre_1": 14,
      "bimestre_2": 15,
      "bimestre_3": 15,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 101,
      "alumno_id": 11,
      "curso_id": 1,
      "bimestre_1": 15,
      "bimestre_2": 17,
      "bimestre_3": 16,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 102,
      "alumno_id": 11,
      "curso_id": 2,
      "bimestre_1": 16,
      "bimestre_2": 18,
      "bimestre_3": 18,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 103,
      "alumno_id": 11,
      "curso_id": 3,
      "bimestre_1": 17,
      "bimestre_2": 19,
      "bimestre_3": 20,
      "bimestre_4": 18,
      "promedio_final": 19
    },
    {
      "id": 104,
      "alumno_id": 11,
      "curso_id": 4,
      "bimestre_1": 18,
      "bimestre_2": 20,
      "bimestre_3": 13,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 105,
      "alumno_id": 11,
      "curso_id": 5,
      "bimestre_1": 19,
      "bimestre_2": 12,
      "bimestre_3": 15,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 106,
      "alumno_id": 11,
      "curso_id": 6,
      "bimestre_1": 20,
      "bimestre_2": 13,
      "bimestre_3": 17,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 107,
      "alumno_id": 11,
      "curso_id": 7,
      "bimestre_1": 12,
      "bimestre_2": 14,
      "bimestre_3": 19,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 108,
      "alumno_id": 11,
      "curso_id": 8,
      "bimestre_1": 13,
      "bimestre_2": 15,
      "bimestre_3": 12,
      "bimestre_4": 15,
      "promedio_final": 14
    },
    {
      "id": 109,
      "alumno_id": 11,
      "curso_id": 9,
      "bimestre_1": 14,
      "bimestre_2": 16,
      "bimestre_3": 14,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 110,
      "alumno_id": 11,
      "curso_id": 10,
      "bimestre_1": 15,
      "bimestre_2": 17,
      "bimestre_3": 16,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 111,
      "alumno_id": 12,
      "curso_id": 1,
      "bimestre_1": 16,
      "bimestre_2": 19,
      "bimestre_3": 17,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 112,
      "alumno_id": 12,
      "curso_id": 2,
      "bimestre_1": 17,
      "bimestre_2": 20,
      "bimestre_3": 19,
      "bimestre_4": 18,
      "promedio_final": 19
    },
    {
      "id": 113,
      "alumno_id": 12,
      "curso_id": 3,
      "bimestre_1": 18,
      "bimestre_2": 12,
      "bimestre_3": 12,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 114,
      "alumno_id": 12,
      "curso_id": 4,
      "bimestre_1": 19,
      "bimestre_2": 13,
      "bimestre_3": 14,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 115,
      "alumno_id": 12,
      "curso_id": 5,
      "bimestre_1": 20,
      "bimestre_2": 14,
      "bimestre_3": 16,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 116,
      "alumno_id": 12,
      "curso_id": 6,
      "bimestre_1": 12,
      "bimestre_2": 15,
      "bimestre_3": 18,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 117,
      "alumno_id": 12,
      "curso_id": 7,
      "bimestre_1": 13,
      "bimestre_2": 16,
      "bimestre_3": 20,
      "bimestre_4": 15,
      "promedio_final": 16
    },
    {
      "id": 118,
      "alumno_id": 12,
      "curso_id": 8,
      "bimestre_1": 14,
      "bimestre_2": 17,
      "bimestre_3": 13,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 119,
      "alumno_id": 12,
      "curso_id": 9,
      "bimestre_1": 15,
      "bimestre_2": 18,
      "bimestre_3": 15,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 120,
      "alumno_id": 12,
      "curso_id": 10,
      "bimestre_1": 16,
      "bimestre_2": 19,
      "bimestre_3": 17,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 121,
      "alumno_id": 13,
      "curso_id": 1,
      "bimestre_1": 17,
      "bimestre_2": 12,
      "bimestre_3": 18,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 122,
      "alumno_id": 13,
      "curso_id": 2,
      "bimestre_1": 18,
      "bimestre_2": 13,
      "bimestre_3": 20,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 123,
      "alumno_id": 13,
      "curso_id": 3,
      "bimestre_1": 19,
      "bimestre_2": 14,
      "bimestre_3": 13,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 124,
      "alumno_id": 13,
      "curso_id": 4,
      "bimestre_1": 20,
      "bimestre_2": 15,
      "bimestre_3": 15,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 125,
      "alumno_id": 13,
      "curso_id": 5,
      "bimestre_1": 12,
      "bimestre_2": 16,
      "bimestre_3": 17,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 126,
      "alumno_id": 13,
      "curso_id": 6,
      "bimestre_1": 13,
      "bimestre_2": 17,
      "bimestre_3": 19,
      "bimestre_4": 15,
      "promedio_final": 16
    },
    {
      "id": 127,
      "alumno_id": 13,
      "curso_id": 7,
      "bimestre_1": 14,
      "bimestre_2": 18,
      "bimestre_3": 12,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 128,
      "alumno_id": 13,
      "curso_id": 8,
      "bimestre_1": 15,
      "bimestre_2": 19,
      "bimestre_3": 14,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 129,
      "alumno_id": 13,
      "curso_id": 9,
      "bimestre_1": 16,
      "bimestre_2": 20,
      "bimestre_3": 16,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 130,
      "alumno_id": 13,
      "curso_id": 10,
      "bimestre_1": 17,
      "bimestre_2": 12,
      "bimestre_3": 18,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 131,
      "alumno_id": 14,
      "curso_id": 1,
      "bimestre_1": 18,
      "bimestre_2": 14,
      "bimestre_3": 19,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 132,
      "alumno_id": 14,
      "curso_id": 2,
      "bimestre_1": 19,
      "bimestre_2": 15,
      "bimestre_3": 12,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 133,
      "alumno_id": 14,
      "curso_id": 3,
      "bimestre_1": 20,
      "bimestre_2": 16,
      "bimestre_3": 14,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 134,
      "alumno_id": 14,
      "curso_id": 4,
      "bimestre_1": 12,
      "bimestre_2": 17,
      "bimestre_3": 16,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 135,
      "alumno_id": 14,
      "curso_id": 5,
      "bimestre_1": 13,
      "bimestre_2": 18,
      "bimestre_3": 18,
      "bimestre_4": 15,
      "promedio_final": 16
    },
    {
      "id": 136,
      "alumno_id": 14,
      "curso_id": 6,
      "bimestre_1": 14,
      "bimestre_2": 19,
      "bimestre_3": 20,
      "bimestre_4": 18,
      "promedio_final": 18
    },
    {
      "id": 137,
      "alumno_id": 14,
      "curso_id": 7,
      "bimestre_1": 15,
      "bimestre_2": 20,
      "bimestre_3": 13,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 138,
      "alumno_id": 14,
      "curso_id": 8,
      "bimestre_1": 16,
      "bimestre_2": 12,
      "bimestre_3": 15,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 139,
      "alumno_id": 14,
      "curso_id": 9,
      "bimestre_1": 17,
      "bimestre_2": 13,
      "bimestre_3": 17,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 140,
      "alumno_id": 14,
      "curso_id": 10,
      "bimestre_1": 18,
      "bimestre_2": 14,
      "bimestre_3": 19,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 141,
      "alumno_id": 15,
      "curso_id": 1,
      "bimestre_1": 19,
      "bimestre_2": 16,
      "bimestre_3": 20,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 142,
      "alumno_id": 15,
      "curso_id": 2,
      "bimestre_1": 20,
      "bimestre_2": 17,
      "bimestre_3": 13,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 143,
      "alumno_id": 15,
      "curso_id": 3,
      "bimestre_1": 12,
      "bimestre_2": 18,
      "bimestre_3": 15,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 144,
      "alumno_id": 15,
      "curso_id": 4,
      "bimestre_1": 13,
      "bimestre_2": 19,
      "bimestre_3": 17,
      "bimestre_4": 15,
      "promedio_final": 16
    },
    {
      "id": 145,
      "alumno_id": 15,
      "curso_id": 5,
      "bimestre_1": 14,
      "bimestre_2": 20,
      "bimestre_3": 19,
      "bimestre_4": 18,
      "promedio_final": 18
    },
    {
      "id": 146,
      "alumno_id": 15,
      "curso_id": 6,
      "bimestre_1": 15,
      "bimestre_2": 12,
      "bimestre_3": 12,
      "bimestre_4": 12,
      "promedio_final": 13
    },
    {
      "id": 147,
      "alumno_id": 15,
      "curso_id": 7,
      "bimestre_1": 16,
      "bimestre_2": 13,
      "bimestre_3": 14,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 148,
      "alumno_id": 15,
      "curso_id": 8,
      "bimestre_1": 17,
      "bimestre_2": 14,
      "bimestre_3": 16,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 149,
      "alumno_id": 15,
      "curso_id": 9,
      "bimestre_1": 18,
      "bimestre_2": 15,
      "bimestre_3": 18,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 150,
      "alumno_id": 15,
      "curso_id": 10,
      "bimestre_1": 19,
      "bimestre_2": 16,
      "bimestre_3": 20,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 151,
      "alumno_id": 16,
      "curso_id": 1,
      "bimestre_1": 20,
      "bimestre_2": 18,
      "bimestre_3": 12,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 152,
      "alumno_id": 16,
      "curso_id": 2,
      "bimestre_1": 12,
      "bimestre_2": 19,
      "bimestre_3": 14,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 153,
      "alumno_id": 16,
      "curso_id": 3,
      "bimestre_1": 13,
      "bimestre_2": 20,
      "bimestre_3": 16,
      "bimestre_4": 15,
      "promedio_final": 16
    },
    {
      "id": 154,
      "alumno_id": 16,
      "curso_id": 4,
      "bimestre_1": 14,
      "bimestre_2": 12,
      "bimestre_3": 18,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 155,
      "alumno_id": 16,
      "curso_id": 5,
      "bimestre_1": 15,
      "bimestre_2": 13,
      "bimestre_3": 20,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 156,
      "alumno_id": 16,
      "curso_id": 6,
      "bimestre_1": 16,
      "bimestre_2": 14,
      "bimestre_3": 13,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 157,
      "alumno_id": 16,
      "curso_id": 7,
      "bimestre_1": 17,
      "bimestre_2": 15,
      "bimestre_3": 15,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 158,
      "alumno_id": 16,
      "curso_id": 8,
      "bimestre_1": 18,
      "bimestre_2": 16,
      "bimestre_3": 17,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 159,
      "alumno_id": 16,
      "curso_id": 9,
      "bimestre_1": 19,
      "bimestre_2": 17,
      "bimestre_3": 19,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 160,
      "alumno_id": 16,
      "curso_id": 10,
      "bimestre_1": 20,
      "bimestre_2": 18,
      "bimestre_3": 12,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 161,
      "alumno_id": 17,
      "curso_id": 1,
      "bimestre_1": 12,
      "bimestre_2": 20,
      "bimestre_3": 13,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 162,
      "alumno_id": 17,
      "curso_id": 2,
      "bimestre_1": 13,
      "bimestre_2": 12,
      "bimestre_3": 15,
      "bimestre_4": 15,
      "promedio_final": 14
    },
    {
      "id": 163,
      "alumno_id": 17,
      "curso_id": 3,
      "bimestre_1": 14,
      "bimestre_2": 13,
      "bimestre_3": 17,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 164,
      "alumno_id": 17,
      "curso_id": 4,
      "bimestre_1": 15,
      "bimestre_2": 14,
      "bimestre_3": 19,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 165,
      "alumno_id": 17,
      "curso_id": 5,
      "bimestre_1": 16,
      "bimestre_2": 15,
      "bimestre_3": 12,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 166,
      "alumno_id": 17,
      "curso_id": 6,
      "bimestre_1": 17,
      "bimestre_2": 16,
      "bimestre_3": 14,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 167,
      "alumno_id": 17,
      "curso_id": 7,
      "bimestre_1": 18,
      "bimestre_2": 17,
      "bimestre_3": 16,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 168,
      "alumno_id": 17,
      "curso_id": 8,
      "bimestre_1": 19,
      "bimestre_2": 18,
      "bimestre_3": 18,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 169,
      "alumno_id": 17,
      "curso_id": 9,
      "bimestre_1": 20,
      "bimestre_2": 19,
      "bimestre_3": 20,
      "bimestre_4": 18,
      "promedio_final": 19
    },
    {
      "id": 170,
      "alumno_id": 17,
      "curso_id": 10,
      "bimestre_1": 12,
      "bimestre_2": 20,
      "bimestre_3": 13,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 171,
      "alumno_id": 18,
      "curso_id": 1,
      "bimestre_1": 13,
      "bimestre_2": 13,
      "bimestre_3": 14,
      "bimestre_4": 15,
      "promedio_final": 14
    },
    {
      "id": 172,
      "alumno_id": 18,
      "curso_id": 2,
      "bimestre_1": 14,
      "bimestre_2": 14,
      "bimestre_3": 16,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 173,
      "alumno_id": 18,
      "curso_id": 3,
      "bimestre_1": 15,
      "bimestre_2": 15,
      "bimestre_3": 18,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 174,
      "alumno_id": 18,
      "curso_id": 4,
      "bimestre_1": 16,
      "bimestre_2": 16,
      "bimestre_3": 20,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 175,
      "alumno_id": 18,
      "curso_id": 5,
      "bimestre_1": 17,
      "bimestre_2": 17,
      "bimestre_3": 13,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 176,
      "alumno_id": 18,
      "curso_id": 6,
      "bimestre_1": 18,
      "bimestre_2": 18,
      "bimestre_3": 15,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 177,
      "alumno_id": 18,
      "curso_id": 7,
      "bimestre_1": 19,
      "bimestre_2": 19,
      "bimestre_3": 17,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 178,
      "alumno_id": 18,
      "curso_id": 8,
      "bimestre_1": 20,
      "bimestre_2": 20,
      "bimestre_3": 19,
      "bimestre_4": 18,
      "promedio_final": 19
    },
    {
      "id": 179,
      "alumno_id": 18,
      "curso_id": 9,
      "bimestre_1": 12,
      "bimestre_2": 12,
      "bimestre_3": 12,
      "bimestre_4": 12,
      "promedio_final": 12
    },
    {
      "id": 180,
      "alumno_id": 18,
      "curso_id": 10,
      "bimestre_1": 13,
      "bimestre_2": 13,
      "bimestre_3": 14,
      "bimestre_4": 15,
      "promedio_final": 14
    },
    {
      "id": 181,
      "alumno_id": 19,
      "curso_id": 1,
      "bimestre_1": 14,
      "bimestre_2": 15,
      "bimestre_3": 15,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 182,
      "alumno_id": 19,
      "curso_id": 2,
      "bimestre_1": 15,
      "bimestre_2": 16,
      "bimestre_3": 17,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 183,
      "alumno_id": 19,
      "curso_id": 3,
      "bimestre_1": 16,
      "bimestre_2": 17,
      "bimestre_3": 19,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 184,
      "alumno_id": 19,
      "curso_id": 4,
      "bimestre_1": 17,
      "bimestre_2": 18,
      "bimestre_3": 12,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 185,
      "alumno_id": 19,
      "curso_id": 5,
      "bimestre_1": 18,
      "bimestre_2": 19,
      "bimestre_3": 14,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 186,
      "alumno_id": 19,
      "curso_id": 6,
      "bimestre_1": 19,
      "bimestre_2": 20,
      "bimestre_3": 16,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 187,
      "alumno_id": 19,
      "curso_id": 7,
      "bimestre_1": 20,
      "bimestre_2": 12,
      "bimestre_3": 18,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 188,
      "alumno_id": 19,
      "curso_id": 8,
      "bimestre_1": 12,
      "bimestre_2": 13,
      "bimestre_3": 20,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 189,
      "alumno_id": 19,
      "curso_id": 9,
      "bimestre_1": 13,
      "bimestre_2": 14,
      "bimestre_3": 13,
      "bimestre_4": 15,
      "promedio_final": 14
    },
    {
      "id": 190,
      "alumno_id": 19,
      "curso_id": 10,
      "bimestre_1": 14,
      "bimestre_2": 15,
      "bimestre_3": 15,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 191,
      "alumno_id": 20,
      "curso_id": 1,
      "bimestre_1": 15,
      "bimestre_2": 17,
      "bimestre_3": 16,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 192,
      "alumno_id": 20,
      "curso_id": 2,
      "bimestre_1": 16,
      "bimestre_2": 18,
      "bimestre_3": 18,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 193,
      "alumno_id": 20,
      "curso_id": 3,
      "bimestre_1": 17,
      "bimestre_2": 19,
      "bimestre_3": 20,
      "bimestre_4": 18,
      "promedio_final": 19
    },
    {
      "id": 194,
      "alumno_id": 20,
      "curso_id": 4,
      "bimestre_1": 18,
      "bimestre_2": 20,
      "bimestre_3": 13,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 195,
      "alumno_id": 20,
      "curso_id": 5,
      "bimestre_1": 19,
      "bimestre_2": 12,
      "bimestre_3": 15,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 196,
      "alumno_id": 20,
      "curso_id": 6,
      "bimestre_1": 20,
      "bimestre_2": 13,
      "bimestre_3": 17,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 197,
      "alumno_id": 20,
      "curso_id": 7,
      "bimestre_1": 12,
      "bimestre_2": 14,
      "bimestre_3": 19,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 198,
      "alumno_id": 20,
      "curso_id": 8,
      "bimestre_1": 13,
      "bimestre_2": 15,
      "bimestre_3": 12,
      "bimestre_4": 15,
      "promedio_final": 14
    },
    {
      "id": 199,
      "alumno_id": 20,
      "curso_id": 9,
      "bimestre_1": 14,
      "bimestre_2": 16,
      "bimestre_3": 14,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 200,
      "alumno_id": 20,
      "curso_id": 10,
      "bimestre_1": 15,
      "bimestre_2": 17,
      "bimestre_3": 16,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 201,
      "alumno_id": 21,
      "curso_id": 1,
      "bimestre_1": 16,
      "bimestre_2": 19,
      "bimestre_3": 17,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 202,
      "alumno_id": 21,
      "curso_id": 2,
      "bimestre_1": 17,
      "bimestre_2": 20,
      "bimestre_3": 19,
      "bimestre_4": 18,
      "promedio_final": 19
    },
    {
      "id": 203,
      "alumno_id": 21,
      "curso_id": 3,
      "bimestre_1": 18,
      "bimestre_2": 12,
      "bimestre_3": 12,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 204,
      "alumno_id": 21,
      "curso_id": 4,
      "bimestre_1": 19,
      "bimestre_2": 13,
      "bimestre_3": 14,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 205,
      "alumno_id": 21,
      "curso_id": 5,
      "bimestre_1": 20,
      "bimestre_2": 14,
      "bimestre_3": 16,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 206,
      "alumno_id": 21,
      "curso_id": 6,
      "bimestre_1": 12,
      "bimestre_2": 15,
      "bimestre_3": 18,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 207,
      "alumno_id": 21,
      "curso_id": 7,
      "bimestre_1": 13,
      "bimestre_2": 16,
      "bimestre_3": 20,
      "bimestre_4": 15,
      "promedio_final": 16
    },
    {
      "id": 208,
      "alumno_id": 21,
      "curso_id": 8,
      "bimestre_1": 14,
      "bimestre_2": 17,
      "bimestre_3": 13,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 209,
      "alumno_id": 21,
      "curso_id": 9,
      "bimestre_1": 15,
      "bimestre_2": 18,
      "bimestre_3": 15,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 210,
      "alumno_id": 21,
      "curso_id": 10,
      "bimestre_1": 16,
      "bimestre_2": 19,
      "bimestre_3": 17,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 211,
      "alumno_id": 22,
      "curso_id": 1,
      "bimestre_1": 17,
      "bimestre_2": 12,
      "bimestre_3": 18,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 212,
      "alumno_id": 22,
      "curso_id": 2,
      "bimestre_1": 18,
      "bimestre_2": 13,
      "bimestre_3": 20,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 213,
      "alumno_id": 22,
      "curso_id": 3,
      "bimestre_1": 19,
      "bimestre_2": 14,
      "bimestre_3": 13,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 214,
      "alumno_id": 22,
      "curso_id": 4,
      "bimestre_1": 20,
      "bimestre_2": 15,
      "bimestre_3": 15,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 215,
      "alumno_id": 22,
      "curso_id": 5,
      "bimestre_1": 12,
      "bimestre_2": 16,
      "bimestre_3": 17,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 216,
      "alumno_id": 22,
      "curso_id": 6,
      "bimestre_1": 13,
      "bimestre_2": 17,
      "bimestre_3": 19,
      "bimestre_4": 15,
      "promedio_final": 16
    },
    {
      "id": 217,
      "alumno_id": 22,
      "curso_id": 7,
      "bimestre_1": 14,
      "bimestre_2": 18,
      "bimestre_3": 12,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 218,
      "alumno_id": 22,
      "curso_id": 8,
      "bimestre_1": 15,
      "bimestre_2": 19,
      "bimestre_3": 14,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 219,
      "alumno_id": 22,
      "curso_id": 9,
      "bimestre_1": 16,
      "bimestre_2": 20,
      "bimestre_3": 16,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 220,
      "alumno_id": 22,
      "curso_id": 10,
      "bimestre_1": 17,
      "bimestre_2": 12,
      "bimestre_3": 18,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 221,
      "alumno_id": 23,
      "curso_id": 1,
      "bimestre_1": 18,
      "bimestre_2": 14,
      "bimestre_3": 19,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 222,
      "alumno_id": 23,
      "curso_id": 2,
      "bimestre_1": 19,
      "bimestre_2": 15,
      "bimestre_3": 12,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 223,
      "alumno_id": 23,
      "curso_id": 3,
      "bimestre_1": 20,
      "bimestre_2": 16,
      "bimestre_3": 14,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 224,
      "alumno_id": 23,
      "curso_id": 4,
      "bimestre_1": 12,
      "bimestre_2": 17,
      "bimestre_3": 16,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 225,
      "alumno_id": 23,
      "curso_id": 5,
      "bimestre_1": 13,
      "bimestre_2": 18,
      "bimestre_3": 18,
      "bimestre_4": 15,
      "promedio_final": 16
    },
    {
      "id": 226,
      "alumno_id": 23,
      "curso_id": 6,
      "bimestre_1": 14,
      "bimestre_2": 19,
      "bimestre_3": 20,
      "bimestre_4": 18,
      "promedio_final": 18
    },
    {
      "id": 227,
      "alumno_id": 23,
      "curso_id": 7,
      "bimestre_1": 15,
      "bimestre_2": 20,
      "bimestre_3": 13,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 228,
      "alumno_id": 23,
      "curso_id": 8,
      "bimestre_1": 16,
      "bimestre_2": 12,
      "bimestre_3": 15,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 229,
      "alumno_id": 23,
      "curso_id": 9,
      "bimestre_1": 17,
      "bimestre_2": 13,
      "bimestre_3": 17,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 230,
      "alumno_id": 23,
      "curso_id": 10,
      "bimestre_1": 18,
      "bimestre_2": 14,
      "bimestre_3": 19,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 231,
      "alumno_id": 24,
      "curso_id": 1,
      "bimestre_1": 19,
      "bimestre_2": 16,
      "bimestre_3": 20,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 232,
      "alumno_id": 24,
      "curso_id": 2,
      "bimestre_1": 20,
      "bimestre_2": 17,
      "bimestre_3": 13,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 233,
      "alumno_id": 24,
      "curso_id": 3,
      "bimestre_1": 12,
      "bimestre_2": 18,
      "bimestre_3": 15,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 234,
      "alumno_id": 24,
      "curso_id": 4,
      "bimestre_1": 13,
      "bimestre_2": 19,
      "bimestre_3": 17,
      "bimestre_4": 15,
      "promedio_final": 16
    },
    {
      "id": 235,
      "alumno_id": 24,
      "curso_id": 5,
      "bimestre_1": 14,
      "bimestre_2": 20,
      "bimestre_3": 19,
      "bimestre_4": 18,
      "promedio_final": 18
    },
    {
      "id": 236,
      "alumno_id": 24,
      "curso_id": 6,
      "bimestre_1": 15,
      "bimestre_2": 12,
      "bimestre_3": 12,
      "bimestre_4": 12,
      "promedio_final": 13
    },
    {
      "id": 237,
      "alumno_id": 24,
      "curso_id": 7,
      "bimestre_1": 16,
      "bimestre_2": 13,
      "bimestre_3": 14,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 238,
      "alumno_id": 24,
      "curso_id": 8,
      "bimestre_1": 17,
      "bimestre_2": 14,
      "bimestre_3": 16,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 239,
      "alumno_id": 24,
      "curso_id": 9,
      "bimestre_1": 18,
      "bimestre_2": 15,
      "bimestre_3": 18,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 240,
      "alumno_id": 24,
      "curso_id": 10,
      "bimestre_1": 19,
      "bimestre_2": 16,
      "bimestre_3": 20,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 241,
      "alumno_id": 25,
      "curso_id": 1,
      "bimestre_1": 20,
      "bimestre_2": 18,
      "bimestre_3": 12,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 242,
      "alumno_id": 25,
      "curso_id": 2,
      "bimestre_1": 12,
      "bimestre_2": 19,
      "bimestre_3": 14,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 243,
      "alumno_id": 25,
      "curso_id": 3,
      "bimestre_1": 13,
      "bimestre_2": 20,
      "bimestre_3": 16,
      "bimestre_4": 15,
      "promedio_final": 16
    },
    {
      "id": 244,
      "alumno_id": 25,
      "curso_id": 4,
      "bimestre_1": 14,
      "bimestre_2": 12,
      "bimestre_3": 18,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 245,
      "alumno_id": 25,
      "curso_id": 5,
      "bimestre_1": 15,
      "bimestre_2": 13,
      "bimestre_3": 20,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 246,
      "alumno_id": 25,
      "curso_id": 6,
      "bimestre_1": 16,
      "bimestre_2": 14,
      "bimestre_3": 13,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 247,
      "alumno_id": 25,
      "curso_id": 7,
      "bimestre_1": 17,
      "bimestre_2": 15,
      "bimestre_3": 15,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 248,
      "alumno_id": 25,
      "curso_id": 8,
      "bimestre_1": 18,
      "bimestre_2": 16,
      "bimestre_3": 17,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 249,
      "alumno_id": 25,
      "curso_id": 9,
      "bimestre_1": 19,
      "bimestre_2": 17,
      "bimestre_3": 19,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 250,
      "alumno_id": 25,
      "curso_id": 10,
      "bimestre_1": 20,
      "bimestre_2": 18,
      "bimestre_3": 12,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 251,
      "alumno_id": 26,
      "curso_id": 1,
      "bimestre_1": 12,
      "bimestre_2": 20,
      "bimestre_3": 13,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 252,
      "alumno_id": 26,
      "curso_id": 2,
      "bimestre_1": 13,
      "bimestre_2": 12,
      "bimestre_3": 15,
      "bimestre_4": 15,
      "promedio_final": 14
    },
    {
      "id": 253,
      "alumno_id": 26,
      "curso_id": 3,
      "bimestre_1": 14,
      "bimestre_2": 13,
      "bimestre_3": 17,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 254,
      "alumno_id": 26,
      "curso_id": 4,
      "bimestre_1": 15,
      "bimestre_2": 14,
      "bimestre_3": 19,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 255,
      "alumno_id": 26,
      "curso_id": 5,
      "bimestre_1": 16,
      "bimestre_2": 15,
      "bimestre_3": 12,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 256,
      "alumno_id": 26,
      "curso_id": 6,
      "bimestre_1": 17,
      "bimestre_2": 16,
      "bimestre_3": 14,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 257,
      "alumno_id": 26,
      "curso_id": 7,
      "bimestre_1": 18,
      "bimestre_2": 17,
      "bimestre_3": 16,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 258,
      "alumno_id": 26,
      "curso_id": 8,
      "bimestre_1": 19,
      "bimestre_2": 18,
      "bimestre_3": 18,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 259,
      "alumno_id": 26,
      "curso_id": 9,
      "bimestre_1": 20,
      "bimestre_2": 19,
      "bimestre_3": 20,
      "bimestre_4": 18,
      "promedio_final": 19
    },
    {
      "id": 260,
      "alumno_id": 26,
      "curso_id": 10,
      "bimestre_1": 12,
      "bimestre_2": 20,
      "bimestre_3": 13,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 261,
      "alumno_id": 27,
      "curso_id": 1,
      "bimestre_1": 13,
      "bimestre_2": 13,
      "bimestre_3": 14,
      "bimestre_4": 15,
      "promedio_final": 14
    },
    {
      "id": 262,
      "alumno_id": 27,
      "curso_id": 2,
      "bimestre_1": 14,
      "bimestre_2": 14,
      "bimestre_3": 16,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 263,
      "alumno_id": 27,
      "curso_id": 3,
      "bimestre_1": 15,
      "bimestre_2": 15,
      "bimestre_3": 18,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 264,
      "alumno_id": 27,
      "curso_id": 4,
      "bimestre_1": 16,
      "bimestre_2": 16,
      "bimestre_3": 20,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 265,
      "alumno_id": 27,
      "curso_id": 5,
      "bimestre_1": 17,
      "bimestre_2": 17,
      "bimestre_3": 13,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 266,
      "alumno_id": 27,
      "curso_id": 6,
      "bimestre_1": 18,
      "bimestre_2": 18,
      "bimestre_3": 15,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 267,
      "alumno_id": 27,
      "curso_id": 7,
      "bimestre_1": 19,
      "bimestre_2": 19,
      "bimestre_3": 17,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 268,
      "alumno_id": 27,
      "curso_id": 8,
      "bimestre_1": 20,
      "bimestre_2": 20,
      "bimestre_3": 19,
      "bimestre_4": 18,
      "promedio_final": 19
    },
    {
      "id": 269,
      "alumno_id": 27,
      "curso_id": 9,
      "bimestre_1": 12,
      "bimestre_2": 12,
      "bimestre_3": 12,
      "bimestre_4": 12,
      "promedio_final": 12
    },
    {
      "id": 270,
      "alumno_id": 27,
      "curso_id": 10,
      "bimestre_1": 13,
      "bimestre_2": 13,
      "bimestre_3": 14,
      "bimestre_4": 15,
      "promedio_final": 14
    },
    {
      "id": 271,
      "alumno_id": 28,
      "curso_id": 1,
      "bimestre_1": 14,
      "bimestre_2": 15,
      "bimestre_3": 15,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 272,
      "alumno_id": 28,
      "curso_id": 2,
      "bimestre_1": 15,
      "bimestre_2": 16,
      "bimestre_3": 17,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 273,
      "alumno_id": 28,
      "curso_id": 3,
      "bimestre_1": 16,
      "bimestre_2": 17,
      "bimestre_3": 19,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 274,
      "alumno_id": 28,
      "curso_id": 4,
      "bimestre_1": 17,
      "bimestre_2": 18,
      "bimestre_3": 12,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 275,
      "alumno_id": 28,
      "curso_id": 5,
      "bimestre_1": 18,
      "bimestre_2": 19,
      "bimestre_3": 14,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 276,
      "alumno_id": 28,
      "curso_id": 6,
      "bimestre_1": 19,
      "bimestre_2": 20,
      "bimestre_3": 16,
      "bimestre_4": 15,
      "promedio_final": 18
    },
    {
      "id": 277,
      "alumno_id": 28,
      "curso_id": 7,
      "bimestre_1": 20,
      "bimestre_2": 12,
      "bimestre_3": 18,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 278,
      "alumno_id": 28,
      "curso_id": 8,
      "bimestre_1": 12,
      "bimestre_2": 13,
      "bimestre_3": 20,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 279,
      "alumno_id": 28,
      "curso_id": 9,
      "bimestre_1": 13,
      "bimestre_2": 14,
      "bimestre_3": 13,
      "bimestre_4": 15,
      "promedio_final": 14
    },
    {
      "id": 280,
      "alumno_id": 28,
      "curso_id": 10,
      "bimestre_1": 14,
      "bimestre_2": 15,
      "bimestre_3": 15,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 281,
      "alumno_id": 29,
      "curso_id": 1,
      "bimestre_1": 15,
      "bimestre_2": 17,
      "bimestre_3": 16,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 282,
      "alumno_id": 29,
      "curso_id": 2,
      "bimestre_1": 16,
      "bimestre_2": 18,
      "bimestre_3": 18,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 283,
      "alumno_id": 29,
      "curso_id": 3,
      "bimestre_1": 17,
      "bimestre_2": 19,
      "bimestre_3": 20,
      "bimestre_4": 18,
      "promedio_final": 19
    },
    {
      "id": 284,
      "alumno_id": 29,
      "curso_id": 4,
      "bimestre_1": 18,
      "bimestre_2": 20,
      "bimestre_3": 13,
      "bimestre_4": 12,
      "promedio_final": 16
    },
    {
      "id": 285,
      "alumno_id": 29,
      "curso_id": 5,
      "bimestre_1": 19,
      "bimestre_2": 12,
      "bimestre_3": 15,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 286,
      "alumno_id": 29,
      "curso_id": 6,
      "bimestre_1": 20,
      "bimestre_2": 13,
      "bimestre_3": 17,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 287,
      "alumno_id": 29,
      "curso_id": 7,
      "bimestre_1": 12,
      "bimestre_2": 14,
      "bimestre_3": 19,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 288,
      "alumno_id": 29,
      "curso_id": 8,
      "bimestre_1": 13,
      "bimestre_2": 15,
      "bimestre_3": 12,
      "bimestre_4": 15,
      "promedio_final": 14
    },
    {
      "id": 289,
      "alumno_id": 29,
      "curso_id": 9,
      "bimestre_1": 14,
      "bimestre_2": 16,
      "bimestre_3": 14,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 290,
      "alumno_id": 29,
      "curso_id": 10,
      "bimestre_1": 15,
      "bimestre_2": 17,
      "bimestre_3": 16,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 291,
      "alumno_id": 30,
      "curso_id": 1,
      "bimestre_1": 16,
      "bimestre_2": 19,
      "bimestre_3": 17,
      "bimestre_4": 15,
      "promedio_final": 17
    },
    {
      "id": 292,
      "alumno_id": 30,
      "curso_id": 2,
      "bimestre_1": 17,
      "bimestre_2": 20,
      "bimestre_3": 19,
      "bimestre_4": 18,
      "promedio_final": 19
    },
    {
      "id": 293,
      "alumno_id": 30,
      "curso_id": 3,
      "bimestre_1": 18,
      "bimestre_2": 12,
      "bimestre_3": 12,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 294,
      "alumno_id": 30,
      "curso_id": 4,
      "bimestre_1": 19,
      "bimestre_2": 13,
      "bimestre_3": 14,
      "bimestre_4": 15,
      "promedio_final": 15
    },
    {
      "id": 295,
      "alumno_id": 30,
      "curso_id": 5,
      "bimestre_1": 20,
      "bimestre_2": 14,
      "bimestre_3": 16,
      "bimestre_4": 18,
      "promedio_final": 17
    },
    {
      "id": 296,
      "alumno_id": 30,
      "curso_id": 6,
      "bimestre_1": 12,
      "bimestre_2": 15,
      "bimestre_3": 18,
      "bimestre_4": 12,
      "promedio_final": 14
    },
    {
      "id": 297,
      "alumno_id": 30,
      "curso_id": 7,
      "bimestre_1": 13,
      "bimestre_2": 16,
      "bimestre_3": 20,
      "bimestre_4": 15,
      "promedio_final": 16
    },
    {
      "id": 298,
      "alumno_id": 30,
      "curso_id": 8,
      "bimestre_1": 14,
      "bimestre_2": 17,
      "bimestre_3": 13,
      "bimestre_4": 18,
      "promedio_final": 16
    },
    {
      "id": 299,
      "alumno_id": 30,
      "curso_id": 9,
      "bimestre_1": 15,
      "bimestre_2": 18,
      "bimestre_3": 15,
      "bimestre_4": 12,
      "promedio_final": 15
    },
    {
      "id": 300,
      "alumno_id": 30,
      "curso_id": 10,
      "bimestre_1": 16,
      "bimestre_2": 19,
      "bimestre_3": 17,
      "bimestre_4": 15,
      "promedio_final": 17
    }
  ]
};

export const CONFIG_HORAS_SECUNDARIA = [
  { bloque_orden: 1, hora: '08:00 - 08:45' },
  { bloque_orden: 2, hora: '08:45 - 09:30' },
  { bloque_orden: 3, hora: '09:30 - 10:15' },
  { bloque_orden: 'RECREO', hora: '10:15 - 10:45' },
  { bloque_orden: 4, hora: '10:45 - 11:30' },
  { bloque_orden: 5, hora: '11:30 - 12:15' },
  { bloque_orden: 6, hora: '12:15 - 13:00' },
  { bloque_orden: 7, hora: '13:00 - 13:45' }
];

export const DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
