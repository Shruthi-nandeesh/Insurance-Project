import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'   // ✅ THIS IS MANDATORY
})
export class DashboardService {

  private API = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.API}/dashboard/summary`);
  }
}
