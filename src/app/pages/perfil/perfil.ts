import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SAN_ALFONSO_DB } from '../../shared/data/db';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent implements OnInit {
  usuarioReal: any = null;
  
  // Datos del perfil a mostrar (pueden ser simulados por el filtro)
  usuarioMostrar: any = null;
  aulaActual: any = null;
  cursoDocente: any = null;
  
  // Control de filtro: 'alumno' | 'docente'
  filtroRol: string = 'alumno';

  ngOnInit() {
    this.cargarUsuarioReal();
  }

  cargarUsuarioReal() {
    const sesionRaw = localStorage.getItem('usuario_sesion');
    if (sesionRaw) {
      try {
        this.usuarioReal = JSON.parse(sesionRaw);
      } catch (e) {
        this.usuarioReal = null;
      }
    }

    // Fallback si no hay sesión
    if (!this.usuarioReal) {
      const fallbackAlumno = SAN_ALFONSO_DB.alumnos.find(a => a.id === 3);
      if (fallbackAlumno) {
        this.usuarioReal = {
          role: 'alumno',
          id: fallbackAlumno.id,
          dni: fallbackAlumno.dni,
          nombre: fallbackAlumno.nombre,
          apellido: fallbackAlumno.apellido
        };
      }
    }

    // Inicializar el filtro con el rol del usuario que inició sesión
    this.filtroRol = this.usuarioReal?.role || 'alumno';
    this.aplicarFiltro();
  }

  aplicarFiltro() {
    if (this.filtroRol === this.usuarioReal?.role) {
      // Mostrar datos del usuario real logueado
      this.cargarDatosReales();
    } else {
      // Mostrar datos simulados del otro rol para fines del backlog visual #5
      this.cargarDatosSimulados(this.filtroRol);
    }
  }

  cargarDatosReales() {
    if (this.usuarioReal.role === 'alumno') {
      const alumno = SAN_ALFONSO_DB.alumnos.find(a => a.id === this.usuarioReal.id);
      if (alumno) {
        this.usuarioMostrar = {
          ...this.usuarioReal,
          ...alumno
        };
        this.aulaActual = SAN_ALFONSO_DB.aulas.find(aula => aula.id === alumno.aula_id);
      }
    } else if (this.usuarioReal.role === 'docente') {
      const docente = SAN_ALFONSO_DB.docentes.find(d => d.id === this.usuarioReal.id);
      if (docente) {
        this.usuarioMostrar = {
          ...this.usuarioReal,
          ...docente
        };
        this.cursoDocente = SAN_ALFONSO_DB.cursos.find(c => c.id === docente.especialidad_curso_id);
      }
    }
  }

  cargarDatosSimulados(rolASimular: string) {
    if (rolASimular === 'alumno') {
      const alumnoSimulado = SAN_ALFONSO_DB.alumnos[0];
      this.usuarioMostrar = {
        role: 'alumno',
        id: alumnoSimulado.id,
        dni: alumnoSimulado.dni,
        nombre: alumnoSimulado.nombre,
        apellido: alumnoSimulado.apellido,
        aula_id: alumnoSimulado.aula_id
      };
      this.aulaActual = SAN_ALFONSO_DB.aulas.find(aula => aula.id === alumnoSimulado.aula_id);
      this.cursoDocente = null;
    } else if (rolASimular === 'docente') {
      const docenteSimulado = SAN_ALFONSO_DB.docentes[0];
      this.usuarioMostrar = {
        role: 'docente',
        id: docenteSimulado.id,
        dni: docenteSimulado.dni,
        nombre: docenteSimulado.nombre,
        apellido: docenteSimulado.apellido,
        especialidad_curso_id: docenteSimulado.especialidad_curso_id
      };
      this.cursoDocente = SAN_ALFONSO_DB.cursos.find(c => c.id === docenteSimulado.especialidad_curso_id);
      this.aulaActual = null;
    }
  }
}
