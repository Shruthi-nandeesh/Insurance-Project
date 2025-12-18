import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

  // ✅ LOGIN
  login(data: any) {
  return this.http.post<any>(
    'http://localhost:9090/api/auth/login',
    data
  );
}

  // ✅ REGISTER (OTP FIRST)
 resendOtp(email: string) {
  return this.http.post(
    `http://localhost:9090/api/auth/resend-otp`,
    null,
    {
      params: { email }
    }
  );
}


  // ✅ VERIFY OTP
  verifyOtp(email: string, code: string) {
  return this.http.post<boolean>(
    `http://localhost:9090/api/auth/verify-otp?email=${email}&code=${code}`,
    {}
  );
}


  // ✅ NEW (VERY IMPORTANT)
  emailExists(email: string) {
  return this.http.get<boolean>(
    `http://localhost:9090/api/auth/email-exists`,
    { params: { email } }
  );
}

// ✅ REGISTER USER (AFTER OTP VERIFIED)
register(data: any) {
  return this.http.post(
    'http://localhost:9090/api/auth/register',
    {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
      gender: data.gender,
      dob: data.dob
    }
  );
}

logout() {
    localStorage.clear();
  }




  }

