import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil-mini',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-mini.html',
  styleUrl: './perfil-mini.css',
})
export class PerfilMini implements OnInit, OnDestroy {
  @Output() verPerfil = new EventEmitter<void>();

  usuario: any = null;
  iniciales = '';
  private sub!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.sub = this.authService.usuario$.subscribe(u => {
      this.usuario = u;
      if (u) {
        this.iniciales = (u.nombre.substring(0, 1) + u.apellido.substring(0, 1)).toUpperCase();
      } else {
        this.iniciales = '';
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  onVerPerfil() {
    this.verPerfil.emit();
  }

  cerrarSesion() {
    this.authService.logout();
  }
}
