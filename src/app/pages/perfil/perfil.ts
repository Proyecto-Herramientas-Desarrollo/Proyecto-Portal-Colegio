import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SAN_ALFONSO_DB } from '../../shared/data/db';
import { AuthService } from '../../auth/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent implements OnInit, OnDestroy {
  usuarioReal: any = null;
  usuarioMostrar: any = null;
  aulaActual: any = null;
  cursoDocente: any = null;
  private sub!: Subscription;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub = this.authService.usuario$.subscribe(u => {
      this.usuarioReal = u;
      this.cargarDatosReales();
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  cargarDatosReales() {
    if (!this.usuarioReal) return;
    
    if (this.usuarioReal.role === 'alumno') {
      const alumno = SAN_ALFONSO_DB.alumnos.find(a => a.id === this.usuarioReal.id)
        ?? { id: this.usuarioReal.id, nombre: this.usuarioReal.nombre, apellido: this.usuarioReal.apellido, aula_id: this.usuarioReal.aula_id, dni: this.usuarioReal.dni };
      this.usuarioMostrar = { ...this.usuarioReal, ...alumno };
      const aulaId = alumno.aula_id ?? this.usuarioReal.aula_id;
      this.aulaActual = SAN_ALFONSO_DB.aulas.find(aula => aula.id === aulaId);
      this.cursoDocente = null;
    } else if (this.usuarioReal.role === 'docente') {
      const docente = SAN_ALFONSO_DB.docentes.find(d => d.id === this.usuarioReal.id);
      if (docente) {
        this.usuarioMostrar = { ...this.usuarioReal, ...docente };
        this.cursoDocente = SAN_ALFONSO_DB.cursos.find(c => c.id === docente.especialidad_curso_id);
      } else {
        this.usuarioMostrar = this.usuarioReal;
        this.cursoDocente = null;
      }
      this.aulaActual = null;
    }
  }
}
