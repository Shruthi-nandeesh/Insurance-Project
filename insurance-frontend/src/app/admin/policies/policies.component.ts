import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoliciesService } from './policies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {

  policies: any[] = [];
  loading = true;

  constructor(
    private policiesService: PoliciesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.policiesService.getPolicies().subscribe(data => {
      this.policies = data;
      this.loading = false;
    });
  }
buyPolicy(policyId: number) {
  const loggedIn = localStorage.getItem('isCustomerLoggedIn');

  if (!loggedIn) {
    this.router.navigate(['/auth/login'], {
      queryParams: {
        role: 'customer',
        returnUrl: `/policies/details/${policyId}`
      }
    });
  } else {
    this.router.navigate(['/policies/details', policyId]);
  }
}


  getImage(type?: string): string {
    if (!type) return 'assets/default.jpg';
    const t = type.toLowerCase();
    if (t.includes('health')) return 'assets/health.jpg';
    if (t.includes('life')) return 'assets/life.jpg';
    if (t.includes('vehicle')) return 'assets/car.jpg';
    if (t.includes('travel')) return 'assets/travel.jpg';
    return 'assets/default.jpg';
  }

  getDescription(type?: string): string {
    if (!type) return '';
    const t = type.toLowerCase();
    if (t.includes('health')) return 'Covers medical expenses';
    if (t.includes('life')) return 'Family financial security';
    if (t.includes('vehicle')) return 'Vehicle damage protection';
    if (t.includes('travel')) return 'Travel risk coverage';
    return '';
  }
}
