import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: ReturnType<FormBuilder['group']>;
  error = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    const { email, password } = this.form.value;
    this.http
      .post<{ token: string; user: any }>('http://localhost:3000/auth/login', {
        email,
        password,
      })
      .subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.auth.login(res.token);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          this.error = err.error?.message || 'Error al iniciar sesión';
        },
      });
  }
}
