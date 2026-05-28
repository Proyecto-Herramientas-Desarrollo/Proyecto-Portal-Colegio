import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SAN_ALFONSO_DB } from '../data/db';

@Component({
  selector: 'app-perfil-mini',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-mini.html',
  styleUrl: './perfil-mini.css',
})
export class PerfilMini implements OnInit {
  @Output() verPerfil = new EventEmitter<void>();

  usuario: any = null;
  iniciales = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarSesion();
  }

  cargarSesion() {
    const sesionRaw = localStorage.getItem('usuario_sesion');
    if (sesionRaw) {
      try {
        this.usuario = JSON.parse(sesionRaw);
      } catch (e) {
        this.usuario = null;
      }
    }

    // Fallback si no hay sesión iniciada (para no romper otras páginas del proyecto)
    if (!this.usuario) {
      const fallbackAlumno = SAN_ALFONSO_DB.alumnos.find(a => a.id === 3);
      if (fallbackAlumno) {
        this.usuario = {
          role: 'alumno',
          id: fallbackAlumno.id,
          dni: fallbackAlumno.dni,
          nombre: fallbackAlumno.nombre,
          apellido: fallbackAlumno.apellido
        };
      }
    }

    if (this.usuario) {
      this.iniciales = (this.usuario.nombre.substring(0, 1) + this.usuario.apellido.substring(0, 1)).toUpperCase();
    }
  }

  onVerPerfil() {
    this.verPerfil.emit();
  }

  cerrarSesion() {
    localStorage.removeItem('usuario_sesion');
    this.router.navigate(['/login']);
  }
}
