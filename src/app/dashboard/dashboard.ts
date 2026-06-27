import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importaciones de tus componentes
import { PerfilMini } from '../shared/perfil-mini/perfil-mini';
import { Cursos } from '../pages/alumno/cursos/cursos';
import { Horario } from '../pages/alumno/horario/horario';
import { Mensajes } from '../shared/mensajes/mensajes';
import { Notificaciones } from '../shared/notificaciones/notificaciones';
import { Finanzas } from '../pages/alumno/finanzas/finanzas';
import { HistorialEscolar } from '../pages/alumno/historial-escolar/historial-escolar';
import { PerfilComponent } from '../pages/perfil/perfil';
import { Aulas } from '../pages/docente/aulas/aulas';
// AQUÍ IMPORTAMOS TU NUEVO COMPONENTE:
import { TramitesComponent } from '../pages/alumno/tramites/tramites'; 

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
    HistorialEscolar,
    PerfilComponent,
    Aulas,
    TramitesComponent // LO AÑADIMOS AQUÍ PARA PODER USARLO
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  seccionActiva: string = 'cursos';
  usuarioRol: string = 'alumno';
  usuario: any = null;

  ngOnInit() {
    this.cargarSesion();
  }

  cargarSesion() {
    const sesionRaw = localStorage.getItem('usuario_sesion');
    if (sesionRaw) {
      try {
        this.usuario = JSON.parse(sesionRaw);
        this.usuarioRol = this.usuario.role || 'alumno';
      } catch (e) {
        this.usuarioRol = 'alumno';
      }
    } else {
      this.usuarioRol = 'alumno';
    }

    // Cambiar la sección inicial según el rol
    if (this.usuarioRol === 'docente') {
      this.seccionActiva = 'aulas';
    } else {
      this.seccionActiva = 'cursos';
    }
  }

  cambiarSeccion(nuevaSeccion: string) {
    this.seccionActiva = nuevaSeccion;
  }
}