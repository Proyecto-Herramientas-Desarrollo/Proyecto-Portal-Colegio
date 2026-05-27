import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SAN_ALFONSO_DB } from '../../../shared/data/db'; 

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css'
})
export class Cursos implements OnInit {
  listaCursos: any[] = [];
  alumnoActual: any;
  aulaActual: any; // Variable para guardar el aula específica

  ngOnInit() {
    // 1. Obtenemos tus datos (ID 3)
    this.alumnoActual = SAN_ALFONSO_DB.alumnos.find(a => a.id === 3);
    
    // 2. REQUISITO DEL TICKET: Información personalizada según su aula_id
    if (this.alumnoActual) {
      this.aulaActual = SAN_ALFONSO_DB.aulas.find(aula => aula.id === this.alumnoActual.aula_id);
    }

    // 3. Consumiendo las materias del catálogo
    this.listaCursos = SAN_ALFONSO_DB.cursos;
  }
}