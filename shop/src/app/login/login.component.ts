import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { User } from '../core/model/user';
import { NotificationService } from '../core/services/notification.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]), // Email pattern devre dışı
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false),
  });

  isLoggedIn = false;

  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);

  constructor() {
    // BehaviorSubject ile durumu reaktif takip et
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      console.log('[LoginComponent] isLoggedIn:', status);
    });
  }

  login(): void {
    if (!this.loginForm.valid) {
      this.notificationService.warning('Lütfen tüm alanları doldurun.');
      return;
    }

    const user = new User(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    this.authService.login(user).subscribe({
      next: (result) => {
        if (result.success && result.token) {
          this.authService.setRememberMeToken(result.token, this.loginForm.value.rememberMe);

          this.notificationService.success('Giriş başarılı!');
          console.log('[LoginComponent] Token alındı:', result.token);

          this.loginForm.reset();
          this.router.navigate(['/products']);
        } else {
          this.notificationService.error('Geçersiz kullanıcı adı veya şifre.');
        }
      },
      error: (err) => {
        console.error('[LoginComponent] API Hatası:', err);
        this.notificationService.error('Sunucu hatası oluştu.');
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.notificationService.success('Başarıyla çıkış yapıldı.');
    this.router.navigate(['/login']);
  }
}
