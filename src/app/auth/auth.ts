import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from '../shared/services/supabase.service';
import { SAN_ALFONSO_DB } from '../shared/data/db';

export interface UsuarioSesion {
  role: 'alumno' | 'docente';
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
  user_id: string;
  aula_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario = new BehaviorSubject<UsuarioSesion | null>(null);
  /** Observable con el usuario activo. Los componentes pueden suscribirse. */
  usuario$ = this._usuario.asObservable();

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    // Al iniciar la app, escucha cambios de sesión de Supabase
    // Esto hace que si el token sigue siendo válido, el usuario quede logueado
    // automáticamente sin necesidad de volver a ingresar credenciales.
    this.supabaseService.onAuthStateChange(async (session) => {
      if (session?.user) {
        await this._cargarPerfilDesdeSession(session.user.id, session.user.email, session.user.user_metadata);
      } else {
        this._usuario.next(null);
      }
    });
  }

  private async _cargarPerfilDesdeSession(userId: string, email: string | undefined, metadata: any) {
    const role = metadata?.['role'] || (email?.includes('docente') ? 'docente' : 'alumno');
    const dni = email ? email.split('@')[0] : '';

    if (role === 'alumno') {
      let alumnoData: any = null;

      // 1. Intentar obtener de Supabase
      try {
        const { data, error } = await this.supabaseService.getAlumnoByUserId(userId);
        if (data && !error) {
          alumnoData = data;
        }
      } catch (e) {
        console.warn('Error querying Supabase alumnos table, using fallback:', e);
      }

      // 2. Fallback a la base de datos local SAN_ALFONSO_DB si no existe en la remota
      if (!alumnoData && dni) {
        const localAlumno = SAN_ALFONSO_DB.alumnos.find(a => a.dni === dni);
        if (localAlumno) {
          alumnoData = {
            id: localAlumno.id,
            dni: localAlumno.dni,
            nombre: localAlumno.nombre,
            apellido: localAlumno.apellido,
            aula_id: localAlumno.aula_id
          };
        }
      }

      // 3. Fallback secundario con metadatos
      if (!alumnoData && metadata?.['profile_id']) {
        const localAlumno = SAN_ALFONSO_DB.alumnos.find(a => a.id === Number(metadata['profile_id']));
        if (localAlumno) {
          alumnoData = {
            id: localAlumno.id,
            dni: localAlumno.dni,
            nombre: localAlumno.nombre,
            apellido: localAlumno.apellido,
            aula_id: localAlumno.aula_id
          };
        }
      }

      if (alumnoData) {
        this._usuario.next({
          role: 'alumno',
          id: alumnoData.id,
          dni: alumnoData.dni,
          nombre: alumnoData.nombre,
          apellido: alumnoData.apellido,
          user_id: userId,
          aula_id: alumnoData.aula_id,
        });
      }
    } else if (role === 'docente') {
      let docenteData: any = null;

      // 1. Intentar obtener de Supabase
      try {
        const { data, error } = await this.supabaseService.getDocenteByUserId(userId);
        if (data && !error) {
          docenteData = data;
        }
      } catch (e) {
        console.warn('Error querying Supabase docentes table, using fallback:', e);
      }

      // 2. Fallback a la base de datos local SAN_ALFONSO_DB
      if (!docenteData && dni) {
        const localDocente = SAN_ALFONSO_DB.docentes.find(d => d.dni === dni);
        if (localDocente) {
          docenteData = {
            id: localDocente.id,
            dni: localDocente.dni,
            nombre: localDocente.nombre,
            apellido: localDocente.apellido
          };
        }
      }

      if (docenteData) {
        this._usuario.next({
          role: 'docente',
          id: docenteData.id,
          dni: docenteData.dni,
          nombre: docenteData.nombre,
          apellido: docenteData.apellido,
          user_id: userId,
        });
      }
    }
  }

  async login(dni: string, password: string): Promise<{ error: string | null }> {
    try {
      const { data, error } = await this.supabaseService.signInWithDni(dni, password);

      if (error) {
        // Simplificamos el mensaje de error de Supabase al español
        if (error.message.includes('Invalid login credentials') || error.message.includes('invalid-credential') || error.message.includes('invalid_grant')) {
          return { error: 'DNI o contraseña incorrectos.' };
        }
        return { error: error.message };
      }

      if (data?.user) {
        const metadata = data.user.user_metadata;
        await this._cargarPerfilDesdeSession(data.user.id, data.user.email, metadata);

        // Guardamos en localStorage como backup (opcional, para compatibilidad con el código existente)
        const usuario = this._usuario.getValue();
        if (usuario) {
          localStorage.setItem('usuario_sesion', JSON.stringify(usuario));
        } else {
          // Si el usuario existe en Supabase Auth pero no en las tablas de negocio, cerramos sesión de inmediato
          await this.supabaseService.signOut();
          return { error: 'El DNI ingresado no está registrado en la base de datos del colegio.' };
        }
      }

      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'Error de conexión con el servidor de autenticación.' };
    }
  }


  async logout() {
    await this.supabaseService.signOut();
    this._usuario.next(null);
    localStorage.removeItem('usuario_sesion');
    this.router.navigate(['/login']);
  }

  /** Verifica si hay un usuario activo en memoria. */
  isAuthenticated(): boolean {
    return this._usuario.getValue() !== null;
  }

  /** Devuelve el usuario actual de forma síncrona. */
  getUsuario(): UsuarioSesion | null {
    return this._usuario.getValue();
  }

  /** @deprecated Usar login() async. Mantenido para compatibilidad. */
  loginLegacy() {
    // No-op en la nueva implementación
  }
}
