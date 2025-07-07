import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  success(message: string): void {
    if (isPlatformBrowser(this.platformId)) {
      import('alertifyjs').then(alertify => {
        alertify.success(message);
      });
    }
  }

  error(message: string): void {
    if (isPlatformBrowser(this.platformId)) {
      import('alertifyjs').then(alertify => {
        alertify.error(message);
      });
    }
  }

  warning(message: string): void {
    if (isPlatformBrowser(this.platformId)) {
      import('alertifyjs').then(alertify => {
        alertify.warning(message);
      });
    }
  }
}
