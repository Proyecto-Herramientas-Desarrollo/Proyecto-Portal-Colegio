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
import { TramitesComponent } from '../pages/alumno/tramites/tramites';
import { AuthService } from '../auth/auth';

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
    TramitesComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  seccionActiva: string = 'cursos';
  usuarioRol: string = 'alumno';
  usuario: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Leer usuario directamente del AuthService (que usa Supabase)
    this.usuario = this.authService.getUsuario();
    this.usuarioRol = this.usuario?.role || 'alumno';

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
