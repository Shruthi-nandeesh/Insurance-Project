import { Routes } from '@angular/router';
import { WelcomeComponent } from './public/welcome/welcome.component';
import { AuthGuard } from './core/guards/auth-guard';


export const routes: Routes = [
  { path: '', component: WelcomeComponent },

  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-module').then(m => m.AuthModule)
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule)
  },

  {
    path: 'agent',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin/agent/agent.routes')
        .then(m => m.AGENT_ROUTES)
  },

  {
    path: 'policies',
    loadComponent: () =>
      import('./admin/policies/policies.component')
        .then(m => m.PoliciesComponent)
  },

  {
    path: 'policies/details/:id',
    loadComponent: () =>
      import('./admin/policies/policy-details.component')
        .then(m => m.PolicyDetailsComponent)
  },

   {
        path: 'payments',
        loadComponent: () =>
          import('./admin/payments/payments.component')
            .then(m => m.PaymentsComponent),
        canActivate: [AuthGuard]
      },

  { path: '**', redirectTo: '' }
];
