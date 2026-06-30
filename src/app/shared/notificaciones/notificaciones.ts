import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificaciones.html',
  styleUrls: ['./notificaciones.css']
})
export class Notificaciones implements OnInit, OnDestroy {
  listaNotificaciones: any[] = [];
  cargando = true;
  private sub!: Subscription;

  // Notificaciones por defecto (fallback)
  private readonly notifDefault = [
    {
      id: 1, tipo: 'bienvenida', leida: false,
      titulo: 'Bienvenido al Portal San Alfonso',
      mensaje: 'Accede a tus cursos, horarios, finanzas y trámites desde aquí.',
      fecha: 'Hoy'
    },
    {
      id: 2, tipo: 'administrativo', leida: false,
      titulo: 'Pensión Abril Pendiente',
      mensaje: 'Recuerda que tienes una pensión pendiente de pago antes del 05/04.',
      fecha: 'Hace 1 día'
    },
    {
      id: 3, tipo: 'academico', leida: true,
      titulo: 'Cierre de Notas 3er Bimestre',
      mensaje: 'El registro de notas del 3er bimestre cierra el 15/07. Consulta tu historial.',
      fecha: 'Hace 3 días'
    },
    {
      id: 4, tipo: 'material', leida: true,
      titulo: 'Material de Clase Disponible',
      mensaje: 'Tu docente ha subido nuevo material al portal. Revisa la sección de cursos.',
      fecha: 'Hace 5 días'
    }
  ];

  constructor(
    private authService: AuthService,
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub = this.authService.usuario$.subscribe(async u => {
      if (u) {
        try {
          const { data, error } = await this.supabaseService.getNotificacionesByUsuario(u.id, u.role);
          if (data && !error && data.length > 0) {
            this.listaNotificaciones = data.map((n: any) => ({
              id: n.id,
              tipo: 'academico',
              titulo: n.titulo,
              mensaje: n.mensaje,
              leida: n.leido,
              fecha: this.tiempoRelativo(n.fecha_creacion)
            }));
          } else {
            if (u.role === 'docente') {
              this.listaNotificaciones = [
                {
                  id: 1, tipo: 'bienvenida', leida: false,
                  titulo: 'Bienvenido al Portal Docente',
                  mensaje: 'Gestione sus cursos, asistencia, materiales y calificaciones.',
                  fecha: 'Hoy'
                },
                {
                  id: 2, tipo: 'administrativo', leida: false,
                  titulo: 'Carga Académica Confirmada',
                  mensaje: 'Su horario de clases ha sido cargado en el sistema.',
                  fecha: 'Hace 1 día'
                },
                {
                  id: 3, tipo: 'academico', leida: true,
                  titulo: 'Cierre de Bimestre Académico',
                  mensaje: 'Colega, recuerde que el ingreso de notas finales culmina esta semana.',
                  fecha: 'Hace 3 días'
                }
              ];
            } else {
              this.listaNotificaciones = [...this.notifDefault];
            }
          }
        } catch {
          this.listaNotificaciones = [...this.notifDefault];
        }
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  tiempoRelativo(fechaStr: string): string {
    const fecha = new Date(fechaStr);
    const ahora = new Date();
    const diffMs = ahora.getTime() - fecha.getTime();
    const diffH = Math.floor(diffMs / (1000 * 60 * 60));
    const diffD = Math.floor(diffH / 24);
    if (diffH < 1) return 'Hace unos minutos';
    if (diffH < 24) return `Hace ${diffH} hora${diffH > 1 ? 's' : ''}`;
    if (diffD === 1) return 'Ayer';
    return `Hace ${diffD} días`;
  }

  marcarComoLeidas() {
    this.listaNotificaciones.forEach(n => n.leida = true);
  }

  eliminarNotificacion(id: number) {
    this.listaNotificaciones = this.listaNotificaciones.filter(n => n.id !== id);
  }
}
