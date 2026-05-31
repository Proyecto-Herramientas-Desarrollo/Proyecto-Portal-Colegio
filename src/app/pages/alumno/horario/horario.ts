import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importamos la Base de Datos simulada
import { SAN_ALFONSO_DB } from '../../../shared/data/db'; 

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horario.html',
  styleUrl: './horario.css'
})
export class Horario implements OnInit {
  alumnoActual: any;
  aulaActual: any;
  
  // Estructura de días y bloques de horas
  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  horas = [
    { hora: '08:00 - 09:30', tipo: 'clase' },
    { hora: '09:30 - 11:00', tipo: 'clase' },
    { hora: '11:00 - 11:30', tipo: 'recreo' },
    { hora: '11:30 - 13:00', tipo: 'clase' },
    { hora: '13:00 - 14:30', tipo: 'clase' }
  ];

  // Matriz simulada del horario (Repartiendo las horas semanales)
  horarioSemanal: any = {};

  ngOnInit() {
    // 1. Obtenemos tu info (ID 3)
    this.alumnoActual = SAN_ALFONSO_DB.alumnos.find(a => a.id === 3);
    if (this.alumnoActual) {
      this.aulaActual = SAN_ALFONSO_DB.aulas.find(aula => aula.id === this.alumnoActual.aula_id);
    }

    // 2. Distribuimos los cursos simulando el horario del colegio
    this.horarioSemanal = {
      'Lunes': ['Matemática', 'Comunicación', 'Recreo', 'CIT', 'Inglés'],
      'Martes': ['Comunicación', 'Matemática', 'Recreo', 'Historia y Geografía', 'Educación Física'],
      'Miércoles': ['CIT', 'Inglés', 'Recreo', 'Matemática', 'Arte'],
      'Jueves': ['Historia y Geografía', 'Humanidades', 'Recreo', 'Comunicación', 'Educación para el Trabajo'],
      'Viernes': ['Humanidades', 'Educación para el Trabajo', 'Recreo', 'Religión', 'Matemática']
    };
  }
}