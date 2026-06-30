import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SAN_ALFONSO_DB } from '../../../shared/data/db';
import { AuthService } from '../../../auth/auth';
import { SupabaseService } from '../../../shared/services/supabase.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-finanzas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './finanzas.html',
  styleUrl: './finanzas.css'
})
export class Finanzas implements OnInit, OnDestroy {
  alumnoActual: any;
  totalPendiente: number = 0;
  cargando = true;
  private sub!: Subscription;

  pensiones: any[] = [];
  
  // Modales
  mostrarModalPago = false;
  mostrarModalRecibo = false;
  pagoSeleccionado: any = null;
  
  // Formulario Pago
  comprobanteNombre = '';
  subiendoComprobante = false;
  alertaExitoPago = false;

  // Datos por defecto (fallback local)
  private readonly pensionesDefault = [
    { id: 1, concepto: 'Matrícula 2026', monto: 350.00, estado: 'Pagado', vencimiento: '2026-02-15' },
    { id: 2, concepto: 'Pensión Marzo', monto: 450.00, estado: 'Pagado', vencimiento: '2026-03-05' },
    { id: 3, concepto: 'Pensión Abril', monto: 450.00, estado: 'Pendiente', vencimiento: '2026-04-05' },
    { id: 4, concepto: 'Pensión Mayo', monto: 450.00, estado: 'Por Vencer', vencimiento: '2026-05-05' }
  ];

  constructor(
    private authService: AuthService,
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub = this.authService.usuario$.subscribe(async u => {
      if (u) {
        this.alumnoActual = SAN_ALFONSO_DB.alumnos.find((a: any) => a.id === u.id)
          ?? { nombre: u.nombre, apellido: u.apellido, dni: u.dni };

        await this.cargarFinanzas(u.id);
      }
    });
  }

  async cargarFinanzas(alumnoId: number) {
    this.cargando = true;
    try {
      const { data, error } = await this.supabaseService.getFinanzasByAlumno(alumnoId);
      if (data && !error && data.length > 0) {
        this.pensiones = data.map((p: any) => ({
          id: p.id,
          concepto: p.concepto,
          monto: Number(p.monto),
          estado: p.estado,
          vencimiento: p.vencimiento
        }));
      } else {
        this.pensiones = [...this.pensionesDefault];
      }
    } catch {
      this.pensiones = [...this.pensionesDefault];
    }

    this.calcularTotalPendiente();
    this.cargando = false;
    this.cdr.detectChanges();
  }

  private calcularTotalPendiente() {
    this.totalPendiente = this.pensiones
      .filter(p => p.estado === 'Pendiente')
      .reduce((acc, curr) => acc + curr.monto, 0);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const [y, m, d] = fecha.split('-');
    return `${d}/${m}/${y}`;
  }

  // Métodos de Pago y Recibo
  abrirModalPago(pago: any) {
    this.pagoSeleccionado = pago;
    this.comprobanteNombre = '';
    this.mostrarModalPago = true;
  }

  cerrarModalPago() {
    this.mostrarModalPago = false;
    this.pagoSeleccionado = null;
  }

  abrirModalRecibo(pago: any) {
    this.pagoSeleccionado = pago;
    this.mostrarModalRecibo = true;
  }

  cerrarModalRecibo() {
    this.mostrarModalRecibo = false;
    this.pagoSeleccionado = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.comprobanteNombre = file.name;
    }
  }

  async enviarComprobante() {
    if (!this.pagoSeleccionado) return;
    this.subiendoComprobante = true;

    try {
      // Simulamos subida de archivo y registro en base de datos.
      // Si está en Supabase, podemos actualizar el estado de la pensión a "Pagado" o "Procesando"
      if (this.pagoSeleccionado.id) {
        // Actualizamos estado local
        const index = this.pensiones.findIndex(p => p.id === this.pagoSeleccionado.id);
        if (index !== -1) {
          this.pensiones[index].estado = 'Pagado';
        }
        
        // Actualizar en base de datos si existe el registro real
        await this.supabaseService.updateFinanzasEstado(this.pagoSeleccionado.id, 'Pagado');
      }
      
      this.calcularTotalPendiente();
      this.alertaExitoPago = true;
      setTimeout(() => {
        this.alertaExitoPago = false;
        this.cerrarModalPago();
      }, 3000);
    } catch (e) {
      console.error(e);
      this.cerrarModalPago();
    } finally {
      this.subiendoComprobante = false;
      this.cdr.detectChanges();
    }
  }

  imprimirRecibo() {
    window.print();
  }
}
