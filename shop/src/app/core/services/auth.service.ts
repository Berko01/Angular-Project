import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly mockToken = 'mock-jwt-token-123';
    private readonly loggedIn$: BehaviorSubject<boolean>;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        const initial = this.hasToken();
        this.loggedIn$ = new BehaviorSubject<boolean>(initial);
    }

    login(user: User): Observable<{ success: boolean; token?: string }> {
        console.log('[AuthService] login() çağrıldı:', user);

        const isValid = user.userName === 'admin' && user.password === '1234';

        if (isValid) {
            const token = this.mockToken;
            this.setToken(token);
            this.loggedIn$.next(true);
            return of({ success: true, token }).pipe(delay(500));
        } else {
            return of({ success: false }).pipe(delay(500));
        }
    }

    logout(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
        }
        this.loggedIn$.next(false);
        console.log('[AuthService] Oturum kapatıldı.');
    }

    isLoggedIn(): Observable<boolean> {
        return this.loggedIn$.asObservable();
    }

    public hasToken(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return !!(localStorage.getItem('token') || sessionStorage.getItem('token'));
        }
        return false;
    }

    private setToken(token: string) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', token);
        }
    }

    setRememberMeToken(token: string, remember: boolean) {
        if (isPlatformBrowser(this.platformId)) {
            if (remember) {
                localStorage.setItem('token', token);
            } else {
                sessionStorage.setItem('token', token);
            }
        }
        this.loggedIn$.next(true);
    }
}
