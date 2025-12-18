import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../layout/admin-layout/layout.component';
import { AuthGuard } from '../core/guards/auth-guard';
const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../layout/admin-layout/admin-dashboard.component')
            .then(m => m.AdminDashboardComponent)
      },
      {
        path: 'policies',
        loadComponent: () =>
          import('./policies/policies.component')
            .then(m => m.PoliciesComponent)
      },
      {
        path: 'claims',
        loadComponent: () =>
          import('./claims/claims.component')
            .then(m => m.ClaimsComponent)
      },
      {
        path: 'earnings',
        loadComponent: () =>
          import('./earnings/earnings.component')
            .then(m => m.EarningsComponent)
      },

      {
        path: 'customers',
        loadComponent: () =>
          import('./customers/customers.component')
            .then(m => m.CustomersComponent)
      },

     


      {
        path: 'agents',
        loadComponent: () =>
          import('./agent/agents.component')
            .then(m => m.AgentsComponent)
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
