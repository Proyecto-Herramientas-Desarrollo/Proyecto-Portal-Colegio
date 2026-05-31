import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { SAN_ALFONSO_DB } from '../../shared/data/db';

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

  constructor(private router: Router) {}

  
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
      this.router.navigate(['/dashboard']);
      return;
    }

    // Soporte para credencial hardcodeada original
    if (this.dni === '71235392') {
      const fallbackAlumno = SAN_ALFONSO_DB.alumnos.find(a => a.id === 3);
      if (fallbackAlumno) {
        localStorage.setItem('usuario_sesion', JSON.stringify({
          role: 'alumno',
          id: fallbackAlumno.id,
          dni: fallbackAlumno.dni,
          nombre: fallbackAlumno.nombre,
          apellido: fallbackAlumno.apellido
        }));
      }
      this.mensajeError = '';
      this.router.navigate(['/dashboard']);
      return;
    }

    this.mensajeError = 'DNI no registrado como Alumno o Docente.';
  }
}