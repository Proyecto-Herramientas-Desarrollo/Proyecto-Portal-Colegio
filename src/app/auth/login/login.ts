import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SAN_ALFONSO_DB } from '../../shared/data/db';
import { AuthService } from '../auth'; // 1. IMPORTAMOS EL SERVICIO

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  dni = '';
  password = '';
  mensajeError = '';

  // 2. INYECTAMOS EL SERVICIO AQUÍ EN EL CONSTRUCTOR
  constructor(private router: Router, private authService: AuthService) {}

  validarNumeros(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dni = input.value.replace(/[^0-9]/g, '');
  }

  ingresar() {
    if (this.password !== '1234') {
      this.mensajeError = 'Contraseña incorrecta (usa 1234 para pruebas).';
      return;
    }

    // Buscar en alumnos
    const alumno = SAN_ALFONSO_DB.alumnos.find(a => a.dni === this.dni);
    if (alumno) {
      localStorage.setItem('usuario_sesion', JSON.stringify({
        role: 'alumno',
        id: alumno.id,
        dni: alumno.dni,
        nombre: alumno.nombre,
        apellido: alumno.apellido
      }));
      this.mensajeError = '';

      this.authService.login(); // 3. AVISAMOS AL GUARD QUE EL ALUMNO ENTRÓ
      this.router.navigate(['/dashboard']);
      return;
    }

    // Buscar en docentes
    const docente = SAN_ALFONSO_DB.docentes.find(d => d.dni === this.dni);
    if (docente) {
      localStorage.setItem('usuario_sesion', JSON.stringify({
        role: 'docente',
        id: docente.id,
        dni: docente.dni,
        nombre: docente.nombre,
        apellido: docente.apellido
      }));
      this.mensajeError = '';

      this.authService.login(); // 4. AVISAMOS AL GUARD QUE EL DOCENTE ENTRÓ
      localStorage.setItem('docenteId', docente.id.toString());
      this.router.navigate(['/dashboard']);
      return;
    }


    this.mensajeError = 'DNI no registrado como Alumno o Docente.';
  }
}
