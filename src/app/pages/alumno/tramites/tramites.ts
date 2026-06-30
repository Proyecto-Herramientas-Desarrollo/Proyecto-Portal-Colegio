import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth';
import { SupabaseService } from '../../../shared/services/supabase.service';
import { SAN_ALFONSO_DB } from '../../../shared/data/db';

@Component({
  selector: 'app-tramites',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tramites.html',
  styleUrls: ['./tramites.css']
})
export class TramitesComponent implements OnInit, OnDestroy {
  alumnoActual: any;
  misTramites: any[] = [];
  nuevoTramite = { tipo: '' };
  mostrarModal = false;
  dniAlumno = '';
  alertaExito = false;
  cargando = true;
  private sub!: Subscription;
  private usuarioActual: any;

  constructor(
    private authService: AuthService,
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub = this.authService.usuario$.subscribe(async u => {
      if (u) {
        this.usuarioActual = u;
        this.alumnoActual = (SAN_ALFONSO_DB.alumnos as any[]).find(a => a.id === u.id)
          ?? { nombre: u.nombre, apellido: u.apellido, dni: u.dni };

        try {
          const { data, error } = await this.supabaseService.getTramitesByAlumno(u.id);
          if (data && !error && data.length > 0) {
            this.misTramites = data.map((t: any) => ({
              id: t.id,
              fecha: t.fecha_solicitud,
              tipo: t.tipo,
              estado: t.estado
            }));
          } else {
            // Fallback con trámites de ejemplo
            this.misTramites = [
              { id: 1, fecha: '2026-06-20', tipo: 'Constancia de Estudios', estado: 'Aprobado' },
              { id: 2, fecha: '2026-06-25', tipo: 'Certificado de Notas', estado: 'Pendiente' }
            ];
          }
        } catch {
          this.misTramites = [
            { id: 1, fecha: '2026-06-20', tipo: 'Constancia de Estudios', estado: 'Aprobado' },
            { id: 2, fecha: '2026-06-25', tipo: 'Certificado de Notas', estado: 'Pendiente' }
          ];
        }
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  abrirModal() {
    if (this.nuevoTramite.tipo !== '') {
      this.mostrarModal = true;
      this.dniAlumno = '';
    } else {
      alert('Por favor, selecciona un tipo de trámite primero.');
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  async confirmarSolicitud() {
    if (this.dniAlumno.trim().length >= 8) {
      const hoy = new Date().toISOString().split('T')[0];

      // Agregar a UI de inmediato
      this.misTramites.unshift({
        id: Date.now(),
        fecha: hoy,
        tipo: this.nuevoTramite.tipo,
        estado: 'Pendiente'
      });

      // Intentar guardar en Supabase
      if (this.usuarioActual?.id) {
        try {
          await this.supabaseService.insertTramite(this.usuarioActual.id, this.nuevoTramite.tipo);
        } catch (e) {
          console.warn('No se pudo guardar trámite en Supabase:', e);
        }
      }

      this.mostrarModal = false;
      this.nuevoTramite.tipo = '';
      this.dniAlumno = '';
      this.alertaExito = true;
      setTimeout(() => { this.alertaExito = false; }, 3500);
    } else {
      alert('DNI Inválido. Por favor, ingresa los 8 dígitos.');
    }
  }

  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const [y, m, d] = fecha.split('-');
    return `${d}/${m}/${y}`;
  }
}