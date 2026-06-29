import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SAN_ALFONSO_DB } from '../../../shared/data/db'; 
import { DetalleCursoComponent } from './detalle-curso/detalle-curso'; 

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, DetalleCursoComponent], 
  templateUrl: './cursos.html',
  styleUrl: './cursos.css'
})
export class Cursos implements OnInit {
  listaCursos: any[] = [];
  alumnoActual: any;
  aulaActual: any; 

  // Variable para saber qué curso abrir en la ventana
  cursoSeleccionado: any = null;

  ngOnInit() {
    // 1. Obtenemos tus datos (ID 3)
    this.alumnoActual = SAN_ALFONSO_DB.alumnos.find(a => a.id === 3);
    
    // 2. Información personalizada según su aula_id
    if (this.alumnoActual) {
      this.aulaActual = SAN_ALFONSO_DB.aulas.find(aula => aula.id === this.alumnoActual.aula_id);
    }

    // 3. Consumiendo las materias del catálogo
    this.listaCursos = SAN_ALFONSO_DB.cursos;
  }

  // Funciones para controlar la ventana flotante
  abrirDetalle(curso: any) {
    this.cursoSeleccionado = curso; // Guarda el curso (Matemática, CIT, Inglés, etc)
  }

  cerrarDetalle() {
    this.cursoSeleccionado = null; // Oculta la ventana
  }
}