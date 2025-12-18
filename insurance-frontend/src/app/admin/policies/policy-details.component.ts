import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PoliciesService } from '../policies/policies.service';

@Component({
  selector: 'app-policy-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css']
})
export class PolicyDetailsComponent implements OnInit {

  policy: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private policyService: PoliciesService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // ✅ SAFE POLICY ID READ
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (!id) {
      console.error('Policy ID missing');
      this.loading = false;
      return;
    }

    // ✅ FETCH POLICY FROM BACKEND
    this.policyService.getPolicyById(id).subscribe({
      next: (data) => {

        // ✅ MAP BACKEND → FRONTEND
        this.policy = {
          policyNumber: data.policyNumber,
          type: data.insuranceType?.name,
          coverage: data.coverageAmount,
          premium: data.premiumAmount,
          description: this.getDescription(data.insuranceType?.name),
          image: this.getImage(data.insuranceType?.name)
        };

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading policy', err);
        this.loading = false;
      }
    });
  }

  // ✅ IMAGE BASED ON POLICY TYPE
  getImage(type: string): string {
    const t = type?.toLowerCase() || '';

    if (t.includes('health')) return 'assets/health.jpg';
    if (t.includes('life')) return 'assets/life.jpg';
    if (t.includes('vehicle') || t.includes('car')) return 'assets/car.jpg';
    if (t.includes('travel')) return 'assets/travel.jpg';

    return 'assets/default.jpg';
  }

  // ✅ DESCRIPTION BASED ON POLICY TYPE
  getDescription(type: string): string {
    const t = type?.toLowerCase() || '';

    if (t.includes('health'))
      return 'Covers medical expenses, hospitalization, and treatments';

    if (t.includes('life'))
      return 'Provides financial security to your family in emergencies';

    if (t.includes('vehicle') || t.includes('car'))
      return 'Protects your vehicle from accidents, theft, and damages';

    if (t.includes('travel'))
      return 'Covers travel risks including medical emergencies and trip loss';

    return 'Insurance coverage designed for your needs';
  }

  // ✅ CORRECT FLOW → AUTH GUARD HANDLES LOGIN
  proceedToPayment() {
    this.router.navigate(['/payments'], {
      queryParams: {
        policyId: this.route.snapshot.paramMap.get('id')
      }
    });
  }
}
