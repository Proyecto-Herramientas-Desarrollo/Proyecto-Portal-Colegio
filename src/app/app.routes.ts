import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { MainContainer } from './dashboard/main-container/main-container';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: MainContainer },
];
