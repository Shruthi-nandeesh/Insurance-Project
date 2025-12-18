import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(private router: Router) {}

  goToAdmin() {
    this.router.navigate(['/auth/login'], {
      queryParams: { role: 'admin' }
    });
  }

  goToAgent() {
    this.router.navigate(['/auth/login'], {
      queryParams: { role: 'agent' }
    });
  }

  goToCustomer() {
    this.router.navigate(['/policies']);
  }
}
