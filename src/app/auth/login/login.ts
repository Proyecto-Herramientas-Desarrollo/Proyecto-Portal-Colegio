import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

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
    if (this.dni === '71235392' && this.password === '1234') {
      this.mensajeError = ''; 
      this.router.navigate(['/dashboard']); 
    } else {
     
      this.mensajeError = 'DNI o contraseña incorrectos.';
    }
  }
}