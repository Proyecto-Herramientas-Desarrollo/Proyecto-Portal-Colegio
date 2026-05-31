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

  calificaciones: [
    { id: 1, alumno_id: 3, curso_id: 1, estado: 'Aprobado', nota_final: 17.5, periodo: '2026 - Segundo Semestre' },
    { id: 2, alumno_id: 3, curso_id: 2, estado: 'Aprobado', nota_final: 16.0, periodo: '2026 - Segundo Semestre' },
    { id: 3, alumno_id: 3, curso_id: 3, estado: 'Pendiente', nota_final: null, periodo: '2026 - Segundo Semestre' },
    { id: 4, alumno_id: 3, curso_id: 9, estado: 'Aprobado', nota_final: 15.8, periodo: '2026 - Segundo Semestre' },
    { id: 5, alumno_id: 3, curso_id: 10, estado: 'Aprobado', nota_final: 14.5, periodo: '2026 - Segundo Semestre' }
  ]
};
