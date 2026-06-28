import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-curso.html',
  styleUrls: ['./detalle-curso.css']
})
export class DetalleCursoComponent {
  @Input() curso: any = null;
  @Output() cerrar = new EventEmitter<void>();

  tabActiva: string = 'materiales';

  materiales = [
    { id: 1, titulo: 'Semana 1: Introducción al curso', tipo: 'PDF', fecha: '2026-06-25', size: '2.4 MB' },
    { id: 2, titulo: 'Diapositivas de la Unidad 1', tipo: 'PPTX', fecha: '2026-06-26', size: '5.1 MB' },
    { id: 3, titulo: 'Guía de Ejercicios Prácticos', tipo: 'DOCX', fecha: '2026-06-27', size: '1.2 MB' }
  ];

  tareas = [
    { id: 1, titulo: 'Práctica Calificada 1', limite: '2026-07-01', estado: 'Pendiente' },
    { id: 2, titulo: 'Trabajo de Investigación', limite: '2026-06-20', estado: 'Entregado' }
  ];

  // NUEVO: Pestaña de avisos para hacerlo más completo
  avisos = [
    { id: 1, fecha: '2026-06-28', titulo: 'Bienvenidos al curso', mensaje: 'Por favor, revisen el sílabo adjunto. Las reglas de evaluación ya están publicadas.' },
    { id: 2, fecha: '2026-07-02', titulo: 'Recordatorio de Cierre', mensaje: 'El sistema no permitirá subir la Práctica Calificada después de la medianoche.' }
  ];

  cambiarTab(tab: string) {
    this.tabActiva = tab;
  }

  cerrarModal() {
    this.cerrar.emit();
  }

  cerrarClickFuera(event: MouseEvent) {
    if ((event.target as HTMLElement).className.includes('modal-overlay')) {
      this.cerrarModal();
    }
  }

  descargarArchivo(nombre: string) {
    alert('Iniciando descarga del documento: ' + nombre);
  }
}