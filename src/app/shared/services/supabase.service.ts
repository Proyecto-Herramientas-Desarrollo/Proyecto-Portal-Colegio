import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // =====================================================
  // AUTH
  // =====================================================

  /**
   * Login con email y contraseña via Supabase Auth.
   * Los usuarios tienen email en formato: DNI@colegio.edu.pe
   */
  async signInWithDni(dni: string, password: string) {
    const email = `${dni}@colegio.edu.pe`;
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  /**
   * Cierra la sesión del usuario activo.
   */
  async signOut() {
    return this.supabase.auth.signOut();
  }

  /**
   * Devuelve la sesión actual (null si no hay sesión).
   */
  async getSession(): Promise<Session | null> {
    const { data } = await this.supabase.auth.getSession();
    return data.session;
  }

  /**
   * Devuelve el usuario activo (null si no hay sesión).
   */
  async getUser(): Promise<User | null> {
    const { data } = await this.supabase.auth.getUser();
    return data.user;
  }

  /**
   * Escucha cambios en el estado de autenticación (login, logout).
   * Úsalo en el AuthService para reaccionar en tiempo real.
   */
  onAuthStateChange(callback: (session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  }

  // =====================================================
  // ALUMNOS
  // =====================================================

  async getAlumnoByUserId(userId: string) {
    return this.supabase
      .from('alumnos')
      .select('*, aulas(*)')
      .eq('user_id', userId)
      .single();
  }

  async getAlumnoById(id: number) {
    return this.supabase
      .from('alumnos')
      .select('*, aulas(*)')
      .eq('id', id)
      .single();
  }

  // =====================================================
  // DOCENTES
  // =====================================================

  async getDocenteByUserId(userId: string) {
    return this.supabase
      .from('docentes')
      .select('*, cursos(*)')
      .eq('user_id', userId)
      .single();
  }

  async getDocenteById(id: number) {
    return this.supabase
      .from('docentes')
      .select('*, cursos(*)')
      .eq('id', id)
      .single();
  }

  // =====================================================
  // NOTAS
  // =====================================================

  async getNotasByAlumno(alumnoId: number) {
    return this.supabase
      .from('notas')
      .select('*, cursos(nombre)')
      .eq('alumno_id', alumnoId);
  }

  // =====================================================
  // HORARIOS
  // =====================================================

  async getHorariosByAula(aulaId: number) {
    return this.supabase
      .from('horarios')
      .select('*, cursos(nombre), docentes(nombre, apellido)')
      .eq('aula_id', aulaId)
      .order('dia')
      .order('bloque_orden');
  }

  async getHorariosByDocente(docenteId: number) {
    return this.supabase
      .from('horarios')
      .select('*, cursos(nombre), aulas(grado, seccion)')
      .eq('docente_id', docenteId)
      .order('dia')
      .order('bloque_orden');
  }

  // =====================================================
  // TRAMITES
  // =====================================================

  async getTramitesByAlumno(alumnoId: number) {
    return this.supabase
      .from('tramites')
      .select('*')
      .eq('alumno_id', alumnoId)
      .order('fecha_solicitud', { ascending: false });
  }

  async insertTramite(alumnoId: number, tipo: string) {
    return this.supabase
      .from('tramites')
      .insert({ alumno_id: alumnoId, tipo, estado: 'Pendiente' });
  }

  // =====================================================
  // FINANZAS
  // =====================================================

  async getFinanzasByAlumno(alumnoId: number) {
    return this.supabase
      .from('finanzas')
      .select('*')
      .eq('alumno_id', alumnoId)
      .order('vencimiento');
  }

  // =====================================================
  // MATERIALES DE CLASE
  // =====================================================

  async getMaterialesByCurso(cursoId: number) {
    return this.supabase
      .from('materiales_clase')
      .select('*')
      .eq('curso_id', cursoId)
      .order('fecha_subida', { ascending: false });
  }

  async insertMaterial(material: {
    curso_id: number;
    docente_id: number;
    titulo: string;
    descripcion?: string;
    archivo_url?: string;
    archivo_nombre?: string;
    tipo?: string;
    size?: string;
  }) {
    return this.supabase.from('materiales_clase').insert(material);
  }

  // =====================================================
  // TAREAS
  // =====================================================

  async getTareasByCurso(cursoId: number) {
    return this.supabase
      .from('tareas')
      .select('*, tareas_entregadas(id, alumno_id, nota, estado)')
      .eq('curso_id', cursoId)
      .order('fecha_limite');
  }

  async insertTarea(tarea: {
    curso_id: number;
    docente_id: number;
    titulo: string;
    descripcion?: string;
    fecha_limite: string;
  }) {
    return this.supabase.from('tareas').insert(tarea);
  }

  async insertEntregaTarea(entrega: {
    tarea_id: number;
    alumno_id: number;
    archivo_url?: string;
    archivo_nombre?: string;
  }) {
    return this.supabase.from('tareas_entregadas').insert(entrega);
  }

  // =====================================================
  // ASISTENCIAS
  // =====================================================

  async getAsistenciasByAlumno(alumnoId: number) {
    return this.supabase
      .from('asistencias')
      .select('*, cursos(nombre)')
      .eq('alumno_id', alumnoId)
      .order('fecha', { ascending: false });
  }

  async insertAsistencias(asistencias: {
    alumno_id: number;
    curso_id: number;
    fecha: string;
    estado: string;
    comentario?: string;
  }[]) {
    return this.supabase.from('asistencias').insert(asistencias);
  }

  // =====================================================
  // STORAGE - Subida de archivos
  // =====================================================

  /**
   * Sube un archivo al bucket 'portal-archivos' en Supabase Storage.
   * Devuelve la URL pública del archivo para guardarlo en la BD.
   */
  async subirArchivo(file: File, carpeta: string): Promise<string | null> {
    const nombreArchivo = `${carpeta}/${Date.now()}_${file.name}`;
    const { data, error } = await this.supabase.storage
      .from('portal-archivos')
      .upload(nombreArchivo, file, { upsert: false });

    if (error) {
      console.error('Error al subir archivo:', error);
      return null;
    }

    const { data: urlData } = this.supabase.storage
      .from('portal-archivos')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  }
}
