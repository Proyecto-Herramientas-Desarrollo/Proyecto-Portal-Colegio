import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-tramites',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tramites.html',
  styleUrls: ['./tramites.css'] // <-- Asegúrate de que esta línea apunte a tu archivo CSS
})
export class TramitesComponent {
  // Lista simulada
  misTramites = [
    { id: 1, fecha: '2026-06-20', tipo: 'Constancia de Estudios', estado: 'Aprobado' },
    { id: 2, fecha: '2026-06-25', tipo: 'Certificado de Notas', estado: 'Pendiente' }
  ];

  nuevoTramite = { tipo: '' };
  
  // Variables para la interfaz "bonita"
  mostrarModal = false;
  dniAlumno = '';
  alertaExito = false;

  abrirModal() {
    if (this.nuevoTramite.tipo !== '') {
      this.mostrarModal = true;
      this.dniAlumno = ''; // Limpiar el input cada vez que se abre
    } else {
      alert('Por favor, selecciona un tipo de trámite primero.');
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  confirmarSolicitud() {
    // Validamos que el DNI tenga al menos 8 números
    if (this.dniAlumno.trim().length >= 8) {
      
      // 1. Agrega el trámite con estado PENDIENTE
      this.misTramites.unshift({
        id: this.misTramites.length + 1,
        fecha: new Date().toISOString().split('T')[0],
        tipo: this.nuevoTramite.tipo,
        estado: 'Pendiente'
      });

      // 2. Cerramos el modal y limpiamos todo
      this.mostrarModal = false;
      this.nuevoTramite.tipo = '';
      this.dniAlumno = ''; 

      // 3. Mostramos la alerta flotante de éxito
      this.alertaExito = true;
      
      // 4. Ocultamos la alerta mágicamente después de 3.5 segundos
      setTimeout(() => {
        this.alertaExito = false;
      }, 3500);

    } else {
      alert('DNI Inválido. Por favor, ingresa los 8 dígitos.');
    }
  }
}