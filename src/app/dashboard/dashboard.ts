import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importaciones de tus componentes
import { PerfilMini } from '../shared/perfil-mini/perfil-mini';
import { Cursos } from '../pages/alumno/cursos/cursos';
import { Horario } from '../pages/alumno/horario/horario';
import { Mensajes } from '../shared/mensajes/mensajes';
import { Notificaciones } from '../shared/notificaciones/notificaciones';
import { Finanzas } from '../pages/alumno/finanzas/finanzas';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PerfilMini,
    Cursos,
    Horario,
    Mensajes,
    Notificaciones,
    Finanzas,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  seccionActiva: string = 'cursos';

  cambiarSeccion(nuevaSeccion: string) {
    this.seccionActiva = nuevaSeccion;
  }
}
