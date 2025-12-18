import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css',
  imports: [RouterOutlet, RouterModule],
})
export class App {

  protected readonly title = signal('insurance-frontend');

  constructor(private router: Router) {}

  logout() {
    // ✅ Clear auth data
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');

    // ✅ Redirect to login
    this.router.navigate(['/login']);
  }
}
