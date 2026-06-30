import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth';
import { SAN_ALFONSO_DB } from '../data/db';
import { Subscription } from 'rxjs';

interface Mensaje { id: number; tipo: 'in' | 'out'; texto: string; hora: string; }
interface Contacto {
  id: number;
  nombre: string;
  rol: string;
  iniciales: string;
  unread: number;
  activo: boolean;
  mensajes: Mensaje[];
}

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mensajes.html',
  styleUrls: ['./mensajes.css']
})
export class Mensajes implements OnInit, OnDestroy {
  contactos: Contacto[] = [];
  contactoSeleccionado: Contacto | null = null;
  nuevoMensaje = '';
  busqueda = '';
  mostrarChat = false;
  usuarioActual: any = null;
  private sub!: Subscription;

  get isMobile(): boolean { return window.innerWidth < 768; }
  get contactosFiltrados(): Contacto[] {
    if (!this.busqueda.trim()) return this.contactos;
    const q = this.busqueda.toLowerCase();
    return this.contactos.filter(c =>
      c.nombre.toLowerCase().includes(q) || c.rol.toLowerCase().includes(q)
    );
  }

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub = this.authService.usuario$.subscribe(u => {
      if (u) {
        this.usuarioActual = u;
        this.buildContactos(u);
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }

  private buildContactos(u: any) {
    if (u.role === 'docente') {
      // ==========================================
      // VISTA DE DOCENTE: CONTACTA A SUS ALUMNOS
      // ==========================================
      const horariosDocente = SAN_ALFONSO_DB.horarios.filter((h: any) => h.docente_id === u.id);
      const aulasIds = [...new Set(horariosDocente.map((h: any) => h.aula_id))];
      
      const alumnosDocente = SAN_ALFONSO_DB.alumnos.filter((a: any) => aulasIds.includes(a.aula_id));
      
      const contactosAlumnos: Contacto[] = alumnosDocente.slice(0, 10).map((est: any, idx: number) => {
        const aula = SAN_ALFONSO_DB.aulas.find((a: any) => a.id === est.aula_id);
        const aulaStr = aula ? `${aula.grado} "${aula.seccion}"` : 'Secundaria';
        const iniciales = `${est.nombre.charAt(0)}${est.apellido.charAt(0)}`;
        
        return {
          id: est.id,
          nombre: `${est.nombre} ${est.apellido}`,
          rol: `Alumno - ${aulaStr}`,
          iniciales,
          unread: idx === 0 ? 1 : 0,
          activo: idx === 0,
          mensajes: [
            { id: 1, tipo: 'in', texto: `Buenas tardes profesor. Le escribo porque tengo una duda con el último ejercicio de la ficha de trabajo del curso.`, hora: '10:15 AM' },
            { id: 2, tipo: 'out', texto: `Hola ${est.nombre}, claro. Dime, ¿en qué paso de la resolución te has quedado atascado?`, hora: '10:20 AM' },
            { id: 3, tipo: 'in', texto: `No estoy seguro si debo aplicar la fórmula de la pendiente directamente o si primero debo despejar la variable.`, hora: '10:22 AM' }
          ]
        };
      });

      const coordinacion: Contacto = {
        id: 9003,
        nombre: 'Coordinación Académica',
        rol: 'Administrativo',
        iniciales: 'CA',
        unread: 0,
        activo: false,
        mensajes: [
          { id: 1, tipo: 'in', texto: `Estimado profesor, le recordamos que el plazo límite para el ingreso de las calificaciones del Bimestre 2 vence el viernes a las 6:00 PM.`, hora: '08:00 AM' }
        ]
      };

      this.contactos = [...contactosAlumnos, coordinacion];

    } else {
      // ==========================================
      // VISTA DE ALUMNO: CONTACTA A SUS DOCENTES
      // ==========================================
      const alumno = SAN_ALFONSO_DB.alumnos.find((a: any) => a.id === u.id);
      const aulaId = alumno?.aula_id ?? u.aula_id;

      const horariosAula = SAN_ALFONSO_DB.horarios.filter((h: any) => h.aula_id === aulaId);
      const docenteIds = [...new Set(horariosAula.map((h: any) => h.docente_id))];

      const contactosDocentes: Contacto[] = docenteIds.map((did: any, idx: number) => {
        const doc = SAN_ALFONSO_DB.docentes.find((d: any) => d.id === did);
        const curso = SAN_ALFONSO_DB.cursos.find(
          (c: any) => c.id === doc?.especialidad_curso_id
        );
        const nombre = doc ? `Prof. ${doc.nombre} ${doc.apellido}` : `Docente ${idx + 1}`;
        const iniciales = doc
          ? `${doc.nombre.charAt(0)}${doc.apellido.charAt(0)}`
          : 'D' + (idx + 1);

        const cursoId = curso?.id || 1;
        const cursoNombre = curso?.nombre || 'Curso';

        return {
          id: did,
          nombre,
          rol: `Docente - ${cursoNombre}`,
          iniciales,
          unread: idx === 0 ? 2 : 0,
          activo: idx === 0,
          mensajes: this.generarMensajesUnicos(cursoId, nombre, u.nombre)
        };
      });

      const tutora: Contacto = {
        id: 9001,
        nombre: 'Lic. Rosa Flores',
        rol: 'Tutora de Aula',
        iniciales: 'RF',
        unread: 1,
        activo: false,
        mensajes: [
          { id: 1, tipo: 'in', texto: `Estimado ${u.nombre}, conversé con tu madre sobre la entrega de la libreta militar. Recuerda traer la fotocopia firmada mañana sin falta.`, hora: '08:15 AM' },
          { id: 2, tipo: 'out', texto: `Buenos días tutora Rosa, sí, mi mamá ya firmó el documento. Lo tengo en mi mochila para entregárselo en la primera hora.`, hora: '08:30 AM' },
          { id: 3, tipo: 'in', texto: `Perfecto. Que tengas un buen día de clases.`, hora: '08:32 AM' }
        ]
      };

      const secretaria: Contacto = {
        id: 9002,
        nombre: 'Secretaría Académica',
        rol: 'Administrativo',
        iniciales: 'SA',
        unread: 0,
        activo: false,
        mensajes: [
          { id: 1, tipo: 'in', texto: `Hola ${u.nombre}. Te informamos que tu constancia de estudios solicitada ya está lista para recojo en ventanilla.`, hora: '10:00 AM' }
        ]
      };

      this.contactos = [...contactosDocentes, tutora, secretaria];
    }

    if (this.contactos.length > 0) {
      this.contactos.forEach(c => c.activo = false);
      this.contactos[0].activo = true;
      this.contactoSeleccionado = this.contactos[0];
    }
  }

  private generarMensajesUnicos(cursoId: number, nombreDoc: string, nombreAlumno: string): Mensaje[] {
    const appleidoDoc = nombreDoc.split(' ').pop() || '';
    switch (cursoId) {
      case 1: // Matemática
        return [
          { id: 1, tipo: 'in', texto: `Hola ${nombreAlumno}, no olvides traer tu calculadora científica y transportador para la práctica de geometría de mañana.`, hora: '09:30 AM' },
          { id: 2, tipo: 'out', texto: `Entendido profesor ${appleidoDoc}, ¿la práctica vendrá con el tema de teorema de Pitágoras también?`, hora: '09:35 AM' },
          { id: 3, tipo: 'in', texto: `Sí, relaciones métricas y Pitágoras. Repasa los ejercicios del cuaderno.`, hora: '09:40 AM' }
        ];
      case 2: // Comunicación
        return [
          { id: 1, tipo: 'in', texto: `Buenas tardes ${nombreAlumno}. Ya revisé tu redacción sobre el ensayo literario. Tienes algunas correcciones en los párrafos de conclusión.`, hora: '11:20 AM' },
          { id: 2, tipo: 'out', texto: `Profesor, ¿puedo corregirlo y volver a subirlo hoy por el portal?`, hora: '11:35 AM' },
          { id: 3, tipo: 'in', texto: `Sí, la entrega estará abierta hasta las 8:00 PM. Aprovecha para corregir la ortografía.`, hora: '11:42 AM' }
        ];
      case 3: // CIT
        return [
          { id: 1, tipo: 'in', texto: `Hola ${nombreAlumno}, recuerda que tu grupo debe exponer mañana el proyecto de feria de ciencias sobre energía renovable.`, hora: '02:15 PM' },
          { id: 2, tipo: 'out', texto: `Sí profesora, ya terminamos la maqueta y las diapositivas. ¿El informe físico se entrega al iniciar la clase?`, hora: '02:40 PM' },
          { id: 3, tipo: 'in', texto: `Exacto. Un integrante debe entregarlo en el escritorio apenas ingresen. Suerte.`, hora: '02:50 PM' }
        ];
      default:
        return [
          { id: 1, tipo: 'in', texto: `Hola ${nombreAlumno}, ¿tienes alguna duda con las tareas del curso?`, hora: '09:00 AM' }
        ];
    }
  }

  get mensajesChat(): Mensaje[] {
    return this.contactoSeleccionado?.mensajes ?? [];
  }

  seleccionarContacto(contacto: Contacto) {
    this.contactos.forEach(c => c.activo = false);
    contacto.activo = true;
    contacto.unread = 0;
    this.contactoSeleccionado = contacto;
    this.mostrarChat = true;
  }

  enviarMensaje() {
    const texto = this.nuevoMensaje.trim();
    if (!texto || !this.contactoSeleccionado) return;

    this.contactoSeleccionado.mensajes.push({
      id: this.contactoSeleccionado.mensajes.length + 1,
      tipo: 'out',
      texto,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.nuevoMensaje = '';

    setTimeout(() => {
      const chatBox = document.getElementById('chat-history');
      if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }, 50);

    const nombreContacto = this.contactoSeleccionado.nombre;
    const esDocente = this.usuarioActual?.role === 'docente';

    setTimeout(() => {
      if (!this.contactoSeleccionado || this.contactoSeleccionado.nombre !== nombreContacto) return;
      
      let respuestaText = esDocente
        ? 'Gracias profesor, estaré atento a sus indicaciones.'
        : 'Entendido. Tomaré en cuenta tu mensaje y te responderé en detalle más tarde.';

      if (!esDocente) {
        if (this.contactoSeleccionado.rol.includes('Matemática')) {
          respuestaText = 'De acuerdo. Mañana resolvemos cualquier duda adicional antes de iniciar el examen.';
        } else if (this.contactoSeleccionado.id === 9002) {
          respuestaText = 'Gracias por comunicarte con Secretaría. Tu mensaje ha sido registrado en nuestro sistema de atención.';
        }
      } else {
        // Respuestas específicas de los estudiantes al profesor
        respuestaText = `Entendido profesor. Ya corregí ese punto y lo tendré listo para la clase. ¡Muchas gracias!`;
      }

      this.contactoSeleccionado.mensajes.push({
        id: this.contactoSeleccionado.mensajes.length + 1,
        tipo: 'in',
        texto: respuestaText,
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.cdr.detectChanges();
      setTimeout(() => {
        const chatBox = document.getElementById('chat-history');
        if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
      }, 50);
    }, 1500);
  }
}