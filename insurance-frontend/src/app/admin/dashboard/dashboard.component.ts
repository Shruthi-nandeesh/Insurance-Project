import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  totalPolicies = 6;
  activePolicies = 4;
  customers = 15;
  earnings = 28000;
}
