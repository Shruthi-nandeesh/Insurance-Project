import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule   // ✅ REQUIRED for routerLink
  ]
})
export class AgentListComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
