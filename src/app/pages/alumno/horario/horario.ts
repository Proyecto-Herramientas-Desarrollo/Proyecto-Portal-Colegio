import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SAN_ALFONSO_DB, CONFIG_HORAS_SECUNDARIA, DIAS_SEMANA } from '../../../shared/data/db';
import { AuthService } from '../../../auth/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horario.html',
  styleUrl: './horario.css'
})
export class Horario implements OnInit, OnDestroy {
  alumnoActual: any;
  aulaActual: any;
  private sub!: Subscription;

  dias = DIAS_SEMANA;
  bloques = CONFIG_HORAS_SECUNDARIA; // Includes RECREO slot
  horarioSemanal: any = {};
  diaSeleccionadoMovil: string = 'Lunes';

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Detectar día actual de la semana para pre-seleccionar pestaña en móvil
    const diasInglesMap: { [key: number]: string } = {
      1: 'Lunes',
      2: 'Martes',
      3: 'Miércoles',
      4: 'Jueves',
      5: 'Viernes'
    };
    const dayIndex = new Date().getDay(); // 0=Sunday, 1=Monday...
    if (dayIndex >= 1 && dayIndex <= 5) {
      this.diaSeleccionadoMovil = diasInglesMap[dayIndex];
    }

    this.sub = this.authService.usuario$.subscribe(u => {
      if (u) {
        this.alumnoActual = SAN_ALFONSO_DB.alumnos.find((a: any) => a.id === u.id)
          ?? { nombre: u.nombre, apellido: u.apellido, aula_id: u.aula_id };
        const aulaId = this.alumnoActual.aula_id ?? u.aula_id;
        this.aulaActual = SAN_ALFONSO_DB.aulas.find((a: any) => a.id === aulaId);
        this.construirHorario(aulaId);
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  cambiarDiaMovil(dia: string) {
    this.diaSeleccionadoMovil = dia;
    this.cdr.detectChanges();
  }

  getEstiloCurso(cursoNombre: string): { bg: string; text: string; border: string; icon: string } {
    const c = cursoNombre ? cursoNombre.toLowerCase() : '';
    if (c.includes('matem')) {
      return { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd', icon: 'bi-calculator-fill' };
    }
    if (c.includes('comunicac')) {
      return { bg: '#fce7f3', text: '#be185d', border: '#fbcfe8', icon: 'bi-journal-richtext' };
    }
    if (c.includes('ciencia') || c.includes('cit')) {
      return { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0', icon: 'bi-virus2' };
    }
    if (c.includes('arte')) {
      return { bg: '#fef9c3', text: '#a16207', border: '#fef08a', icon: 'bi-palette-fill' };
    }
    if (c.includes('física') || c.includes('fisica')) {
      return { bg: '#ffedd5', text: '#c2410c', border: '#fed7aa', icon: 'bi-dribbble' };
    }
    if (c.includes('relig')) {
      return { bg: '#f3e8ff', text: '#6b21a8', border: '#e9d5ff', icon: 'bi-book-half' };
    }
    if (c.includes('human')) {
      return { bg: '#e0e7ff', text: '#3730a3', border: '#c7d2fe', icon: 'bi-people-fill' };
    }
    if (c.includes('trabajo') || c.includes('ept')) {
      return { bg: '#ccfbf1', text: '#0f766e', border: '#99f6e4', icon: 'bi-laptop-fill' };
    }
    if (c.includes('ingl')) {
      return { bg: '#fae8ff', text: '#86198f', border: '#f5d0fe', icon: 'bi-translate' };
    }
    if (c.includes('histor') || c.includes('geogr')) {
      return { bg: '#ffedd5', text: '#9a3412', border: '#fed7aa', icon: 'bi-globe' };
    }
    return { bg: '#f1f5f9', text: '#334155', border: '#e2e8f0', icon: 'bi-bookmark-fill' };
  }

  construirHorario(aulaId: number) {
    const horariosAula = (SAN_ALFONSO_DB.horarios as any[]).filter(h => h.aula_id === aulaId);
    this.horarioSemanal = {};
    for (const dia of this.dias) {
      this.horarioSemanal[dia] = {};
    }
    for (const h of horariosAula) {
      const curso = (SAN_ALFONSO_DB.cursos as any[]).find(c => c.id === h.curso_id);
      const docente = (SAN_ALFONSO_DB.docentes as any[]).find(d => d.id === h.docente_id);
      if (!this.horarioSemanal[h.dia]) this.horarioSemanal[h.dia] = {};
      this.horarioSemanal[h.dia][h.bloque_orden] = {
        curso: curso?.nombre || 'Sin asignar',
        docente: docente ? `${docente.nombre} ${docente.apellido}` : ''
      };
    }
  }
}