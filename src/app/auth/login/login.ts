import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  dni = '';
  password = '';
  mensajeError = '';
  cargando = false;

  constructor(private router: Router, private authService: AuthService) {}

  validarNumeros(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dni = input.value.replace(/[^0-9]/g, '');
  }

  async ingresar() {
    if (!this.dni || this.dni.length < 8) {
      this.mensajeError = 'Ingresa un DNI válido de 8 dígitos.';
      return;
    }
    if (!this.password) {
      this.mensajeError = 'Ingresa tu contraseña.';
      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    const { error } = await this.authService.login(this.dni, this.password);

    this.cargando = false;

    if (error) {
      this.mensajeError = error;
      return;
    }

    this.router.navigate(['/dashboard']);
  }
}
