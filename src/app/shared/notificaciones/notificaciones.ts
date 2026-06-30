import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificaciones.html',
  styleUrls: ['./notificaciones.css']
})
export class Notificaciones {
  // Simulamos la base de datos de alertas del alumno
  listaNotificaciones = [
    { 
      id: 1, 
      tipo: 'urgente', 
      titulo: 'Tarea por vencer', 
      mensaje: 'La Práctica Calificada 1 de Matemática vence hoy a las 23:59.', 
      fecha: 'Hace 2 horas', 
      leida: false 
    },
    { 
      id: 2, 
      tipo: 'academico', 
      titulo: 'Nueva Calificación', 
      mensaje: 'El Profesor Carlos Mendoza ha subido tu nota del Trabajo de Investigación.', 
      fecha: 'Hace 5 horas', 
      leida: false 
    },
    { 
      id: 3, 
      tipo: 'material', 
      titulo: 'Nuevo Material de Clase', 
      mensaje: 'Se ha publicado un nuevo PDF en el curso de Comunicación.', 
      fecha: 'Ayer', 
      leida: true 
    },
    { 
      id: 4, 
      tipo: 'administrativo', 
      titulo: 'Trámite Actualizado', 
      mensaje: 'Tu solicitud de Constancia de Estudios (RF-E07) ha sido Aprobada.', 
      fecha: 'Hace 3 días', 
      leida: true 
    }
  ];

  // Función para limpiar la bandeja
  marcarComoLeidas() {
    this.listaNotificaciones.forEach(notif => notif.leida = true);
  }

  // Función para borrar una alerta específica
  eliminarNotificacion(id: number) {
    this.listaNotificaciones = this.listaNotificaciones.filter(notif => notif.id !== id);
  }
}
