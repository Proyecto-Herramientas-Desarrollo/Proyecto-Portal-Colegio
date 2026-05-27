import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importamos la Base de Datos para sacar el nombre del alumno
import { SAN_ALFONSO_DB } from '../../../shared/data/db'; 

@Component({
  selector: 'app-finanzas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finanzas.html',
  styleUrl: './finanzas.css'
})
export class Finanzas implements OnInit {
  alumnoActual: any;
  totalPendiente: number = 0;
  
  // Simulando el estado financiero (como lo pide el ticket)
  pensiones = [
    { concepto: 'Matrícula 2026', monto: 350.00, estado: 'Pagado', vencimiento: '15/02/2026' },
    { concepto: 'Pensión Marzo', monto: 450.00, estado: 'Pagado', vencimiento: '05/03/2026' },
    { concepto: 'Pensión Abril', monto: 450.00, estado: 'Pendiente', vencimiento: '05/04/2026' },
    { concepto: 'Pensión Mayo', monto: 450.00, estado: 'Por Vencer', vencimiento: '05/05/2026' }
  ];

  ngOnInit() {
    // 1. Obtenemos tu info (ID 3)
    this.alumnoActual = SAN_ALFONSO_DB.alumnos.find(a => a.id === 3);
    
    // 2. Calculamos matemáticamente cuánto dinero debes en total
    const deudas = this.pensiones.filter(p => p.estado === 'Pendiente');
    this.totalPendiente = deudas.reduce((acc, curr) => acc + curr.monto, 0);
  }
}
