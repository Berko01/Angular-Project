import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class App {
  protected title = 'shop';
  isLoggedIn = false;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      console.log('[App] isLoggedIn değişti:', status);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
