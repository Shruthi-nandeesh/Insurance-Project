import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AgentsService {

  private baseUrl = 'http://localhost:9090/api/admin/agents';

  constructor(private http: HttpClient) {}

  private headers() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
  }

  getAgents() {
    return this.http.get<any[]>(this.baseUrl, this.headers());
  }

  addAgent(agent: any) {
    return this.http.post(this.baseUrl, agent, this.headers());
  }

  updateAgent(id: number, agent: any) {
    return this.http.put(`${this.baseUrl}/${id}`, agent, this.headers());
  }

  deleteAgent(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`, this.headers());
  }
}
