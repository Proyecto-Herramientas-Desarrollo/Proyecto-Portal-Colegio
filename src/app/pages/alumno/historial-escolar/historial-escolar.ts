import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SAN_ALFONSO_DB } from '../../../shared/data/db';
import { AuthService } from '../../../auth/auth';
import { SupabaseService } from '../../../shared/services/supabase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-historial-escolar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-escolar.html',
  styleUrl: './historial-escolar.css',
})
export class HistorialEscolar implements OnInit, OnDestroy {
  usuarioReal: any = null;
  usuarioMostrar: any = null;
  aulaActual: any = null;
  calificaciones: any[] = [];
  promedioGeneral: number = 0;
  cursosAprobadosCount: number = 0;
  private sub!: Subscription;

  constructor(
    private authService: AuthService,
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub = this.authService.usuario$.subscribe(async u => {
      this.usuarioReal = u;
      if (u?.role === 'alumno') {
        const alumno = SAN_ALFONSO_DB.alumnos.find(a => a.id === u.id)
          ?? { id: u.id, aula_id: u.aula_id };
        this.usuarioMostrar = { ...u, ...alumno };
        const aulaId = alumno.aula_id ?? u.aula_id;
        this.aulaActual = SAN_ALFONSO_DB.aulas.find(aula => aula.id === aulaId) || null;
        await this.cargarHistorialAcademico(u.id);
      } else {
        this.usuarioMostrar = u;
        this.aulaActual = null;
        this.calificaciones = [];
        this.promedioGeneral = 0;
        this.cursosAprobadosCount = 0;
      }
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  async cargarHistorialAcademico(alumnoId: number) {
    try {
      const { data, error } = await this.supabaseService.getNotasByAlumno(alumnoId);
      if (data && !error && data.length > 0) {
        this.calificaciones = data.map((nota: any) => ({
          id: nota.id,
          alumno_id: nota.alumno_id,
          curso_id: nota.curso_id,
          bimestre_1: nota.bimestre_1 !== null ? Number(nota.bimestre_1) : null,
          bimestre_2: nota.bimestre_2 !== null ? Number(nota.bimestre_2) : null,
          bimestre_3: nota.bimestre_3 !== null ? Number(nota.bimestre_3) : null,
          bimestre_4: nota.bimestre_4 !== null ? Number(nota.bimestre_4) : null,
          promedio_final: nota.promedio_final !== null ? Number(nota.promedio_final) : null,
          curso: nota.cursos || SAN_ALFONSO_DB.cursos.find(c => c.id === nota.curso_id)
        }));
      } else {
        this.cargarFallbackLocal(alumnoId);
      }
    } catch {
      this.cargarFallbackLocal(alumnoId);
    }

    this.calcularMetricas();
  }

  private cargarFallbackLocal(alumnoId: number) {
    this.calificaciones = SAN_ALFONSO_DB.notas
      .filter(registro => registro.alumno_id === alumnoId)
      .map(registro => ({
        ...registro,
        curso: SAN_ALFONSO_DB.cursos.find(curso => curso.id === registro.curso_id)
      }));
  }

  private calcularMetricas() {
    if (this.calificaciones.length === 0) {
      this.promedioGeneral = 0;
      this.cursosAprobadosCount = 0;
      return;
    }

    let suma = 0;
    let count = 0;
    let aprobados = 0;

    for (const nota of this.calificaciones) {
      if (nota.promedio_final !== null && nota.promedio_final !== undefined) {
        suma += nota.promedio_final;
        count++;
        if (nota.promedio_final >= 11) {
          aprobados++;
        }
      }
    }

    this.promedioGeneral = count > 0 ? parseFloat((suma / count).toFixed(1)) : 0;
    this.cursosAprobadosCount = aprobados;
  }
}
