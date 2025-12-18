import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClaimsService {

  private api = 'http://localhost:9090/api/claims';

  constructor(private http: HttpClient) {}

  getClaims(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }
}
