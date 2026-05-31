import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private estaLogueado = false;

  constructor() {
    if (localStorage.getItem('usuario_sesion')) {
      this.estaLogueado = true;
    }
  }

  login() {
    this.estaLogueado = true;
  }

  logout() {
    this.estaLogueado = false;
    localStorage.removeItem('usuario_sesion');
  }

  isAuthenticated(): boolean {
    return this.estaLogueado;
  }
}
