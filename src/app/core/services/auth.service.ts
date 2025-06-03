// app/core/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  username: string;
  role: string;
  id: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn = signal<boolean>(false);
  private _user = signal<JwtPayload | null>(null);

  get isLoggedIn() {
    return this._isLoggedIn();
  }

  get user() {
    return this._user();
  }

  constructor() {
    this.checkToken();
  }

  private checkToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      this._isLoggedIn.set(false);
      this._user.set(null);
      return;
    }

    try {
      const payload = jwtDecode<JwtPayload>(token);
      const isExpired = payload.exp * 1000 < Date.now();

      if (isExpired) {
        this.logout();
      } else {
        this._isLoggedIn.set(true);
        this._user.set(payload);
        this.autoLogout(payload.exp * 1000 - Date.now());
      }
    } catch {
      this.logout();
    }
  }

  autoLogout(ms: number) {
    setTimeout(() => this.logout(), ms);
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.checkToken();
  }

  logout() {
    localStorage.removeItem('token');
    this._isLoggedIn.set(false);
    this._user.set(null);
    window.location.href = '/login';
  }
}
