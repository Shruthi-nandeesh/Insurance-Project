import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PoliciesService {

  private api = 'http://localhost:9090/api/policies';

  constructor(private http: HttpClient) {}

  getPolicies(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  getPolicyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  // ✅ FIX IS HERE
  purchasePolicy(policyId: number): Observable<any> {
    return this.http.post(
      `http://localhost:9090/api/customer/purchase/${policyId}`,
      null   // 🔥 IMPORTANT: send null, NOT {}
    );
  }
}
