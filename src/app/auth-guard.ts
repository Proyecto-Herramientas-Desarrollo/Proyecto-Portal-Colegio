import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth/auth';
import { SupabaseService } from './shared/services/supabase.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  // Primero revisamos en memoria (reactivo / rápido)
  if (authService.isAuthenticated()) {
    return true;
  }

  // Si no hay usuario en memoria, preguntamos a Supabase si hay sesión activa
  // (por ejemplo, si el usuario recargó la página y el token JWT sigue siendo válido)
  const session = await supabaseService.getSession();
  if (session) {
    return true;
  }

  // Sin sesión: redirigir al login
  router.navigate(['/login']);
  return false;
};
