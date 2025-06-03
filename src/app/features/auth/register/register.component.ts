import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  error = '';
  form;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user']
    });
  }

  register() {
    const { username, email, password, role } = this.form.value;
    this.http.post('http://localhost:3000/auth/register', { username, email, password, role })
      .subscribe({
        next: () => this.router.navigateByUrl('/login'),
        error: (err) => this.error = err.error?.message || 'Error al registrarse'
      });
  }
}
