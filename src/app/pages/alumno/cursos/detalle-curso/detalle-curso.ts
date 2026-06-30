import { Component, EventEmitter, Input, OnInit, OnDestroy, Output, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../../../shared/services/supabase.service';
import { AuthService } from '../../../../auth/auth';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-curso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-curso.html',
  styleUrls: ['./detalle-curso.css']
})
export class DetalleCursoComponent implements OnInit, OnDestroy {
  @Input() curso: any = null;
  @Output() cerrar = new EventEmitter<void>();

  tabActiva: string = 'avisos';
  cargando = true;
  alumnoId: number | null = null;
  private sub!: Subscription;

  // Listas de datos reales/simulados
  materiales: any[] = [];
  tareas: any[] = [];
  calificacionCurso: any = null;
  
  // Tarea upload state
  tareaSeleccionada: any = null;
  archivoSeleccionadoNombre = '';
  subiendoTarea = false;
  mostrarModalEntrega = false;
  alertaExitoTarea = false;

  avisos = [
    { id: 1, fecha: '2026-06-28', titulo: 'Bienvenidos al curso', mensaje: 'Por favor, revisen el sílabo adjunto. Las reglas de evaluación ya están publicadas.' },
    { id: 2, fecha: '2026-07-02', titulo: 'Recordatorio de Entrega', mensaje: 'El sistema cerrará automáticamente las entregas al cumplirse la fecha límite. Subir en PDF.' }
  ];

  constructor(
    private authService: AuthService,
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub = this.authService.usuario$.subscribe(async u => {
      if (u) {
        this.alumnoId = u.id;
        await this.cargarDatosCurso();
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  async cargarDatosCurso() {
    if (!this.curso || !this.alumnoId) return;
    this.cargando = true;

    try {
      // 1. Cargar Materiales
      const { data: matData, error: matErr } = await this.supabaseService.getMaterialesByCurso(this.curso.id);
      if (matData && !matErr && matData.length > 0) {
        this.materiales = matData.map((m: any) => ({
          id: m.id,
          titulo: m.titulo,
          tipo: m.tipo || 'PDF',
          fecha: m.fecha_subida ? m.fecha_subida.split('T')[0] : '2026-06-30',
          size: m.size || '1.8 MB'
        }));
      } else {
        // Fallback local
        this.materiales = [
          { id: 1, titulo: 'Semana 1: Introducción y conceptos clave', tipo: 'PDF', fecha: '2026-06-25', size: '2.4 MB' },
          { id: 2, titulo: 'Diapositivas - Unidad de Aprendizaje 1', tipo: 'PPTX', fecha: '2026-06-26', size: '5.1 MB' },
          { id: 3, titulo: 'Ficha de Actividades y Ejercicios', tipo: 'DOCX', fecha: '2026-06-27', size: '1.2 MB' }
        ];
      }

      // 2. Cargar Tareas
      const { data: tarData, error: tarErr } = await this.supabaseService.getTareasByCurso(this.curso.id);
      if (tarData && !tarErr && tarData.length > 0) {
        this.tareas = tarData.map((t: any) => {
          // Buscamos si el alumno tiene una entrega para esta tarea
          const entrega = t.tareas_entregadas?.find((ent: any) => ent.alumno_id === this.alumnoId);
          return {
            id: t.id,
            titulo: t.titulo,
            descripcion: t.descripcion,
            limite: t.fecha_limite ? t.fecha_limite.split('T')[0] : '2026-07-05',
            estado: entrega ? 'Entregado' : 'Pendiente',
            nota: entrega?.nota || null,
            comentario: entrega?.comentario || null
          };
        });
      } else {
        // Fallback local
        this.tareas = [
          { id: 1, titulo: 'Práctica Calificada 1 (Ejercicios dirigidos)', limite: '2026-07-01', estado: 'Pendiente', nota: null },
          { id: 2, titulo: 'Trabajo de Exposición Grupal - Tema 1', limite: '2026-06-20', estado: 'Entregado', nota: 16 }
        ];
      }

      // 3. Cargar Calificación del alumno en este curso
      const { data: notaData, error: notaErr } = await this.supabaseService.getNotasByAlumno(this.alumnoId);
      if (notaData && !notaErr) {
        const notaCurso = notaData.find((n: any) => n.curso_id === this.curso.id);
        if (notaCurso) {
          this.calificacionCurso = {
            bim1: notaCurso.bimestre_1,
            bim2: notaCurso.bimestre_2,
            bim3: notaCurso.bimestre_3,
            bim4: notaCurso.bimestre_4,
            promedio: notaCurso.promedio_final
          };
        }
      }
    } catch (e) {
      console.error('Error al cargar detalle del curso:', e);
    } finally {
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  cambiarTab(tab: string) {
    this.tabActiva = tab;
  }

  volver() {
    this.cerrar.emit();
  }

  descargarArchivo(nombre: string) {
    alert('Descargando archivo adjunto: ' + nombre);
  }

  // Entrega de tareas
  abrirModalEntrega(tarea: any) {
    this.tareaSeleccionada = tarea;
    this.archivoSeleccionadoNombre = '';
    this.mostrarModalEntrega = true;
  }

  cerrarModalEntrega() {
    this.mostrarModalEntrega = false;
    this.tareaSeleccionada = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.archivoSeleccionadoNombre = file.name;
    }
  }

  async entregarTarea() {
    if (!this.tareaSeleccionada || !this.alumnoId) return;
    this.subiendoTarea = true;

    try {
      // Simular inserción de entrega
      await this.supabaseService.insertEntregaTarea({
        tarea_id: this.tareaSeleccionada.id,
        alumno_id: this.alumnoId,
        archivo_nombre: this.archivoSeleccionadoNombre,
        archivo_url: 'https://supabase.co/storage/v1/object/public/portal-archivos/tareas/comprobante.pdf'
      });

      // Actualizamos estado local
      const idx = this.tareas.findIndex(t => t.id === this.tareaSeleccionada.id);
      if (idx !== -1) {
        this.tareas[idx].estado = 'Entregado';
      }

      this.alertaExitoTarea = true;
      setTimeout(() => {
        this.alertaExitoTarea = false;
        this.cerrarModalEntrega();
      }, 2500);

    } catch (e) {
      console.error(e);
      this.cerrarModalEntrega();
    } finally {
      this.subiendoTarea = false;
      this.cdr.detectChanges();
    }
  }
}