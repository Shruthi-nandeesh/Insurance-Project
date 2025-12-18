import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data = { email: '', password: '' };
  role = '';
  returnUrl = '';
  showPassword = false;
  errorMsg = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.role = this.route.snapshot.queryParamMap.get('role') || '';
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '';
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (!this.data.email || !this.data.password) {
      this.errorMsg = 'Email and password required';
      return;
    }

    // 🔥 TEMP ROLE DETECTION (FOR NOW)
    if (!this.role) {
      if (this.data.email.includes('admin')) {
        this.role = 'admin';
      } else if (this.data.email.includes('agent')) {
        this.role = 'agent';
      } else {
        this.role = 'customer';
      }
    }

    // ✅ SAVE LOGIN STATE (ORDER IS IMPORTANT)
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('role', this.role);

    if (this.role === 'customer') {
      localStorage.setItem('isCustomerLoggedIn', 'true');
    }

    // 🔥 RETURN TO PREVIOUS PAGE (PAYMENTS / POLICY DETAILS)
    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl);
      return;
    }

    // 🔥 ROLE BASED REDIRECT
    if (this.role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    } else if (this.role === 'agent') {
      this.router.navigate(['/agent/dashboard']);
    } else {
      this.router.navigate(['/policies']);
    }
  }

  goToRegister() {
    this.router.navigate(['/auth/register'], {
      queryParams: { returnUrl: this.returnUrl }
    });
  }
}
