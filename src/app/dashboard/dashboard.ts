import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

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
export class DashboardComponent implements OnInit, OnDestroy {
  seccionActiva: string = 'cursos';
  usuarioRol: string = 'alumno';
  usuario: any = null;
  menuAbierto: boolean = false;
  private sub!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.sub = this.authService.usuario$.subscribe(u => {
      this.usuario = u;
      this.usuarioRol = u?.role || 'alumno';
      if (!this.seccionActiva || this.seccionActiva === 'cursos') {
        this.seccionActiva = this.usuarioRol === 'docente' ? 'aulas' : 'cursos';
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  cambiarSeccion(nuevaSeccion: string) {
    this.seccionActiva = nuevaSeccion;
    this.menuAbierto = false;
  }

  cerrarSesion() {
    this.authService.logout();
  }
}
