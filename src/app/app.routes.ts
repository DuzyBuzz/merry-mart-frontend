import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent), 
    canActivate: [authGuard],
    data: { role: 'admin' },
  },
  {
    path: 'user',
    loadComponent: () => import('./pages/user/user.component').then(m => m.UserComponent),
    canActivate: [authGuard],
    data: { role: 'user' },
    children: [
   
      {
        path: 'payments',
        loadComponent: () => import('./pages/user/payments/payments.component').then(m => m.PaymentsComponent)
      },
      {
        path: 'expenses',
        loadComponent: () => import('./pages/user/expenses/expenses.component').then(m => m.ExpensesComponent)
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
