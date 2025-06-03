import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  get token(): string | null {
    return localStorage.getItem('token');
  }

  get user(): any {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
