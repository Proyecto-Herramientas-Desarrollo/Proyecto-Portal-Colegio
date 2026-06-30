import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SAN_ALFONSO_DB } from '../../../shared/data/db';
import { DetalleCursoComponent } from './detalle-curso/detalle-curso';
import { AuthService } from '../../../auth/auth';
import { SupabaseService } from '../../../shared/services/supabase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, DetalleCursoComponent],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css'
})
export class Cursos implements OnInit, OnDestroy {
  listaCursos: any[] = [];
  alumnoActual: any;
  aulaActual: any;
  cursoSeleccionado: any = null;
  private sub!: Subscription;

  constructor(
    private authService: AuthService,
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub = this.authService.usuario$.subscribe(async u => {
      if (u) {
        this.alumnoActual = SAN_ALFONSO_DB.alumnos.find(a => a.id === u.id)
          ?? { nombre: u.nombre, apellido: u.apellido, aula_id: u.aula_id };
        const aulaId = this.alumnoActual?.aula_id ?? u.aula_id;
        this.aulaActual = SAN_ALFONSO_DB.aulas.find(aula => aula.id === aulaId);
        
        await this.cargarCursos();
      }
    });
  }

  async cargarCursos() {
    try {
      const { data, error } = await this.supabaseService.getCursos();
      if (data && !error && data.length > 0) {
        this.listaCursos = data;
      } else {
        this.listaCursos = SAN_ALFONSO_DB.cursos;
      }
    } catch {
      this.listaCursos = SAN_ALFONSO_DB.cursos;
    }
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  abrirDetalle(curso: any) {
    this.cursoSeleccionado = curso;
    this.cdr.detectChanges();
  }

  cerrarDetalle() {
    this.cursoSeleccionado = null;
    this.cdr.detectChanges();
  }
}