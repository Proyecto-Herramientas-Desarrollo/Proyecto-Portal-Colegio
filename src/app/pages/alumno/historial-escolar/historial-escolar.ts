import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SAN_ALFONSO_DB } from '../../../shared/data/db';

@Component({
  selector: 'app-historial-escolar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-escolar.html',
  styleUrl: './historial-escolar.css',
})
export class HistorialEscolar implements OnInit {
  usuarioReal: any = null;
  usuarioMostrar: any = null;
  aulaActual: any = null;
  calificaciones: any[] = [];

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

    // Cargar datos reales del usuario en pantalla
    this.cargarDatosReales();
  }

  cargarDatosReales() {
    if (this.usuarioReal?.role === 'alumno') {
      const alumno = SAN_ALFONSO_DB.alumnos.find(a => a.id === this.usuarioReal.id);
      if (alumno) {
        this.usuarioMostrar = { ...this.usuarioReal, ...alumno };
        this.aulaActual = SAN_ALFONSO_DB.aulas.find(aula => aula.id === alumno.aula_id) || null;
        this.cargarHistorialAcademico(alumno.id);
      }
    } else {
      // Si por alguna razón el usuario no es alumno, intentar buscar información básica
      this.usuarioMostrar = this.usuarioReal;
      this.aulaActual = null;
      this.calificaciones = [];
    }
  }

  cargarHistorialAcademico(alumnoId: number) {
    this.calificaciones = SAN_ALFONSO_DB.calificaciones
      .filter(registro => registro.alumno_id === alumnoId)
      .map(registro => ({
        ...registro,
        curso: SAN_ALFONSO_DB.cursos.find(curso => curso.id === registro.curso_id)
      }));
  }
}
