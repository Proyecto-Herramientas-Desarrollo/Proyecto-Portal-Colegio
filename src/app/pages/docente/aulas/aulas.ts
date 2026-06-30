import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../shared/services/supabase.service';
import { AuthService } from '../../../auth/auth';

@Component({
  selector: 'app-aulas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aulas.html',
  styleUrl: './aulas.css',
})
export class Aulas implements OnInit {
  docenteId: number = 0;
  docenteNombre: string = '';

  // Lista de cursos/aulas asignadas
  aulasAsignadas: any[] = [];
  cargandoAulas: boolean = false;

  // Estado del aula seleccionada
  aulaSeleccionada: any = null; // contiene grado, seccion, curso_id, curso_nombre, etc.
  tabActiva: 'asistencia' | 'materiales' | 'tareas' | 'notas' = 'asistencia';

  // Sub-estados por pestaña
  estudiantes: any[] = [];
  asistencias: { [alumnoId: number]: { estado: string; comentario: string } } = {};
  fechaAsistencia: string = new Date().toISOString().split('T')[0];

  // Materiales
  materiales: any[] = [];
  subiendoMaterial: boolean = false;
  nuevoMaterial = { titulo: '', sesion: 'Sesión 1', descripcion: '', archivo: null as File | null, nombreArchivo: '' };

  // Tareas
  tareas: any[] = [];
  creandoTarea: boolean = false;
  nuevaTarea = { titulo: '', descripcion: '', fecha_limite: '' };
  
  // Entregas de Tarea Seleccionada
  tareaSeleccionada: any = null;
  entregas: any[] = [];
  cargandoEntregas: boolean = false;
  calificacionEntrega = { id: 0, nota: 11, comentario: '' };

  // Notas Bimestrales
  notasAlumnos: any[] = [];
  guardandoNotas: boolean = false;

  // Feedback UI
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idGuardado = localStorage.getItem('docenteId');
    if (idGuardado) {
      this.docenteId = parseInt(idGuardado, 10);
    }

    this.authService.usuario$.subscribe(u => {
      if (u && u.role === 'docente') {
        this.docenteId = u.id;
        this.docenteNombre = `Prof. ${u.nombre} ${u.apellido}`;
        this.cargarCursosYAulas();
      }
    });
  }

  mostrarMensaje(tipo: 'exito' | 'error', msg: string) {
    if (tipo === 'exito') {
      this.mensajeExito = msg;
      setTimeout(() => { this.mensajeExito = ''; this.cdr.detectChanges(); }, 4000);
    } else {
      this.mensajeError = msg;
      setTimeout(() => { this.mensajeError = ''; this.cdr.detectChanges(); }, 4000);
    }
    this.cdr.detectChanges();
  }

  async cargarCursosYAulas() {
    this.cargandoAulas = true;
    try {
      const { data, error } = await this.supabaseService.getHorariosByDocente(this.docenteId);
      if (error) throw error;

      // Agrupamos por aula y curso para tener una lista única
      const list: any[] = [];
      const cacheKeys = new Set<string>();

      (data || []).forEach((h: any) => {
        const key = `${h.aula_id}-${h.curso_id}`;
        if (!cacheKeys.has(key)) {
          cacheKeys.add(key);
          list.push({
            aula_id: h.aula_id,
            grado: h.aulas?.grado || 'Secundaria',
            seccion: h.aulas?.seccion || 'A',
            curso_id: h.curso_id,
            curso_nombre: h.cursos?.nombre || 'Curso'
          });
        }
      });

      this.aulasAsignadas = list;
    } catch (err: any) {
      console.error(err);
      this.mostrarMensaje('error', 'Error al cargar aulas asignadas.');
    } finally {
      this.cargandoAulas = false;
      this.cdr.detectChanges();
    }
  }

  seleccionarAula(aula: any): void {
    this.aulaSeleccionada = aula;
    this.tabActiva = 'asistencia';
    this.tareaSeleccionada = null;
    this.cargarDatosTab();
  }

  volverListaAulas(): void {
    this.aulaSeleccionada = null;
    this.estudiantes = [];
    this.asistencias = {};
    this.tareaSeleccionada = null;
    this.cdr.detectChanges();
  }

  cambiarTab(tabName: 'asistencia' | 'materiales' | 'tareas' | 'notas') {
    this.tabActiva = tabName;
    this.tareaSeleccionada = null;
    this.cargarDatosTab();
  }

  cargarDatosTab() {
    if (!this.aulaSeleccionada) return;
    
    if (this.tabActiva === 'asistencia') {
      this.cargarEstudiantesAsistencia();
    } else if (this.tabActiva === 'materiales') {
      this.cargarMateriales();
    } else if (this.tabActiva === 'tareas') {
      this.cargarTareas();
    } else if (this.tabActiva === 'notas') {
      this.cargarNotasBimestrales();
    }
  }

  // ==========================================
  // TAB 1: ASISTENCIA
  // ==========================================
  async cargarEstudiantesAsistencia() {
    try {
      const { data, error } = await this.supabaseService.getNotasByCursoYAula(
        this.aulaSeleccionada.curso_id,
        this.aulaSeleccionada.aula_id
      );
      if (error) throw error;
      
      // Mapeamos los estudiantes
      this.estudiantes = (data || []).map(n => ({
        id: n.alumno_id,
        nombre_completo: n.alumno_nombre
      }));

      // Inicializar asistencias por defecto
      this.asistencias = {};
      this.estudiantes.forEach(est => {
        this.asistencias[est.id] = { estado: 'Asiste', comentario: '' };
      });
    } catch (err) {
      console.error(err);
      this.mostrarMensaje('error', 'Error al cargar los estudiantes.');
    } finally {
      this.cdr.detectChanges();
    }
  }

  marcarAsistencia(alumnoId: number, estado: string) {
    if (this.asistencias[alumnoId]) {
      this.asistencias[alumnoId].estado = estado;
    }
  }

  async guardarAsistencias() {
    try {
      const listado = this.estudiantes.map(est => ({
        alumno_id: est.id,
        curso_id: this.aulaSeleccionada.curso_id,
        fecha: this.fechaAsistencia,
        estado: this.asistencias[est.id].estado,
        comentario: this.asistencias[est.id].comentario
      }));

      const { error } = await this.supabaseService.insertAsistencias(listado);
      if (error) throw error;

      this.mostrarMensaje('exito', '¡Asistencia guardada correctamente!');
    } catch (err) {
      console.error(err);
      this.mostrarMensaje('error', 'Error al guardar asistencias en la base de datos.');
    }
  }

  // ==========================================
  // TAB 2: MATERIALES DE CLASE
  // ==========================================
  async cargarMateriales() {
    try {
      const { data, error } = await this.supabaseService.getMaterialesByCurso(this.aulaSeleccionada.curso_id);
      if (error) throw error;
      this.materiales = data || [];
    } catch (err) {
      console.error(err);
    } finally {
      this.cdr.detectChanges();
    }
  }

  onMaterialFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.nuevoMaterial.archivo = file;
      this.nuevoMaterial.nombreArchivo = file.name;
    }
  }

  async subirMaterial() {
    if (!this.nuevoMaterial.titulo || !this.nuevoMaterial.archivo) {
      this.mostrarMensaje('error', 'Por favor, ingrese un título y seleccione un archivo.');
      return;
    }

    this.subiendoMaterial = true;
    try {
      // 1. Subir a Supabase Storage
      const url = await this.supabaseService.subirArchivo(this.nuevoMaterial.archivo, 'materiales');
      if (!url) throw new Error('Error al subir el archivo al servidor.');

      // 2. Insertar en materiales_clase
      const sizeKB = Math.round(this.nuevoMaterial.archivo.size / 1024) + ' KB';
      const ext = this.nuevoMaterial.nombreArchivo.split('.').pop()?.toUpperCase() || 'FILE';

      const { error } = await this.supabaseService.insertMaterial({
        curso_id: this.aulaSeleccionada.curso_id,
        docente_id: this.docenteId,
        titulo: `[${this.nuevoMaterial.sesion}] ${this.nuevoMaterial.titulo}`,
        descripcion: this.nuevoMaterial.descripcion,
        archivo_url: url,
        archivo_nombre: this.nuevoMaterial.nombreArchivo,
        tipo: ext,
        size: sizeKB
      });

      if (error) throw error;

      this.mostrarMensaje('exito', '¡Material de clase publicado con éxito!');
      this.nuevoMaterial = { titulo: '', sesion: 'Sesión 1', descripcion: '', archivo: null, nombreArchivo: '' };
      this.cargarMateriales();
    } catch (err: any) {
      console.error(err);
      this.mostrarMensaje('error', err.message || 'Error al subir material.');
    } finally {
      this.subiendoMaterial = false;
      this.cdr.detectChanges();
    }
  }

  // ==========================================
  // TAB 3: TAREAS Y EVALUACIONES
  // ==========================================
  async cargarTareas() {
    try {
      const { data, error } = await this.supabaseService.getTareasByCurso(this.aulaSeleccionada.curso_id);
      if (error) throw error;
      this.tareas = data || [];
    } catch (err) {
      console.error(err);
    } finally {
      this.cdr.detectChanges();
    }
  }

  async crearTarea() {
    if (!this.nuevaTarea.titulo || !this.nuevaTarea.fecha_limite) {
      this.mostrarMensaje('error', 'Complete el título y la fecha límite de la tarea.');
      return;
    }

    this.creandoTarea = true;
    try {
      const { error } = await this.supabaseService.insertTarea({
        curso_id: this.aulaSeleccionada.curso_id,
        docente_id: this.docenteId,
        titulo: this.nuevaTarea.titulo,
        descripcion: this.nuevaTarea.descripcion,
        fecha_limite: new Date(this.nuevaTarea.fecha_limite).toISOString()
      });

      if (error) throw error;

      this.mostrarMensaje('exito', '¡Tarea asignada con éxito!');
      this.nuevaTarea = { titulo: '', descripcion: '', fecha_limite: '' };
      this.cargarTareas();
    } catch (err) {
      console.error(err);
      this.mostrarMensaje('error', 'Error al asignar la tarea.');
    } finally {
      this.creandoTarea = false;
      this.cdr.detectChanges();
    }
  }

  async verEntregas(tarea: any) {
    this.tareaSeleccionada = tarea;
    this.cargandoEntregas = true;
    try {
      const { data, error } = await this.supabaseService.getEntregasByTarea(tarea.id);
      if (error) throw error;
      this.entregas = data || [];
    } catch (err) {
      console.error(err);
    } finally {
      this.cargandoEntregas = false;
      this.cdr.detectChanges();
    }
  }

  abrirCalificarEntrega(entrega: any) {
    this.calificacionEntrega = {
      id: entrega.id,
      nota: entrega.nota || 11,
      comentario: entrega.comentario || ''
    };
  }

  async guardarCalificacion() {
    try {
      const { error } = await this.supabaseService.calificarEntrega(
        this.calificacionEntrega.id,
        this.calificacionEntrega.nota,
        this.calificacionEntrega.comentario
      );
      if (error) throw error;

      this.mostrarMensaje('exito', '¡Entrega calificada con éxito!');
      
      // Cerrar modal de bootstrap de forma manual o simularlo recargando
      this.verEntregas(this.tareaSeleccionada);
    } catch (err) {
      console.error(err);
      this.mostrarMensaje('error', 'Error al guardar la calificación.');
    }
  }

  // ==========================================
  // TAB 4: CALIFICACIONES BIMESTRALES
  // ==========================================
  async cargarNotasBimestrales() {
    try {
      const { data, error } = await this.supabaseService.getNotasByCursoYAula(
        this.aulaSeleccionada.curso_id,
        this.aulaSeleccionada.aula_id
      );
      if (error) throw error;
      
      // Aseguramos que existan valores válidos y no nulos para inputs numéricos
      this.notasAlumnos = (data || []).map(n => ({
        ...n,
        bimestre_1: n.bimestre_1 !== null ? Number(n.bimestre_1) : null,
        bimestre_2: n.bimestre_2 !== null ? Number(n.bimestre_2) : null,
        bimestre_3: n.bimestre_3 !== null ? Number(n.bimestre_3) : null,
        bimestre_4: n.bimestre_4 !== null ? Number(n.bimestre_4) : null,
        promedio_final: n.promedio_final !== null ? Number(n.promedio_final) : null
      }));
    } catch (err) {
      console.error(err);
      this.mostrarMensaje('error', 'Error al cargar notas bimestrales.');
    } finally {
      this.cdr.detectChanges();
    }
  }

  calcularPromedio(row: any): number {
    const notas = [row.bimestre_1, row.bimestre_2, row.bimestre_3, row.bimestre_4].filter(v => v !== null && v !== undefined);
    if (notas.length === 0) return 0;
    const sum = notas.reduce((acc, curr) => acc + curr, 0);
    return Math.round((sum / notas.length) * 10) / 10;
  }

  async guardarNotasBimestrales() {
    this.guardandoNotas = true;
    try {
      for (const row of this.notasAlumnos) {
        const promedio = this.calcularPromedio(row);
        
        // Guardamos los bimestres editados
        for (let bNum = 1; bNum <= 4; bNum++) {
          const val = row[`bimestre_${bNum}`];
          if (val !== null && val !== undefined) {
            await this.supabaseService.updateNotaBimestral(
              row.alumno_id,
              this.aulaSeleccionada.curso_id,
              bNum,
              val,
              promedio
            );
          }
        }
      }
      this.mostrarMensaje('exito', '¡Notas actualizadas y guardadas con éxito!');
      this.cargarNotasBimestrales();
    } catch (err) {
      console.error(err);
      this.mostrarMensaje('error', 'Error al actualizar calificaciones.');
    } finally {
      this.guardandoNotas = false;
      this.cdr.detectChanges();
    }
  }
}
