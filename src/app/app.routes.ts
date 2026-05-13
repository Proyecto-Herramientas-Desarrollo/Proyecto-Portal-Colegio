import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { DashboardComponent } from './dashboard/dashboard'; // Importamos el trabajo de tu compañero

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: DashboardComponent }, // Esta es la ruta que faltaba
];
