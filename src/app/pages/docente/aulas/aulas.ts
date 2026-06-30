// src/app/pages/docente/aulas/aulas.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SAN_ALFONSO_DB } from '../../../shared/data/db';

@Component({
  selector: 'app-aulas',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importaciones necesarias para plantillas y formularios
  templateUrl: './aulas.html',
  styleUrl: './aulas.css',
})
export class Aulas implements OnInit {
  // Simulamos que el docente con ID 1 (Carlos Mendoza) ha iniciado sesión.
  docenteId: number = 0;

  aulasAsignadas: any[] = [];
  aulaSeleccionada: any = null;
  estudiantes: any[] = [];

  // Guardará la asistencia usando el ID del alumno como clave
  asistencias: { [alumnoId: number]: string } = {};
  fechaAsistencia: string = new Date().toISOString().split('T')[0];
  mensajeExito: string = '';

  ngOnInit(): void {
    // 1. Recuperamos el ID dinámico desde el localStorage
    const idGuardado = localStorage.getItem('docenteId');

    if (idGuardado) {
      // 2. Lo convertimos a número y se lo asignamos a la variable
      this.docenteId = parseInt(idGuardado, 10);
    } else {
      // (Opcional) Si no hay ID, podrías redirigir al usuario de vuelta al login
      console.warn("No hay sesión iniciada");
    }
    this.cargarAulasAsignadas();
  }

  cargarAulasAsignadas(): void {
    // Este código ahora filtrará automáticamente los datos de db.ts
    // basándose en el docente que realmente inició sesión.
    const horariosDelDocente = SAN_ALFONSO_DB.horarios.filter(h => h.docente_id === this.docenteId);
    const aulasIds = [...new Set(horariosDelDocente.map(h => h.aula_id))];
    this.aulasAsignadas = SAN_ALFONSO_DB.aulas.filter(aula => aulasIds.includes(aula.id));
  }

  seleccionarAula(aula: any): void {
    this.aulaSeleccionada = aula;
    this.mensajeExito = '';
    this.cargarEstudiantes(aula.id);
  }

  cargarEstudiantes(aulaId: number): void {
    // Buscamos los alumnos que pertenecen a la sección seleccionada
    this.estudiantes = SAN_ALFONSO_DB.alumnos.filter(alumno => alumno.aula_id === aulaId);

    // Inicializamos la asistencia por defecto (ej. todos 'Presente')
    this.asistencias = {};
    this.estudiantes.forEach(est => {
      this.asistencias[est.id] = 'Presente';
    });
  }

  marcarAsistencia(alumnoId: number, estado: string): void {
    this.asistencias[alumnoId] = estado;
  }

  guardarAsistencias(): void {
    // Lógica para enviar los datos de asistencia al servidor
    console.log(`Guardando asistencias del aula ${this.aulaSeleccionada.id} - Fecha: ${this.fechaAsistencia}`);
    console.log('Registro:', this.asistencias);

    this.mensajeExito = 'Asistencias registradas correctamente.';

    // El mensaje desaparece luego de 3 segundos
    setTimeout(() => {
      this.mensajeExito = '';
    }, 3000);
  }

  volverListaAulas(): void {
    this.aulaSeleccionada = null;
    this.estudiantes = [];
    this.asistencias = {};
    this.mensajeExito = '';
  }
}
