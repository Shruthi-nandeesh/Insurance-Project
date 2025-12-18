import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {

  data: any = {
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    otp: ''
  };

  showPassword = false;
  showConfirm = false;
  passwordStrength = '';
  mobileError = '';
  otpSent = false;
  otpTimer = 0;
  timerInterval: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // ================= PASSWORD METHODS =================
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirm() {
    this.showConfirm = !this.showConfirm;
  }

  passwordsMatch(): boolean {
    return this.data.password === this.data.confirmPassword;
  }

  checkPasswordStrength() {
    const pwd = this.data.password;
    if (pwd.length < 6) {
      this.passwordStrength = 'Weak';
    } else if (/[A-Z]/.test(pwd) && /\d/.test(pwd)) {
      this.passwordStrength = 'Strong';
    } else {
      this.passwordStrength = 'Medium';
    }
  }

  // ================= MOBILE VALIDATION =================
  validateMobile() {
    this.mobileError =
      this.data.mobile.length !== 10 ? 'Mobile number must be 10 digits' : '';
  }

  // ================= OTP METHODS =================
  sendOtp() {
    if (!this.data.email) {
      alert('Please enter email');
      return;
    }

    this.authService.emailExists(this.data.email).subscribe({
      next: (exists: boolean) => {
        if (exists) {
          alert('Customer already registered ❌');
          return;
        }

        this.authService.resendOtp(this.data.email).subscribe({
          next: () => {
            this.otpSent = true;
            this.startTimer();
            alert('OTP sent to email ✅');
          },
          error: () => {
            alert('Failed to send OTP ❌');
          }
        });
      },
      error: () => {
        alert('Error validating email ❌');
      }
    });
  }

  startTimer() {
    this.otpTimer = 60;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      this.otpTimer--;
      if (this.otpTimer === 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  // ================= REGISTER METHOD (✅ FINAL & PERFECT) =================
  register() {
    if (!this.data.otp) {
      alert('Please enter OTP');
      return;
    }

    // ✅ STEP 1: VERIFY OTP
    this.authService.verifyOtp(this.data.email, this.data.otp).subscribe({
      next: (valid) => {
        if (!valid) {
          alert('Invalid OTP ❌');
          return;
        }

        // ✅ STEP 2: REGISTER USER
        this.authService.register(this.data).subscribe({
          next: () => {
            alert('Registration successful ✅');

            // ✅ MARK USER AS LOGGED IN
            localStorage.setItem('isLoggedIn', 'true');

            // ✅ GO TO LOGIN PAGE
            this.router.navigate(['/auth/login']);
          },
          error: (err) => {
            console.error(err);
            alert('Registration failed ❌');
          }
        });
      },
      error: () => {
        alert('OTP verification failed ❌');
      }
    });
  }
}
