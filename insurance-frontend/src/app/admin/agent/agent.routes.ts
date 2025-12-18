import { Routes } from '@angular/router';
import { AgentListComponent } from './agent-list/agent-list.component';

export const AGENT_ROUTES: Routes = [
    {
        path: '',
        component: AgentListComponent,
        children: [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./agent-dashboard/agent-dashboard.component')
                        .then(m => m.AgentDashboardComponent)
            },

            {
                path: 'policies',
                loadComponent: () =>
                    import('../policies/policies.component')
                        .then(m => m.PoliciesComponent)
            },
            {
                path: 'customers',
                loadComponent: () =>
                    import('../customers/customers.component')
                        .then(m => m.CustomersComponent)
            },
            {
                path: 'claims',
                loadComponent: () =>
                    import('../claims/claims.component')
                        .then(m => m.ClaimsComponent)
            },
            {
                path: 'earnings',
                loadComponent: () =>
                    import('../earnings/earnings.component')
                        .then(m => m.EarningsComponent)
            },

            {
                path: 'payments',
                loadComponent: () =>
                    import('../earnings/earnings.component')
                        .then(m => m.EarningsComponent)
            },

            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    }
];
