import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OtpService {

  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  sendOtp(email: string) {
    return this.http.post(`${this.baseUrl}/resend-otp`, { email });
  }

  verifyOtp(data: any) {
    return this.http.post(`${this.baseUrl}/verify-otp`, data);
  }
}
