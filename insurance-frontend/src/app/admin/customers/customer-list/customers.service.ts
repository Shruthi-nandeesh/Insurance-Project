import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomersService {

  private baseUrl = 'http://localhost:9090/api/admin/customers';

  constructor(private http: HttpClient) {}

  getPurchasedPolicies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/purchases`);
  }
}
