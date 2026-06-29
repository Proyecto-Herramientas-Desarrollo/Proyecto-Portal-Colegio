import { authGuard } from './auth-guard';
import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { DashboardComponent } from './dashboard/dashboard'; 
import { TramitesComponent } from './pages/alumno/tramites/tramites';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [authGuard],
    children: [
     
      { path: 'tramites', component: TramitesComponent }
    ]
  }
];
