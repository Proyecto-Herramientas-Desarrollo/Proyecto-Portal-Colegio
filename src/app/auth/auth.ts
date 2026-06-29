import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from '../shared/services/supabase.service';

export interface UsuarioSesion {
  role: 'alumno' | 'docente';
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
  user_id: string;
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
        await this._cargarPerfilDesdeSession(session.user.id, session.user.user_metadata);
      } else {
        this._usuario.next(null);
      }
    });
  }

  private async _cargarPerfilDesdeSession(userId: string, metadata: any) {
    const role = metadata?.['role'];
    if (role === 'alumno') {
      const { data, error } = await this.supabaseService.getAlumnoByUserId(userId);
      if (data && !error) {
        this._usuario.next({
          role: 'alumno',
          id: data['id'],
          dni: data['dni'],
          nombre: data['nombre'],
          apellido: data['apellido'],
          user_id: userId,
        });
      }
    } else if (role === 'docente') {
      const { data, error } = await this.supabaseService.getDocenteByUserId(userId);
      if (data && !error) {
        this._usuario.next({
          role: 'docente',
          id: data['id'],
          dni: data['dni'],
          nombre: data['nombre'],
          apellido: data['apellido'],
          user_id: userId,
        });
      }
    }
  }

  async login(dni: string, password: string): Promise<{ error: string | null }> {
    const { data, error } = await this.supabaseService.signInWithDni(dni, password);

    if (error) {
      // Simplificamos el mensaje de error de Supabase al español
      if (error.message.includes('Invalid login credentials')) {
        return { error: 'DNI o contraseña incorrectos.' };
      }
      return { error: error.message };
    }

    if (data?.user) {
      const metadata = data.user.user_metadata;
      await this._cargarPerfilDesdeSession(data.user.id, metadata);

      // Guardamos en localStorage como backup (opcional, para compatibilidad con el código existente)
      const usuario = this._usuario.getValue();
      if (usuario) {
        localStorage.setItem('usuario_sesion', JSON.stringify(usuario));
      }
    }

    return { error: null };
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
