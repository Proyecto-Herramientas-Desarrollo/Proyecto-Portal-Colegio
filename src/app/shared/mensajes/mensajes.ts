import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mensajes.html',
  styleUrls: ['./mensajes.css'] 
})
export class Mensajes {
  // 1. Lista de Profesores y Personal Administrativo
  contactos = [
    { id: 1, nombre: 'Prof. Carlos Mendoza', rol: 'Docente - Matemática', iniciales: 'CM', unread: 2, activo: true },
    { id: 2, nombre: 'Ana Ramírez', rol: 'Tutoría', iniciales: 'AR', unread: 0, activo: false },
    { id: 3, nombre: 'Secretaría Académica', rol: 'Administrativo', iniciales: 'SA', unread: 0, activo: false }
  ];

  // 2. Variables de control
  contactoSeleccionado = this.contactos[0]; // Por defecto abre el primer chat
  nuevoMensaje: string = '';

  // 3. Historial de mensajes simulado para el chat activo
  mensajesChat = [
    { id: 1, tipo: 'in', texto: 'Hola Diego, no olvides traer la calculadora científica para la práctica de mañana.', hora: '09:30 AM' },
    { id: 2, tipo: 'out', texto: 'Entendido profesor, ¿entra el tema de matrices también?', hora: '09:35 AM' },
    { id: 3, tipo: 'in', texto: 'Sí, matrices y sistemas de ecuaciones. ¡Estudia!', hora: '09:40 AM' }
  ];

  // 4. Cambiar entre conversaciones
  seleccionarContacto(contacto: any) {
    this.contactos.forEach(c => c.activo = false);
    contacto.activo = true;
    contacto.unread = 0; // Marcar como leídos
    this.contactoSeleccionado = contacto;
    // En el futuro, aquí el backend cargará los mensajes de este profesor
  }

  // 5. Enviar un nuevo mensaje
  enviarMensaje() {
    if (this.nuevoMensaje.trim() !== '') {
      this.mensajesChat.push({
        id: this.mensajesChat.length + 1,
        tipo: 'out', // "out" significa que tú lo envías (se pinta de azul)
        texto: this.nuevoMensaje,
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.nuevoMensaje = ''; // Limpiar la caja de texto

      // Pequeño truco para hacer scroll automático hasta abajo al enviar
      setTimeout(() => {
        const chatBox = document.getElementById('chat-history');
        if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
      }, 50);
    }
  }
}