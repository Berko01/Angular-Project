import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.hasToken()) {
      console.log('[AuthGuard] Yetki tamam.');
      return true;
    } else {
      console.warn('[AuthGuard] Yetki yok, login sayfasına yönleniyor.');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
